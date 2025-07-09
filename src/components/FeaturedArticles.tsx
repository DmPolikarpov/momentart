import React, { useState } from 'react';
import { Clock, User, ArrowRight, Sparkles } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useArticles, calculateReadingTime } from '@/hooks/useArticles';
import { useTranslations } from '@/hooks/useTranslations';
import { Link } from 'react-router-dom';

const FeaturedArticles = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const { t } = useTranslations();

  const { data: articles = [], isLoading, error } = useArticles();

  const categories = [
    { id: 'all', label: t('featuredArticles.categories.all'), count: articles.length },
    { id: 'manicure', label: t('categories.manicure.title'), count: articles.filter(a => a.category === 'manicure').length },
    { id: 'eyelash', label: t('categories.eyelashes.title'), count: articles.filter(a => a.category === 'eyelash').length },
    { id: 'cosmetology', label: t('categories.cosmetology.title'), count: articles.filter(a => a.category === 'cosmetology').length },
    { id: 'skincare', label: t('categories.skincare.title'), count: articles.filter(a => a.category === 'skincare').length }
  ];

  const getActiveArticles = () => {
    return activeCategory === "all" ? articles : articles.filter(e => e.category === activeCategory);
  }

  if (error) {
    return (
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-600">{t('featuredArticles.error')}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white/50 backdrop-blur-sm relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-rose-200/30 to-pink-200/30 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-purple-200/30 to-rose-200/30 rounded-full animate-float-reverse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-500/10 to-pink-500/10 rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-rose-500" />
            <span className="text-sm font-medium text-rose-600">{t('featuredArticles.badge')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              {t('featuredArticles.title')}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('featuredArticles.description')}
          </p>
        </div>

        {/* Enhanced Category Tabs */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-12">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5 bg-white/80 backdrop-blur-sm shadow-lg rounded-full">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="rounded-full font-semibold transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:scale-105"
              >
                <span className="flex items-center space-x-2">
                  <span>{category.label}</span>
                  <span className="text-xs bg-white/20 rounded-full px-2 py-0.5">{category.count}</span>
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeCategory} className="mt-8">
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse">
                    <div className="w-full h-64 bg-gray-200"></div>
                    <div className="p-6">
                      <div className="h-6 bg-gray-200 rounded mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="h-4 w-20 bg-gray-200 rounded"></div>
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : getActiveArticles().length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">{t('featuredArticles.noArticles')}</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getActiveArticles().slice(0, 6).map((article, index) => {
                  const readingTime = calculateReadingTime(article.content || '');
                  const mainImage = article.article_images?.[0]?.image_url || article.image_url;
                  
                  return (
                    <Link
                      key={article.id}
                      to={`/article/${article.slug || article.id}`}
                      className={`group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden animate-fade-in transform hover:scale-105 hover:-translate-y-2 cursor-pointer block`}
                      style={{ animationDelay: `${index * 150}ms` }}
                      onMouseEnter={() => setHoveredCard(article.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div className="relative overflow-hidden">
                        {mainImage ? (
                          <img
                            src={mainImage}
                            alt={article.title}
                            className={`w-full h-64 object-cover transition-all duration-700 ${
                              hoveredCard === article.id ? 'scale-110' : 'scale-100'
                            }`}
                          />
                        ) : (
                          <div className="w-full h-64 bg-gradient-to-br from-rose-200 to-pink-200 flex items-center justify-center">
                            <Sparkles className="w-12 h-12 text-rose-400" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        {article.category && (
                          <div className="absolute top-4 left-4">
                            <span className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                              {categories.find(e => e.id === article.category).label}
                            </span>
                          </div>
                        )}
                        <div className={`absolute bottom-4 right-4 transition-all duration-300 ${
                          hoveredCard === article.id ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                        }`}>
                          <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                            <ArrowRight className="w-5 h-5 text-rose-600" />
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-rose-600 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {article.excerpt || (article.content ? article.content.substring(0, 150) + '...' : t('featuredArticles.noExcerpt'))}
                        </p>

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center space-x-4">
                            {/* <div className="flex items-center space-x-1">
                              <User className="w-4 h-4" />
                              <span>{article.profiles?.full_name || t('featuredArticles.anonymous')}</span>
                            </div> */}
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{readingTime} {t('common.minRead')}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 text-rose-600 font-semibold group-hover:space-x-3 transition-all duration-300">
                          <span>{t('featuredArticles.readMore')}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default FeaturedArticles;