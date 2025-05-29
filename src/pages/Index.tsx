import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeaturedArticles from '../components/FeaturedArticles';
import TrendGallery from '../components/TrendGallery';
import Categories from '../components/Categories';
// import ExpertRecommends from '../components/ExpertRecommends';
import BeautyQuiz from '../components/BeautyQuiz';
// import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedArticles />
      <TrendGallery />
      <Categories />
      {/* <ExpertRecommends /> */}
      <BeautyQuiz />
      {/* <Newsletter /> */}
      <Footer />
    </div>
  );
};

export default Index;