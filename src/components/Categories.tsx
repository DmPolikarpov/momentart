import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Eye, Hand, Heart } from 'lucide-react';
import { useArticles } from '@/hooks/useArticles';

const Categories = () => {
  const navigate = useNavigate();
  const { data: allArticles = [], isLoading } = useArticles();

  const categoryConfig = [
    {
      icon: Hand,
      title: "Manicure & Nail Art",
      description: "Latest trends in nail design, colors, and techniques",
      color: "from-rose-400 to-pink-500",
      path: "/manicure",
      categoryKey: "Manicure & Nail Art"
    },
    {
      icon: Eye,
      title: "Eyelash Extensions",
      description: "Professional tips and stunning lash transformations",
      color: "from-purple-400 to-pink-500",
      path: "/eyelashes",
      categoryKey: "Eyelash Extensions"
    },
    {
      icon: Sparkles,
      title: "Cosmetology Trends",
      description: "Beauty innovations and industry breakthroughs",
      color: "from-amber-400 to-rose-500",
      path: "/cosmetology",
      categoryKey: "Cosmetology Trends"
    },
    {
      icon: Heart,
      title: "Skincare & Wellness",
      description: "Holistic approaches to beauty and self-care",
      color: "from-pink-400 to-rose-500",
      path: "/skincare-wellness",
      categoryKey: "Skincare & Wellness"
    }
  ];

  // Calculate article counts for each category
  const getArticleCount = (categoryKey: string) => {
    if (!allArticles.length) return 0;
    return allArticles.filter(article => 
      article.category?.toLowerCase() === categoryKey.toLowerCase()
    ).length;
  };

  const categories = categoryConfig.map(config => ({
    ...config,
    articles: `${getArticleCount(config.categoryKey)} Articles`
  }));

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Explore by Category
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dive deep into your favorite beauty topics with our curated collections
            </p>
          </div>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading categories...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-rose-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Explore by Category
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dive deep into your favorite beauty topics with our curated collections
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.title}
              onClick={() => navigate(category.path)}
              className={`group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in overflow-hidden cursor-pointer`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${category.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-rose-600 transition-colors">
                  {category.title}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {category.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 font-medium">
                    {category.articles}
                  </span>
                  <button className="text-rose-600 font-semibold text-sm hover:text-rose-700 transition-colors">
                    Explore →
                  </button>
                </div>
              </div>

              {/* Hover Effect Circle */}
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-150"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;