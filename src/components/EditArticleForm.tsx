import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
// import { useUpdateArticle, type ArticleWithAuthor } from '@/hooks/useArticles';
// import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ImageUpload from './ImageUpload';

interface EditArticleFormProps {
//   article: ArticleWithAuthor;
    article: any,
  onClose: () => void;
  onSuccess: () => void;
}

const EditArticleForm = ({ article, onClose, onSuccess }: EditArticleFormProps) => {
  const [formData, setFormData] = useState({
    title: article.title,
    excerpt: article.excerpt || '',
    content: article.content || '',
    category: article.category || '',
    published: article.published || false
  });
  const [images, setImages] = useState<string[]>([]);
//   const updateArticle = useUpdateArticle();
//   const { toast } = useToast();

  const categories = [
    'Manicure & Nail Art',
    'Eyelash Extensions', 
    'Cosmetology Trends',
    'Skincare & Wellness'
  ];

  useEffect(() => {
    // Initialize images from article
    const articleImages = article.article_images?.map(img => img.image_url) || [];
    // If no article_images but has image_url, use that for backward compatibility
    if (articleImages.length === 0 && article.image_url) {
      articleImages.push(article.image_url);
    }
    setImages(articleImages);
  }, [article]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category) {
    //   toast({
    //     title: "Error",
    //     description: "Please fill in all required fields",
    //     variant: "destructive",
    //   });
      return;
    }

    try {
    //   await updateArticle.mutateAsync({
    //     id: article.id,
    //     updates: {
    //       title: formData.title,
    //       excerpt: formData.excerpt,
    //       content: formData.content,
    //       category: formData.category,
    //       published: formData.published,
    //       updated_at: new Date().toISOString(),
    //       image_url: images.length > 0 ? images[0] : null // Keep main image for backward compatibility
    //     },
    //     images
    //   });

    //   toast({
    //     title: "Success",
    //     description: "Article updated successfully",
    //   });

      onSuccess();
    } catch (error: any) {
    //   toast({
    //     title: "Error",
    //     description: error.message,
    //     variant: "destructive",
    //   });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Edit Article</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter article title"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category *</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              placeholder="Brief description of the article"
              rows={3}
            />
          </div>

          <div>
            <Label>Images</Label>
            <ImageUpload
              images={images}
              onImagesChange={setImages}
              maxImages={10}
            />
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Write your article content here..."
              rows={10}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
              className="rounded"
            />
            <Label htmlFor="published">Published</Label>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button 
              type="submit" 
            //   disabled={updateArticle.isPending} 
              className="flex-1"
            >
              {/* {updateArticle.isPending ? 'Updating...' : 'Update Article'} */}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditArticleForm;