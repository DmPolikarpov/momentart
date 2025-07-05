import React from 'react';
import { ExternalLink } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ArticleImageCarouselProps {
  images: Array<{ id: string; image_url: string; image_order: number; source?: string }>;
  title: string;
}

const ArticleImageCarousel = ({ images, title }: ArticleImageCarouselProps) => {
  if (!images || images.length === 0) return null;

  // If only one image, show it without carousel controls
  if (images.length === 1) {
    const image = images[0];
    return (
      <div className="mb-8">
        <img
          src={image.image_url}
          alt={title}
          className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
        />
        {image.source && (
          <div className="mt-3 flex items-center space-x-2 text-sm text-gray-600">
            <ExternalLink className="w-4 h-4" />
            <span className="font-medium">Image source:</span>
            {image.source.startsWith('http') ? (
              <a 
                href={image.source} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                {image.source}
              </a>
            ) : (
              <span>{image.source}</span>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mb-8">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={image.id}>
              <div className="relative">
                <img
                  src={image.image_url}
                  alt={`${title} - Image ${index + 1}`}
                  className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
                />
                {images.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    {index + 1} / {images.length}
                  </div>
                )}
              </div>
              {image.source && (
                <div className="mt-3 flex items-center space-x-2 text-sm text-gray-600">
                  <ExternalLink className="w-4 h-4" />
                  <span className="font-medium">Image source:</span>
                  {image.source.startsWith('http') ? (
                    <a 
                      href={image.source} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {image.source}
                    </a>
                  ) : (
                    <span>{image.source}</span>
                  )}
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
};

export default ArticleImageCarousel;