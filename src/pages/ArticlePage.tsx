import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, Clock, ArrowLeft, Edit } from 'lucide-react';
import { useArticle, calculateReadingTime, generateSlug } from '@/hooks/useArticles';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/useToast';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ArticleImageCarousel from '../components/ArticleImageCarousel';
import SocialShare from '../components/SocialShare';
import EditArticleForm from '../components/EditArticleForm';
import { Button } from '@/components/ui/button';

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  
  const { data: article, isLoading, error, refetch } = useArticle(id || '');

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
          <h1 className="text-2xl font-bold text-gray-800">Article not found</h1>
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
          {/* Back button and admin controls */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            
            {isAdmin && (
              <Button
                onClick={() => setShowEditForm(true)}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </Button>
            )}
          </div>

          {/* Article header */}
          <header className="mb-8">
            <div className="mb-4">
              <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {article.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>
            
            {article.excerpt && (
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {article.excerpt}
              </p>
            )}

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-6 text-gray-500">
                {article.profiles && (
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span className="text-sm">
                      By {article.profiles.full_name || 'Anonymous'}
                    </span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {new Date(article.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{readingTime} min read</span>
                </div>
              </div>

              <SocialShare
                title={article.title}
                excerpt={article.excerpt || undefined}
                url={articleUrl}
              />
            </div>
          </header>

          {/* Article images carousel */}
          <ArticleImageCarousel images={images} title={article.title} />

          {/* Article content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              {article.content ? (
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">
                  This is a sample article content. In a real implementation, you would have rich text content here 
                  with proper formatting, images, and other media elements that make up a complete beauty article.
                </p>
              )}
            </div>
          </div>
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