import React, { useState } from 'react';
import { ArrowRight, Clock, User, Heart, Eye, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useArticlesWithStats } from '../hooks/useArticles';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const navigate = useNavigate();
  const { data: articlesWithStats = [], isLoading } = useArticlesWithStats();

  const categories = [
    { id: 'all', name: 'All Articles', color: 'from-purple-500 to-rose-500' },
    { id: 'Manicure & Nail Art', name: 'Manicure', color: 'from-rose-500 to-pink-600' },
    { id: 'Eyelash Extensions', name: 'Eyelashes', color: 'from-purple-500 to-violet-600' },
    { id: 'Cosmetology Trends', name: 'Cosmetology', color: 'from-amber-500 to-orange-600' },
    { id: 'Skincare & Wellness', name: 'Skincare & Wellness', color: 'from-emerald-500 to-green-600' }
  ];

  const filteredArticles = selectedCategory === 'all' 
    ? articlesWithStats 
    : articlesWithStats.filter(article => 
        article.category?.toLowerCase() === selectedCategory.toLowerCase()
      );

  const handleArticleClick = (articleId: string) => {
    navigate(`/article/${articleId}`);
  };

  const formatCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const getCategoryColor = (category: string | null): string => {
    const categoryObj = categories.find(cat => 
      cat.id.toLowerCase() === category?.toLowerCase()
    );
    return categoryObj?.color || 'from-purple-500 to-rose-500';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
        <Header />
        <div className="pt-24 pb-16 flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-purple-200/20 rounded-full animate-float"></div>
          <div className="absolute bottom-1/3 right-1/6 w-40 h-40 bg-rose-200/25 rounded-full animate-pulse-slow"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
              Beauty Gallery
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover our complete collection of beauty articles, tutorials, and inspiration
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-2 mr-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600 font-medium">Filter by category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredArticles.length > 0 ? (
            <>
              <div className="text-center mb-8">
                <p className="text-gray-600">
                  Showing {filteredArticles.length} {selectedCategory === 'all' ? 'articles' : `${selectedCategory} articles`}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredArticles.map((article, index) => (
                  <article
                    key={article.id}
                    onClick={() => handleArticleClick(article.id)}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden animate-fade-in hover:scale-105 hover:-translate-y-2 cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={article.image_url || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop"}
                        alt={article.title}
                        className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`bg-gradient-to-r ${getCategoryColor(article.category)} text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg`}>
                          {article.category || 'Beauty'}
                        </span>
                      </div>

                      {/* Stats Overlay */}
                      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                        <div className="flex items-center justify-between text-white text-sm">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-3 h-3" />
                              <span>{formatCount(article.view_count || 0)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="w-3 h-3" />
                              <span>{formatCount(article.like_count || 0)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                        {article.excerpt || 'Discover amazing beauty techniques and styling tips in this comprehensive guide.'}
                      </p>

                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <User className="w-3 h-3" />
                            <span>Expert</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>5 min read</span>
                          </div>
                        </div>
                      </div>

                      <button className="flex items-center space-x-2 text-purple-600 font-semibold group-hover:space-x-3 transition-all duration-300 text-sm">
                        <span>Read More</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">
                No articles found in the {selectedCategory} category. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;