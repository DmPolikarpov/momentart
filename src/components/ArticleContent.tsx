import React from 'react';
import { ArticleWithAuthor } from '@/hooks/useArticles';
import ArticleImageCarousel from './ArticleImageCarousel';
import ArticleInteractions from './ArticleInteractions';
import SocialShare from './SocialShare';

interface ArticleContentProps {
  article: ArticleWithAuthor;
  images: Array<{ id: string; image_url: string; image_order: number }>;
  articleUrl: string;
}

const ArticleContent = ({ article, images, articleUrl }: ArticleContentProps) => {
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
              This is a sample article content. In a real implementation, you would have rich text content here 
              with proper formatting, images, and other media elements that make up a complete beauty article.
            </p>
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