import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useCreateArticle } from '@/hooks/useArticles';
import { useToast } from '@/hooks/useToast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ImageUpload from './ImageUpload';
import { useTranslations } from '@/hooks/useTranslations';

interface CreateArticleFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

interface ImageData {
  url: string;
  source?: string;
}

const CreateArticleForm = ({ onClose, onSuccess }: CreateArticleFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    source: '',
    published: false
  });
  const [imageData, setImageData] = useState<ImageData[]>([]);
  const createArticle = useCreateArticle();
  const { toast } = useToast();
  const { t } = useTranslations();

  const categories = [
    {name: t('categories.manicure.title'), id: "manicure"},
    {name: t('categories.cosmetology.title'), id: "cosmetology"},
    {name: t('categories.wellness.title'), id: "wellness"}
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category) {
      toast({
        title: t('common.error'),
        description: t('createArticle.requiredFields'),
        variant: "destructive",
      });
      return;
    }

    try {
      await createArticle.mutateAsync({
        article: {
          title: formData.title,
          excerpt: formData.excerpt,
          content: formData.content,
          category: formData.category,
          source: formData.source,
          published: formData.published,
          image_url: imageData.length > 0 ? imageData[0].url : '',
          author_id: 'default-author'
        },
        images: imageData
      });

      toast({
        title: t('admin.success'),
        description: t('createArticle.createSuccess'),
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

  const handleImagesChange = (urls: string[]) => {
    // Convert URLs to ImageData format, preserving existing sources
    const newImageData = urls.map((url, index) => ({
      url,
      source: imageData[index]?.source || ''
    }));
    setImageData(newImageData);
  };

  const handleImageDataChange = (data: ImageData[]) => {
    setImageData(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">{t('admin.createArticle')}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <Label htmlFor="title">{t('createArticle.titleLabel')} *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder={t('createArticle.titlePlaceholder')}
              required
            />
          </div>

          <div>
            <Label htmlFor="category">{t('createArticle.categoryLabel')} *</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('createArticle.categoryPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
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
            <Label htmlFor="excerpt">{t('createArticle.excerptLabel')}</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              placeholder={t('createArticle.excerptPlaceholder')}
              rows={3}
            />
          </div>

          <div>
            <Label>{t('createArticle.imagesLabel')}</Label>
            <ImageUpload
              images={imageData.map(img => img.url)}
              onImagesChange={handleImagesChange}
              imageData={imageData}
              onImageDataChange={handleImageDataChange}
              maxImages={10}
            />
          </div>

          <div>
            <Label htmlFor="content">{t('createArticle.contentLabel')}</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder={t('createArticle.contentPlaceholder')}
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
            <Label htmlFor="published">{t('createArticle.publishImmediately')}</Label>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="submit" disabled={createArticle.isPending} className="flex-1">
              {createArticle.isPending ? t('createArticle.creating') : t('admin.createArticle')}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              {t('createArticle.cancel')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateArticleForm;