
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Categories from '@/components/Categories';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Navbar />
      <main>
        <Hero />
        <div className="bg-gradient-to-b from-[#0f172a] to-indigo-900">
          <FeaturedProducts />
        </div>
        <div className="gradient-ocean text-white">
          <Categories />
        </div>
        <div className="gradient-sunset">
          <Newsletter />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
