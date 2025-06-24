import React from 'react';
import { ArticleWithAuthor } from '@/hooks/useArticles';
import ArticleMetadata from './ArticleMetadata';
import ArticleInteractions from './ArticleInteractions';
import SocialShare from './SocialShare';

interface ArticleHeaderProps {
  article: ArticleWithAuthor;
  readingTime: number;
  articleUrl: string;
}

const ArticleHeader = ({ article, readingTime, articleUrl }: ArticleHeaderProps) => {
  return (
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
        <ArticleMetadata article={article} readingTime={readingTime} />

        <div className="flex items-center space-x-4">
          <ArticleInteractions articleId={article.id} />
          <SocialShare
            title={article.title}
            excerpt={article.excerpt || undefined}
            url={articleUrl}
          />
        </div>
      </div>
    </header>
  );
};

export default ArticleHeader;