
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

// This is a basic shop page that can be expanded later
const Shop = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <div className="pt-24 pb-16 bg-navy-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-navy-800 mb-4">Shop All Bottles</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Browse our complete collection of premium bottles designed for every lifestyle.
              </p>
            </motion.div>
          </div>
        </div>
        
        <div className="py-16 container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-navy-700">Shop page content coming soon!</p>
          </div>
          <div className="text-center mt-8">
            <Button 
              onClick={() => window.history.back()}
              className="bg-bottle-600 hover:bg-bottle-700 text-white"
            >
              Go Back
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
