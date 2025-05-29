import React, { useEffect, useState } from 'react';
import { ArrowRight, Star, Palette } from 'lucide-react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero bg-no-repeat bg-cover">
      {/* Animated Artistic Background */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-emerald-100 via-teal-100 to-cyan-100 animate-gradient-shift">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent animate-pulse"></div>
      </div> */}

      {/* Floating Art Elements */}
      {/* <div className="absolute inset-0"> */}
        {/* Floating Paint Brushes */}
        {/* <div className="absolute top-1/4 left-1/4 w-8 h-16 opacity-30">
          <div className="w-2 h-12 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full animate-float-brush"></div>
          <div className="w-6 h-4 bg-gradient-to-r from-yellow-300 to-green-300 rounded-full mt-1 animate-pulse"></div>
        </div> */}
        
        {/* Floating Paint Drops */}
        {/* <div className="absolute top-1/3 right-1/4 animate-float-slow">
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i} 
                className={`w-3 h-3 rounded-full animate-bounce-gentle`} 
                style={{ 
                  backgroundColor: ['#10b981', '#06d6a0', '#118ab2'][i],
                  animationDelay: `${i * 200}ms`
                }}
              ></div>
            ))}
          </div>
        </div> */}

        {/* Art Palette Elements */}
        {/* {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-glitter"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            <Palette className="w-4 h-4 text-green-400/60" />
          </div>
        ))} */}

        {/* Background Orbs */}
        {/* <div className="absolute top-20 left-10 w-32 h-32 bg-green-200/20 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-32 right-20 w-24 h-24 bg-emerald-200/30 rounded-full animate-bounce-slow"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-teal-200/25 rounded-full animate-float"></div>
      </div> */}

    <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Floating Badge */}
          <div className={`inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8 shadow-lg transition-all duration-1000 ${isLoaded ? 'animate-slide-down opacity-100' : 'opacity-0 -translate-y-10'}`}>
            <Star className="w-5 h-5 text-green-500 animate-spin-slow" />
            <span className="text-sm font-medium text-gray-700">Creative Inspiration & Artistic Trends</span>
          </div>

          {/* Main Heading with Advanced Animation */}
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 transition-all duration-1200 ${isLoaded ? 'animate-text-reveal opacity-100' : 'opacity-0'}`}>
            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent animate-gradient-text">
              Moment Art
            </span>
            <br />
            <span className="text-gray-800 animate-slide-up">Gallery</span>
          </h1>

          {/* Subtitle with Fade-in from Bottom */}
          <p className={`text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed transition-all duration-1500 delay-300 ${isLoaded ? 'animate-slide-up-fade opacity-100' : 'opacity-0 translate-y-8'}`}>
            Discover stunning artworks, connect with talented artists, and find your creative inspiration. 
            Your ultimate destination for artistic expression.
          </p>

          {/* Enhanced CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1800 delay-600 ${isLoaded ? 'animate-buttons-appear opacity-100' : 'opacity-0 scale-95'}`}>
            <button className="group bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 hover:from-green-600 hover:to-emerald-700 animate-pulse-button">
              <span className="flex items-center justify-center space-x-2">
                <span>Explore Gallery</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </button>
            <button className="bg-white/80 backdrop-blur-sm text-gray-800 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-green-200">
              Join Community
            </button>
          </div>
        </div>

        {/* Enhanced Floating Images */}
        {/* <div className="absolute top-1/2 left-10 hidden lg:block">
          <div className="w-24 h-32 bg-gradient-to-br from-green-200 to-emerald-300 rounded-2xl shadow-lg transform rotate-12 opacity-80 animate-float-rotate"></div>
        </div>
        <div className="absolute top-1/3 right-16 hidden lg:block">
          <div className="w-20 h-28 bg-gradient-to-br from-teal-200 to-green-300 rounded-2xl shadow-lg transform -rotate-6 opacity-80 animate-float-reverse"></div>
        </div> */}
    </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-green-300 rounded-full flex justify-center animate-bounce-gentle">
          <div className="w-1 h-3 bg-green-400 rounded-full mt-2 animate-scroll-indicator"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;