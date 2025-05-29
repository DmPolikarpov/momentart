import React, { useState } from 'react';
import { Clock, User, ArrowRight, Sparkles } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const FeaturedArticles = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const articles = [
    {
      id: 1,
      title: "Summer Nail Art Trends That Will Make You Stand Out",
      excerpt: "Discover the hottest nail designs for summer 2024, from minimalist chrome to bold tropical patterns.",
      author: "Emma Rodriguez",
      readTime: "5 min read",
      category: "manicure",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop"
    },
    {
      id: 2,
      title: "The Art of Perfect Eyelash Extensions: A Complete Guide",
      excerpt: "Learn everything about eyelash extensions, from choosing the right style to proper aftercare.",
      author: "Sophia Chen",
      readTime: "8 min read",
      category: "eyelashes",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop"
    },
    {
      id: 3,
      title: "Revolutionary Skincare Ingredients Transforming Beauty",
      excerpt: "Explore the latest breakthrough ingredients that are changing the skincare game forever.",
      author: "Dr. Maria Santos",
      readTime: "6 min read",
      category: "cosmetology",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop"
    },
    {
      id: 4,
      title: "French Manicure Evolution: Modern Twists on a Classic",
      excerpt: "How the timeless French manicure is being reimagined for contemporary beauty enthusiasts.",
      author: "Isabella Marie",
      readTime: "4 min read",
      category: "manicure",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=600&fit=crop"
    },
    {
      id: 5,
      title: "Volume Lashes 2024: Creating Dramatic Eye Looks",
      excerpt: "Master the art of volume lashing with these professional techniques and insider tips.",
      author: "Luna Beauty",
      readTime: "7 min read",
      category: "eyelashes",
      image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&h=600&fit=crop"
    },
    {
      id: 6,
      title: "Anti-Aging Breakthrough: Peptides in Modern Skincare",
      excerpt: "Understanding how peptides work to combat aging and improve skin texture and appearance.",
      author: "Dr. Sarah Kim",
      readTime: "9 min read",
      category: "cosmetology",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Articles', count: articles.length },
    { id: 'manicure', label: 'Manicure', count: articles.filter(a => a.category === 'manicure').length },
    { id: 'eyelashes', label: 'Eyelashes', count: articles.filter(a => a.category === 'eyelashes').length },
    { id: 'cosmetology', label: 'Cosmetology', count: articles.filter(a => a.category === 'cosmetology').length }
  ];

  const filteredArticles = activeCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === activeCategory);

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
            <span className="text-sm font-medium text-rose-600">Latest Updates</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Featured Stories
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest beauty trends, expert tips, and industry insights
          </p>
        </div>

        {/* Enhanced Category Tabs */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-12">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 bg-white/80 backdrop-blur-sm shadow-lg rounded-full p-2">
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <article
                  key={article.id}
                  className={`group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden animate-fade-in transform hover:scale-105 hover:-translate-y-2 cursor-pointer`}
                  style={{ animationDelay: `${index * 150}ms` }}
                  onMouseEnter={() => setHoveredCard(article.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className={`w-full h-64 object-cover transition-all duration-700 ${
                        hoveredCard === article.id ? 'scale-110' : 'scale-100'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                        {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                      </span>
                    </div>
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
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>

                    <button className="flex items-center space-x-2 text-rose-600 font-semibold group-hover:space-x-3 transition-all duration-300">
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default FeaturedArticles;