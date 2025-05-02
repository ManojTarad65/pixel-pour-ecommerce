
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const Contact = () => {
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
              <h1 className="text-4xl md:text-5xl font-bold text-navy-800 mb-4">Contact Us</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Have questions or feedback? We'd love to hear from you.
              </p>
            </motion.div>
          </div>
        </div>
        
        <div className="py-16 container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-navy-700">Contact form coming soon!</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
