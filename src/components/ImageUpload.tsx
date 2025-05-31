import React, { useState, useCallback } from 'react';
import { Upload, X, Image } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

const ImageUpload = ({ images, onImagesChange, maxImages = 5 }: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
//   const { toast } = useToast();

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));

    if (imageFiles.length === 0) {
    //   toast({
    //     title: "No images found",
    //     description: "Please drop image files only",
    //     variant: "destructive",
    //   });
      return;
    }

    if (images.length + imageFiles.length > maxImages) {
    //   toast({
    //     title: "Too many images",
    //     description: `Maximum ${maxImages} images allowed`,
    //     variant: "destructive",
    //   });
      return;
    }

    // Convert files to URLs (in a real app, you'd upload to storage)
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        onImagesChange([...images, imageUrl]);
      };
      reader.readAsDataURL(file);
    });
  }, [images, onImagesChange, maxImages]);

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
    //   toast({
    //     title: "Too many images",
    //     description: `Maximum ${maxImages} images allowed`,
    //     variant: "destructive",
    //   });
      return;
    }

    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        onImagesChange([...images, imageUrl]);
      };
      reader.readAsDataURL(file);
    });
  }, [images, onImagesChange, maxImages]);

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
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
          <p className="text-lg font-medium">Drop images here</p>
          <p className="text-sm text-gray-500">
            or{' '}
            <label className="text-blue-600 hover:text-blue-500 cursor-pointer">
              browse files
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
            Maximum {maxImages} images ({images.length}/{maxImages})
          </p>
        </div>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Upload ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;