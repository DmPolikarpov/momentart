import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type Article = Tables<'articles'>;
type Profile = Tables<'profiles'>;
type ArticleImage = Tables<'article_images'>;

export interface ArticleWithAuthor extends Article {
  profiles?: Profile;
  article_images?: ArticleImage[];
}

export interface ArticleWithStats extends ArticleWithAuthor {
  view_count?: number;
  like_count?: number;
}

export const useArticles = (category?: string) => {
  return useQuery({
    queryKey: ['articles', category],
    queryFn: async () => {
      let query = supabase
        .from('articles')
        .select(`
          *,
          profiles:author_id (
            id,
            full_name,
            avatar_url
          ),
          article_images (
            id,
            image_url,
            image_order,
            source
          )
        `)
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;
      if (error) throw error;
      
      // Sort images by order for each article
      return (data as ArticleWithAuthor[]).map(article => ({
        ...article,
        article_images: article.article_images?.sort((a, b) => a.image_order - b.image_order) || []
      }));
    },
  });
};

export const useInfiniteArticles = (category?: string, pageSize: number = 12) => {
  return useInfiniteQuery({
    queryKey: ['articles-infinite', category, pageSize],
    queryFn: async ({ pageParam = 0 }) => {
      let query = supabase
        .from('articles')
        .select(`
          *,
          profiles:author_id (
            id,
            full_name,
            avatar_url
          ),
          article_images (
            id,
            image_url,
            image_order,
            source
          )
        `)
        .eq('published', true)
        .order('created_at', { ascending: false })
        .range(pageParam * pageSize, (pageParam + 1) * pageSize - 1);

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;
      if (error) throw error;
      
      // Sort images by order for each article
      const articles = (data as ArticleWithAuthor[]).map(article => ({
        ...article,
        article_images: article.article_images?.sort((a, b) => a.image_order - b.image_order) || []
      }));

      return {
        articles,
        nextPage: articles.length === pageSize ? pageParam + 1 : undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });
};

export const useArticle = (id: string) => {
  return useQuery({
    queryKey: ['article', id],
    queryFn: async () => {
      // First try to find by slug, then by ID
      let { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          profiles:author_id (
            id,
            full_name,
            avatar_url
          ),
          article_images (
            id,
            image_url,
            image_order,
            source
          )
        `)
        .eq('slug', id)
        .eq('published', true)
        .single();

      // If not found by slug, try by ID
      if (error && error.code === 'PGRST116') {
        const result = await supabase
          .from('articles')
          .select(`
            *,
            profiles:author_id (
              id,
              full_name,
              avatar_url
            ),
            article_images (
              id,
              image_url,
              image_order,
              source
            )
          `)
          .eq('id', id)
          .eq('published', true)
          .single();
        
        data = result.data;
        error = result.error;
      }

      if (error) throw error;
      
      // Sort images by order
      const article = data as ArticleWithAuthor;
      article.article_images = article.article_images?.sort((a, b) => a.image_order - b.image_order) || [];
      
      return article;
    },
    enabled: !!id,
  });
};

export const useArticlesWithStats = () => {
  return useQuery({
    queryKey: ['articles-with-stats'],
    queryFn: async () => {
      // Get all published articles
      const { data: articles, error: articlesError } = await supabase
        .from('articles')
        .select(`
          *,
          profiles:author_id (
            id,
            full_name,
            avatar_url
          ),
          article_images (
            id,
            image_url,
            image_order,
            source
          )
        `)
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (articlesError) throw articlesError;

      // Get view counts for all articles
      const { data: viewCounts, error: viewError } = await supabase
        .from('article_views')
        .select('article_id')
        .then(({ data, error }) => {
          if (error) throw error;
          const counts: Record<string, number> = {};
          data?.forEach(view => {
            counts[view.article_id] = (counts[view.article_id] || 0) + 1;
          });
          return { data: counts, error: null };
        });

      if (viewError) throw viewError;

      // Get like counts for all articles
      const { data: likeCounts, error: likeError } = await supabase
        .from('article_likes')
        .select('article_id')
        .then(({ data, error }) => {
          if (error) throw error;
          const counts: Record<string, number> = {};
          data?.forEach(like => {
            counts[like.article_id] = (counts[like.article_id] || 0) + 1;
          });
          return { data: counts, error: null };
        });

      if (likeError) throw likeError;

      // Combine articles with stats
      const articlesWithStats: ArticleWithStats[] = (articles as ArticleWithAuthor[]).map(article => ({
        ...article,
        article_images: article.article_images?.sort((a, b) => a.image_order - b.image_order) || [],
        view_count: viewCounts[article.id] || 0,
        like_count: likeCounts[article.id] || 0,
      }));

      return articlesWithStats;
    },
  });
};

export const useTrackView = () => {
  return useMutation({
    mutationFn: async (articleId: string) => {
      const { error } = await supabase
        .from('article_views')
        .insert({ article_id: articleId });
      
      if (error) throw error;
    },
  });
};

export const useTrackLike = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (articleId: string) => {
      const { error } = await supabase
        .from('article_likes')
        .insert({ article_id: articleId });
      
      if (error) throw error;
    },
    onSuccess: () => {
      // Invalidate stats queries to refresh counts
      queryClient.invalidateQueries({ queryKey: ['articles-with-stats'] });
    },
  });
};

export const useArticleStats = (articleId: string) => {
  return useQuery({
    queryKey: ['article-stats', articleId],
    queryFn: async () => {
      const [viewsResult, likesResult] = await Promise.all([
        supabase
          .from('article_views')
          .select('*', { count: 'exact', head: true })
          .eq('article_id', articleId),
        supabase
          .from('article_likes')
          .select('*', { count: 'exact', head: true })
          .eq('article_id', articleId)
      ]);

      if (viewsResult.error) throw viewsResult.error;
      if (likesResult.error) throw likesResult.error;

      return {
        views: viewsResult.count || 0,
        likes: likesResult.count || 0,
      };
    },
    enabled: !!articleId,
  });
};

export const useUpdateArticle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates, images }: { 
      id: string; 
      updates: Partial<Article>; 
      images?: string[];
    }) => {
      // Update article
      const { data: articleData, error: articleError } = await supabase
        .from('articles')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (articleError) throw articleError;

      // If images are provided, update article images
      if (images) {
        // Delete existing images
        await supabase
          .from('article_images')
          .delete()
          .eq('article_id', id);

        // Insert new images
        if (images.length > 0) {
          const imageData = images.map((url, index) => ({
            article_id: id,
            image_url: url,
            image_order: index
          }));

          const { error: imagesError } = await supabase
            .from('article_images')
            .insert(imageData);

          if (imagesError) throw imagesError;
        }
      }

      return articleData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['article'] });
    },
  });
};

export const useCreateArticle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ article, images }: { 
      article: Omit<Article, 'id' | 'created_at' | 'updated_at' | 'slug'>; 
      images: any[];
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Create article
      const { data: articleData, error: articleError } = await supabase
        .from('articles')
        .insert({
          ...article,
          author_id: user.id
        })
        .select()
        .single();

      if (articleError) throw articleError;

      // Insert images
      if (images.length > 0) {
        const imageData = images.map((url, index) => ({
          article_id: articleData.id,
          image_url: url,
          image_order: index
        }));

        const { error: imagesError } = await supabase
          .from('article_images')
          .insert(imageData);

        if (imagesError) throw imagesError;
      }

      return articleData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};

// Utility function to calculate reading time
export const calculateReadingTime = (content: string): number => {
  if (!content) return 1;
  
  // Remove HTML tags for accurate word count
  const textContent = content.replace(/<[^>]*>/g, '');
  const words = textContent.trim().split(/\s+/).length;
  
  // Average reading speed is 200-250 words per minute, we'll use 225
  const wordsPerMinute = 225;
  const readingTime = Math.ceil(words / wordsPerMinute);
  
  return Math.max(1, readingTime); // Minimum 1 minute
};

// Utility function to generate URL-friendly slug
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};