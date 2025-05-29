import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Eye, Heart, Sparkles } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';

const TrendGallery = () => {
  const [selectedTrend, setSelectedTrend] = useState<number | null>(null);
  const [autoScrollIndex, setAutoScrollIndex] = useState(0);

  const trends = [
    {
      id: 1,
      title: "Spring Nude Shades",
      subtitle: "Minimalist Elegance",
      description: "Discover the perfect nude palette that complements every skin tone. These subtle yet sophisticated shades are dominating spring 2024.",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=600&fit=crop",
      views: "12.5K",
      likes: "2.1K",
      category: "Manicure"
    },
    {
      id: 2,
      title: "Voluminous Eyelashes 2024",
      subtitle: "Dramatic Eye Transformation",
      description: "The latest in lash extension technology creates unprecedented volume while maintaining natural movement and comfort.",
      image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&h=600&fit=crop",
      views: "18.3K",
      likes: "3.7K",
      category: "Eyelashes"
    },
    {
      id: 3,
      title: "Holographic Chrome Nails",
      subtitle: "Futuristic Shine",
      description: "Mirror-like chrome finishes with holographic elements that shift color in different lighting conditions.",
      image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800&h=600&fit=crop",
      views: "25.8K",
      likes: "4.9K",
      category: "Nail Art"
    },
    {
      id: 4,
      title: "Glass Skin Beauty",
      subtitle: "Korean Skincare Revolution",
      description: "Achieve that coveted glass skin look with layered hydration techniques and innovative skincare formulations.",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop",
      views: "31.2K",
      likes: "6.8K",
      category: "Skincare"
    },
    {
      id: 5,
      title: "Gradient Ombré Lashes",
      subtitle: "Color-Shifting Extensions",
      description: "Multi-tonal lash extensions that create a gradient effect from root to tip, adding depth and dimension.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
      views: "14.7K",
      likes: "2.8K",
      category: "Eyelashes"
    },
    {
      id: 6,
      title: "Textured Nail Designs",
      subtitle: "3D Artistic Expression",
      description: "Raised textures and 3D elements create sculptural nail art that's both tactile and visually stunning.",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop",
      views: "19.9K",
      likes: "4.2K",
      category: "Nail Art"
    }
  ];

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAutoScrollIndex((prev) => (prev + 1) % trends.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [trends.length]);

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-rose-200/20 to-purple-200/20 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-200/20 to-rose-200/20 rounded-full animate-float-reverse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-rose-500/10 rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />
            <span className="text-sm font-medium text-purple-600">Trending Now</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
              Beauty Trend Gallery
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore the most popular beauty trends shaping the industry right now
          </p>
        </div>

        {/* Main Carousel */}
        <Carousel className="relative mb-12" opts={{ align: "start", loop: true }}>
          <CarouselContent className="-ml-4">
            {trends.map((trend, index) => (
              <CarouselItem key={trend.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div 
                  className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden cursor-pointer transform hover:scale-105 ${
                    autoScrollIndex === index ? 'ring-4 ring-rose-300/50 scale-105' : ''
                  }`}
                  onClick={() => setSelectedTrend(trend.id)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={trend.image}
                      alt={trend.title}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-purple-500 to-rose-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                        {trend.category}
                      </span>
                    </div>

                    {/* Stats Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <div className="flex items-center justify-between text-white">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span className="text-sm">{trend.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span className="text-sm">{trend.likes}</span>
                          </div>
                        </div>
                        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Sparkles className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-rose-400/20 animate-pulse"></div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-rose-600 transition-colors">
                      {trend.title}
                    </h3>
                    <p className="text-rose-600 font-medium mb-3 text-sm">
                      {trend.subtitle}
                    </p>
                    <p className="text-gray-600 line-clamp-2">
                      {trend.description}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110 transition-all" />
          <CarouselNext className="right-4 bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110 transition-all" />
        </Carousel>

        {/* Progress Indicators */}
        <div className="flex justify-center space-x-2 mb-8">
          {trends.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-500 ${
                autoScrollIndex === index ? 'w-8 bg-gradient-to-r from-purple-500 to-rose-500' : 'w-2 bg-gray-300'
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Modal for Trend Details */}
      {selectedTrend && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedTrend(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-auto animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {trends.filter(t => t.id === selectedTrend).map(trend => (
              <div key={trend.id} className="relative">
                <img
                  src={trend.image}
                  alt={trend.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-3xl font-bold mb-2">{trend.title}</h3>
                  <p className="text-xl text-rose-300">{trend.subtitle}</p>
                </div>
                <button
                  onClick={() => setSelectedTrend(null)}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  ×
                </button>
                <div className="p-8">
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {trend.description}
                  </p>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Eye className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-600">{trend.views} views</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Heart className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-600">{trend.likes} likes</span>
                    </div>
                    <span className="bg-gradient-to-r from-purple-500 to-rose-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {trend.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default TrendGallery;