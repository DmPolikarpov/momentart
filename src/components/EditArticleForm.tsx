import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useUpdateArticle, type ArticleWithAuthor } from '@/hooks/useArticles';
import { useToast } from '@/hooks/useToast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ImageUpload from './ImageUpload';
import { useTranslations } from '@/hooks/useTranslations';

interface EditArticleFormProps {
  article: ArticleWithAuthor;
  onClose: () => void;
  onSuccess: () => void;
}

interface ImageData {
  url: string;
  source?: string;
}

const EditArticleForm = ({ article, onClose, onSuccess }: EditArticleFormProps) => {
  const [formData, setFormData] = useState({
    title: article.title,
    excerpt: article.excerpt || '',
    content: article.content || '',
    category: article.category || '',
    source: article.source || '',
    published: article.published || false
  });
  const [images, setImages] = useState<string[]>([]);
  const [imageData, setImageData] = useState<ImageData[]>([]);
  const updateArticle = useUpdateArticle();
  const { toast } = useToast();
  const { t } = useTranslations();

  const categories = [
    t('categories.manicure.title'),
    t('categories.eyelashes.title'), 
    t('categories.cosmetology.title'),
    t('categories.skincare.title')
  ];

  useEffect(() => {
    // Initialize images from article
    const articleImages = article.article_images?.map(img => img.image_url) || [];
    const articleImageData = article.article_images?.map(img => ({
      url: img.image_url,
      source: img.source || ''
    })) || [];
    
    // If no article_images but has image_url, use that for backward compatibility
    if (articleImages.length === 0 && article.image_url) {
      articleImages.push(article.image_url);
      articleImageData.push({ url: article.image_url, source: '' });
    }
    
    setImages(articleImages);
    setImageData(articleImageData);
  }, [article]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category) {
      toast({
        title: t('common.error'),
        description: t('editArticle.requiredFields'),
        variant: "destructive",
      });
      return;
    }

    try {
      await updateArticle.mutateAsync({
        id: article.id,
        updates: {
          title: formData.title,
          excerpt: formData.excerpt,
          content: formData.content,
          category: formData.category,
          source: formData.source,
          published: formData.published,
          updated_at: new Date().toISOString(),
          image_url: images.length > 0 ? images[0] : null
        },
        images: images.map((url, index) => url)
      });

      toast({
        title: t('admin.success'),
        description: t('editArticle.updateSuccess'),
      });

      onSuccess();
    } catch (error: any) {
      toast({
        title: t('common.error'),
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">{t('editArticle.title')}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <Label htmlFor="title">{t('editArticle.titleLabel')} *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder={t('editArticle.titlePlaceholder')}
              required
            />
          </div>

          <div>
            <Label htmlFor="category">{t('editArticle.categoryLabel')} *</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('editArticle.categoryPlaceholder')} />
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
            <Label htmlFor="source">Source</Label>
            <Input
              id="source"
              value={formData.source}
              onChange={(e) => setFormData(prev => ({ ...prev, source: e.target.value }))}
              placeholder="Enter source URL or reference"
            />
          </div>

          <div>
            <Label htmlFor="excerpt">{t('editArticle.excerptLabel')}</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              placeholder={t('editArticle.excerptPlaceholder')}
              rows={3}
            />
          </div>

          <div>
            <Label>{t('editArticle.imagesLabel')}</Label>
            <ImageUpload
              images={images}
              onImagesChange={setImages}
              imageData={imageData}
              onImageDataChange={setImageData}
              maxImages={10}
            />
          </div>

          <div>
            <Label htmlFor="content">{t('editArticle.contentLabel')}</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder={t('editArticle.contentPlaceholder')}
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
            <Label htmlFor="published">{t('admin.published')}</Label>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button 
              type="submit" 
              disabled={updateArticle.isPending} 
              className="flex-1"
            >
              {updateArticle.isPending ? t('editArticle.updating') : t('editArticle.updateButton')}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              {t('editArticle.cancel')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditArticleForm;