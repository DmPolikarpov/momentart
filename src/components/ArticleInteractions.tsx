import React from 'react';
import { Heart, Eye } from 'lucide-react';
import { useTrackLike, useArticleStats } from '../hooks/useArticles';
import { useToast } from '@/hooks/useToast';

interface ArticleInteractionsProps {
  articleId: string;
  className?: string;
}

const ArticleInteractions = ({ articleId, className = '' }: ArticleInteractionsProps) => {
  const { data: stats, refetch } = useArticleStats(articleId);
  const trackLike = useTrackLike();
  const { toast } = useToast();

  const handleLike = async () => {
    try {
      await trackLike.mutateAsync(articleId);
      // Refetch stats to get updated counts
      await refetch();
      toast({
          title: "Like added!",
          description: "Thanks for liking this article!",
        });
    } catch (error) {
      console.error('Error liking article:', error);
      toast({
          title: "Error",
          description: "Failed to like article. Please try again.",
        });
    }
  };

  const formatCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <div className="flex items-center space-x-1 text-gray-500">
        <Eye className="w-4 h-4" />
        <span className="text-sm font-medium">{stats ? formatCount(stats.views) : '0'} views</span>
      </div>
      <button
        onClick={handleLike}
        disabled={trackLike.isPending}
        className="flex items-center space-x-1 text-gray-500 hover:text-rose-600 transition-colors disabled:opacity-50 group"
        title="Like this article"
      >
        <Heart className="w-4 h-4 group-hover:fill-rose-600 transition-colors" />
        <span className="text-sm font-medium">{stats ? formatCount(stats.likes) : '0'} likes</span>
      </button>
    </div>
  );
};

export default ArticleInteractions;