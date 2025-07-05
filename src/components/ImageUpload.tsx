import React, { useState, useCallback } from 'react';
import { Upload, X, Image } from 'lucide-react';
import { useToast } from '@/hooks/useToast';
import { useTranslations } from '@/hooks/useTranslations';

interface ImageData {
  url: string;
  source?: string;
}

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  imageData?: ImageData[];
  onImageDataChange?: (imageData: ImageData[]) => void;
  maxImages?: number;
}

const ImageUpload = ({ 
  images, 
  onImagesChange, 
  imageData = [],
  onImageDataChange,
  maxImages = 5 
}: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslations();

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));

    if (imageFiles.length === 0) {
      toast({
        title: t('imageUpload.noImages'),
        description: t('imageUpload.imagesOnly'),
        variant: "destructive",
      });
      return;
    }

    if (images.length + imageFiles.length > maxImages) {
      toast({
        title: t('imageUpload.tooManyImages'),
        description: t('imageUpload.maxImagesAllowed', { max: maxImages }),
        variant: "destructive",
      });
      return;
    }

    // Convert files to URLs (in a real app, you'd upload to storage)
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        const newImages = [...images, imageUrl];
        const newImageData = [...imageData, { url: imageUrl, source: '' }];
        
        onImagesChange(newImages);
        onImageDataChange?.(newImageData);
      };
      reader.readAsDataURL(file);
    });
  }, [images, imageData, onImagesChange, onImageDataChange, maxImages, toast, t]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));

    if (images.length + imageFiles.length > maxImages) {
      toast({
        title: t('imageUpload.tooManyImages'),
        description: t('imageUpload.maxImagesAllowed', { max: maxImages }),
        variant: "destructive",
      });
      return;
    }

    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        const newImages = [...images, imageUrl];
        const newImageData = [...imageData, { url: imageUrl, source: '' }];
        
        onImagesChange(newImages);
        onImageDataChange?.(newImageData);
      };
      reader.readAsDataURL(file);
    });
  }, [images, imageData, onImagesChange, onImageDataChange, maxImages, toast, t]);

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newImageData = imageData.filter((_, i) => i !== index);
    
    onImagesChange(newImages);
    onImageDataChange?.(newImageData);
  };

  const updateImageSource = (index: number, source: string) => {
    const newImageData = imageData.map((item, i) => 
      i === index ? { ...item, source } : item
    );
    onImageDataChange?.(newImageData);
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <div className="space-y-2">
          <p className="text-lg font-medium">{t('imageUpload.dropImages')}</p>
          <p className="text-sm text-gray-500">
            {t('imageUpload.or')}{' '}
            <label className="text-blue-600 hover:text-blue-500 cursor-pointer">
              {t('imageUpload.browseFiles')}
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFileInput}
              />
            </label>
          </p>
          <p className="text-xs text-gray-400">
            {t('imageUpload.maxImages', { max: maxImages, current: images.length })}
          </p>
        </div>
      </div>

      {images.length > 0 && (
        <div className="space-y-4">
          {images.map((image, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-start space-x-4">
                <div className="relative group flex-shrink-0">
                  <img
                    src={image}
                    alt={t('imageUpload.uploadAlt', { index: index + 1 })}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <div className="flex-1 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Image Source (optional)
                  </label>
                  <input
                    type="text"
                    value={imageData[index]?.source || ''}
                    onChange={(e) => updateImageSource(index, e.target.value)}
                    placeholder="Enter image source URL or reference"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;