import React, { useState } from 'react';
import { Sparkles, TrendingUp, ArrowRight, Eye, Heart } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';
import { useArticlesWithStats } from '@/hooks/useArticles';
import { Link } from 'react-router-dom';

const TrendGallery = () => {
  const [activeTab, setActiveTab] = useState('all');
  const { t } = useTranslations();
  const { data: articles, isLoading } = useArticlesWithStats();

  const trendingTopics = [
    { id: 'manicure', name: t('trendGallery.topics.nailArt'), color: 'from-rose-500 to-pink-600', category: t('categories.manicure.title') },
    { id: 'wellness', name: t('trendGallery.topics.wellness'), color: 'from-emerald-500 to-green-600', category: t('categories.wellness.title') },
    { id: 'cosmetology', name: t('trendGallery.topics.makeup'), color: 'from-amber-500 to-orange-600', category: t('categories.cosmetology.title') }
  ];

  const filteredArticles = React.useMemo(() => {
    if (!articles) return [];
    
    let filtered = articles;
    if (activeTab !== 'all') {
      const selectedTopic = trendingTopics.find(topic => topic.id === activeTab);
      if (selectedTopic) {
        filtered = articles.filter(article => article.category === selectedTopic.id);
      }
    }
    
    // Sort by engagement (views + likes) and take top 6
    return filtered
      .sort((a, b) => ((b.view_count || 0) + (b.like_count || 0)) - ((a.view_count || 0) + (a.like_count || 0)))
      .slice(0, 6);
  }, [articles, activeTab, trendingTopics]);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const calculateTrendPercentage = (views: number, likes: number) => {
    const engagement = views + likes;
    // Simple calculation for trend percentage (this could be more sophisticated)
    const trendValue = Math.min(Math.floor((engagement / 100) * 10), 99);
    return `+${trendValue}%`;
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t('trendGallery.title')}
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl shadow-lg animate-pulse">
                <div className="w-full h-64 bg-gray-200 rounded-t-3xl"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-indigo-200/40 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/6 w-40 h-40 bg-purple-200/35 rounded-full animate-float"></div>
        <div className="absolute top-2/3 left-1/3 w-24 h-24 bg-pink-200/30 rounded-full animate-bounce-slow"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full px-6 py-2 mb-6">
            <TrendingUp className="w-4 h-4 text-indigo-500" />
            <span className="text-sm font-medium text-indigo-600">{t('trendGallery.badge')}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t('trendGallery.title')}
            </span>
            <br />
            <span className="text-2xl md:text-3xl text-gray-600 font-medium">
              {t('trendGallery.subtitle')}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('trendGallery.description')}
          </p>
        </div>

        {/* Trending Topics Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === 'all'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {t('trendGallery.trendingTopics')}
          </button>
          {trendingTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setActiveTab(topic.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === topic.id
                  ? `bg-gradient-to-r ${topic.color} text-white shadow-lg`
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {topic.name}
            </button>
          ))}
        </div>

        {/* Trending Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredArticles.map((article, index) => (
              <Link
                key={article.id}
                to={`/article/${article.slug || article.id}`}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden animate-fade-in hover:scale-105 hover:-translate-y-2 block"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={article.image_url || article.article_images?.[0]?.image_url}
                    alt={article.title}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Trend Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-xs font-semibold text-green-600">
                        {calculateTrendPercentage(article.view_count || 0, article.like_count || 0)}
                      </span>
                    </div>
                  </div>

                  {/* Stats Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <div className="flex items-center justify-between text-white text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{formatNumber(article.view_count || 0)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{formatNumber(article.like_count || 0)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-indigo-500" />
                      <span className="text-sm text-gray-500 capitalize">
                        {trendingTopics.find(e => e.id === article.category).category}
                      </span>
                    </div>
                    <button className="text-indigo-600 font-semibold text-sm hover:text-indigo-700 transition-colors flex items-center space-x-1 group-hover:space-x-2">
                      <span>{t('trendGallery.viewMore')}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">{t('trendGallery.noArticles')}</p>
          </div>
        )}

        {/* View More Button */}
        <div className="text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <span>{t('trendGallery.viewMore')}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendGallery;