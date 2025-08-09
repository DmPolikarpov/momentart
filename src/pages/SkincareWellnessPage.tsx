import React, { useState, useEffect } from 'react';
import { ArrowRight, Clock, User, Heart, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useArticles } from '../hooks/useArticles';
import { useTranslations } from '../hooks/useTranslations';

const SkincareWellnessPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const { data: articles = [], isLoading } = useArticles('wellness');
  const { t } = useTranslations();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleArticleClick = (articleId: string) => {
    navigate(`/article/${articleId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
        <Header />
        <div className="pt-24 pb-16 flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  const featuredArticle = articles.find((_, index) => index === 0);
  const regularArticles = articles.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-emerald-200/20 rounded-full animate-float"></div>
          <div className="absolute bottom-1/3 right-1/6 w-40 h-40 bg-green-200/25 rounded-full animate-pulse-slow"></div>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-glitter"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              <Leaf className="w-4 h-4 text-green-400/60" />
            </div>
          ))}
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className={`inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8 shadow-lg transition-all duration-1000 ${isLoaded ? 'animate-slide-down opacity-100' : 'opacity-0 -translate-y-10'}`}>
            <Heart className="w-5 h-5 text-emerald-500 animate-pulse" />
            <span className="text-sm font-medium text-gray-700">{t('categories.wellness.title')}</span>
          </div>
          
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 transition-all duration-1200 ${isLoaded ? 'animate-text-reveal opacity-100' : 'opacity-0'}`}>
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              {t('categories.wellness.title')}
            </span>
          </h1>
          
          <p className={`text-xl text-gray-600 mb-8 max-w-2xl mx-auto transition-all duration-1500 delay-300 ${isLoaded ? 'animate-slide-up-fade opacity-100' : 'opacity-0 translate-y-8'}`}>
            {t('categories.wellness.description')}
          </p>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-16 bg-white/60 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="animate-fade-in">
                  <div className="flex items-center space-x-2 mb-4">
                    <Leaf className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-medium text-emerald-600">{t('pages.wellness.holisticApproach')}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-xl text-gray-600 mb-6">
                    {featuredArticle.excerpt || t('pages.wellness.defaultExcerpt')}
                  </p>
                  <div className="flex items-center space-x-4 mb-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{t('pages.wellness.wellnessExpert')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>10 {t('common.minRead')}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleArticleClick(featuredArticle.id)}
                    className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                  >
                    <span>{t('featuredArticles.readMore')}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="animate-fade-in animation-delay-200">
                  <img
                    src={featuredArticle.image_url || "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800&h=600&fit=crop"}
                    alt={featuredArticle.title}
                    className="w-full h-80 object-cover rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500 cursor-pointer"
                    onClick={() => handleArticleClick(featuredArticle.id)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
            {t('pages.wellness.latestArticles')}
          </h2>
          
          {regularArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularArticles.map((article, index) => (
                <article
                  key={article.id}
                  onClick={() => handleArticleClick(article.id)}
                  className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden animate-fade-in hover:scale-105 hover:-translate-y-2 cursor-pointer`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={article.image_url || "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800&h=600&fit=crop"}
                      alt={article.title}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt || t('pages.wellness.defaultDescription')}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{t('pages.wellness.wellnessExpert')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>8 {t('common.minRead')}</span>
                        </div>
                      </div>
                    </div>

                    <button className="flex items-center space-x-2 text-emerald-600 font-semibold group-hover:space-x-3 transition-all duration-300">
                      <span>{t('featuredArticles.readMore')}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">{t('pages.common.noArticles')}</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SkincareWellnessPage;