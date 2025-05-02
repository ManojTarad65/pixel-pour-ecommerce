
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface Collection {
  id: string;
  title: string;
  description: string;
  image: string;
  products: number;
}

const collections: Collection[] = [
  {
    id: 'modern',
    title: 'Modern Collection',
    description: 'Sleek, minimal designs for the urban lifestyle. Feature advanced thermal properties and elegant finishes.',
    image: 'https://images.unsplash.com/photo-1575366297858-8a5d3c76cc10?w=800&auto=format&fit=crop',
    products: 12
  },
  {
    id: 'adventure',
    title: 'Adventure Series',
    description: 'Built to withstand the elements. Perfect for hiking, camping and outdoor activities.',
    image: 'https://images.unsplash.com/photo-1578598336954-4e34b3ba67ef?w=800&auto=format&fit=crop',
    products: 8
  },
  {
    id: 'eco',
    title: 'Eco-Friendly Line',
    description: 'Sustainable materials with zero environmental impact. Recyclable and biodegradable components.',
    image: 'https://images.unsplash.com/photo-1581152309595-c304b4d05c14?w=800&auto=format&fit=crop',
    products: 10
  },
  {
    id: 'premium',
    title: 'Premium Collection',
    description: 'Luxury finishes and exclusive designs. Limited editions and artist collaborations.',
    image: 'https://images.unsplash.com/photo-1615062631393-99b145f47bea?w=800&auto=format&fit=crop',
    products: 6
  },
  {
    id: 'kids',
    title: 'Kids Collection',
    description: 'Fun, durable designs perfect for children. Leak-proof caps and easy-to-clean materials.',
    image: 'https://images.unsplash.com/photo-1556895116-bc12e3005b2f?w=800&auto=format&fit=crop',
    products: 9
  },
  {
    id: 'custom',
    title: 'Custom Designs',
    description: 'Create your own unique bottle. Choose colors, patterns, and personalized engravings.',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop',
    products: 0
  }
];

const Collections = () => {
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
              <h1 className="text-4xl md:text-5xl font-bold text-navy-800 mb-4">Our Collections</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our curated collections of premium bottles designed for every lifestyle.
              </p>
            </motion.div>
          </div>
        </div>
        
        <div className="py-16 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection, index) => (
              <CollectionCard key={collection.id} collection={collection} index={index} />
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-20 p-8 bg-navy-50 rounded-lg text-center"
          >
            <h2 className="text-2xl font-bold text-navy-800 mb-4">Looking for Something Special?</h2>
            <p className="text-gray-600 mb-6">
              We offer custom corporate orders and personalized bottles for events, gifts, and promotions.
            </p>
            <Button 
              className="bg-bottle-600 hover:bg-bottle-700 text-white"
              onClick={() => window.location.href = '/contact'}
            >
              Contact Us
            </Button>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const CollectionCard = ({ collection, index }: { collection: Collection, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
      onClick={() => window.location.href = '/shop'}
    >
      <div className="relative overflow-hidden rounded-lg shadow-md h-80">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
        <img 
          src={collection.image} 
          alt={collection.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <h3 className="text-2xl font-bold text-white">{collection.title}</h3>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-200">
              {collection.products} {collection.products === 1 ? 'Product' : 'Products'}
            </span>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              View Collection
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-gray-600 line-clamp-2">{collection.description}</p>
        <div className="mt-3 flex justify-between items-center">
          <Button 
            variant="outline" 
            className="text-navy-700 border-navy-300 hover:bg-navy-50"
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = '/shop';
            }}
          >
            Explore
          </Button>
          
          {collection.products > 0 && (
            <Button 
              size="sm" 
              className="bg-bottle-600 hover:bg-bottle-700 text-white rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = '/shop';
              }}
            >
              <ShoppingCart className="h-4 w-4 mr-1" /> Shop Now
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Collections;
