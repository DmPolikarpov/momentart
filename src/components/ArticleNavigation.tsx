import React from 'react';
import { ArrowLeft, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ArticleNavigationProps {
  onBack: () => void;
  isAdmin: boolean;
  onEdit: () => void;
}

const ArticleNavigation = ({ onBack, isAdmin, onEdit }: ArticleNavigationProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>
      
      {isAdmin && (
        <Button
          onClick={onEdit}
          variant="outline"
          size="sm"
          className="flex items-center space-x-2"
        >
          <Edit className="w-4 h-4" />
          <span>Edit</span>
        </Button>
      )}
    </div>
  );
};

export default ArticleNavigation;