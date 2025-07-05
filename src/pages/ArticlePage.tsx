import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useArticle, calculateReadingTime, useTrackView } from '@/hooks/useArticles';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/useToast';
import { useTranslations } from '@/hooks/useTranslations';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ArticleNavigation from '../components/ArticleNavigation';
import ArticleHeader from '../components/ArticleHeader';
import ArticleContent from '../components/ArticleContent';
import EditArticleForm from '../components/EditArticleForm';

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslations();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const viewTrackedRef = useRef<string | null>(null);
  
  const { data: article, isLoading, error, refetch } = useArticle(id || '');
  const trackView = useTrackView();

  // Track view when article loads - only once per article
  useEffect(() => {
    if (article?.id && viewTrackedRef.current !== article.id) {
      console.log('Tracking view for article:', article.id);
      trackView.mutate(article.id);
      viewTrackedRef.current = article.id;
    }
  }, [article?.id]); // Removed trackView from dependencies

  // Reset view tracking when article ID changes
  useEffect(() => {
    viewTrackedRef.current = null;
  }, [id]);

  React.useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin');

      setIsAdmin(roles && roles.length > 0);
    } catch (error) {
      // Silently handle error
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <Header />
        <div className="pt-24 pb-16 flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          <p className="ml-4 text-gray-600">{t('article.loading')}</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <Header />
        <div className="pt-24 pb-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800">{t('article.notFound')}</h1>
        </div>
        <Footer />
      </div>
    );
  }

  const readingTime = calculateReadingTime(article.content || '');
  const articleUrl = `${window.location.origin}/article/${article.slug || article.id}`;
  
  // Use article_images or fallback to single image_url for backward compatibility
  const images = article.article_images?.length > 0 
    ? article.article_images 
    : article.image_url 
      ? [{ id: 'main', image_url: article.image_url, image_order: 0 }] 
      : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Header />
      
      <article className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <ArticleNavigation
            onBack={() => navigate(-1)}
            isAdmin={isAdmin}
            onEdit={() => setShowEditForm(true)}
          />

          <ArticleHeader
            article={article}
            readingTime={readingTime}
            articleUrl={articleUrl}
          />

          <ArticleContent
            article={article}
            images={images}
            articleUrl={articleUrl}
          />
        </div>
      </article>

      {/* Edit Article Modal */}
      {showEditForm && article && (
        <EditArticleForm
          article={article}
          onClose={() => setShowEditForm(false)}
          onSuccess={() => {
            setShowEditForm(false);
            refetch();
            toast({
              title: "Success",
              description: "Article updated successfully",
            });
          }}
        />
      )}

      <Footer />
    </div>
  );
};

export default ArticlePage;