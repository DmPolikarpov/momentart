import React from 'react';
import { Calendar, User, Clock } from 'lucide-react';
import { ArticleWithAuthor } from '@/hooks/useArticles';

interface ArticleMetadataProps {
  article: ArticleWithAuthor;
  readingTime: number;
}

const ArticleMetadata = ({ article, readingTime }: ArticleMetadataProps) => {
  return (
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
  );
};

export default ArticleMetadata;
