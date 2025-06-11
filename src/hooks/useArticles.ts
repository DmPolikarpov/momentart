import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type Article = Tables<'articles'>;
type Profile = Tables<'profiles'>;
type ArticleImage = Tables<'article_images'>;

export interface ArticleWithAuthor extends Article {
  profiles?: Profile;
  article_images?: ArticleImage[];
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
            image_order
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
            image_order
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
              image_order
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
      images: string[];
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