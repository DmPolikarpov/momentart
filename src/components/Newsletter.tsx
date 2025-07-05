import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, ArrowRight, Sparkles } from 'lucide-react';

const Newsletter = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-white font-medium">{t('newsletter.badge')}</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('newsletter.title')}
          </h2>

          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('newsletter.description')}
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('newsletter.placeholder')}
                  className="w-full pl-12 pr-4 py-4 rounded-full bg-white/95 backdrop-blur-sm border-0 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubscribed}
                className="px-8 py-4 bg-white text-rose-600 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30 disabled:opacity-50 group"
              >
                {isSubscribed ? (
                  <span className="flex items-center space-x-2">
                    <span>{t('newsletter.subscribed')}</span>
                    <Sparkles className="w-5 h-5" />
                  </span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <span>{t('newsletter.subscribe')}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </button>
            </div>
          </form>

          <p className="text-white/70 text-sm mt-6">
            {t('newsletter.disclaimer')}
          </p>

          <div className="flex justify-center space-x-8 mt-12">
            {[t('newsletter.features.tips'), t('newsletter.features.content'), t('newsletter.features.alerts')].map((feature, index) => (
              <div key={feature} className={`text-center animate-fade-in`} style={{ animationDelay: `${index * 200}ms` }}>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/90 text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;