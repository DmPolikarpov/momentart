import React from 'react';
import { ExternalLink } from 'lucide-react';
import { ArticleWithAuthor } from '@/hooks/useArticles';
import ArticleImageCarousel from './ArticleImageCarousel';
import ArticleInteractions from './ArticleInteractions';
import SocialShare from './SocialShare';
import { useTranslations } from '@/hooks/useTranslations';

interface ArticleContentProps {
  article: ArticleWithAuthor;
  images: Array<{ id: string; image_url: string; image_order: number }>;
  articleUrl: string;
}

const ArticleContent = ({ article, images, articleUrl }: ArticleContentProps) => {
  const { t } = useTranslations();

  return (
    <>
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
              {t('articleContent.sampleContent')}
            </p>
          )}

          {/* Article source */}
          {article.source && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <ExternalLink className="w-4 h-4" />
                <span className="font-medium">Source:</span>
                {article.source.startsWith('http') ? (
                  <a 
                    href={article.source} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {article.source}
                  </a>
                ) : (
                  <span>{article.source}</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom interactions */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <ArticleInteractions articleId={article.id} className="text-lg" />
          <SocialShare
            title={article.title}
            excerpt={article.excerpt || undefined}
            url={articleUrl}
          />
        </div>
      </div>
    </>
  );
};

export default ArticleContent;