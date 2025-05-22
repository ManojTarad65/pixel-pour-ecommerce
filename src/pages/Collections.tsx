
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
  gradient: string;
}

const collections: Collection[] = [
  {
    id: 'modern',
    title: 'Modern Collection',
    description: 'Sleek, minimal designs for the urban lifestyle. Feature advanced thermal properties and elegant finishes.',
    image: 'https://images.unsplash.com/photo-1575366297858-8a5d3c76cc10?w=800&auto=format&fit=crop',
    products: 12,
    gradient: 'gradient-primary'
  },
  {
    id: 'adventure',
    title: 'Adventure Series',
    description: 'Built to withstand the elements. Perfect for hiking, camping and outdoor activities.',
    image: 'https://images.unsplash.com/photo-1578598336954-4e34b3ba67ef?w=800&auto=format&fit=crop',
    products: 8,
    gradient: 'gradient-cool'
  },
  {
    id: 'eco',
    title: 'Eco-Friendly Line',
    description: 'Sustainable materials with zero environmental impact. Recyclable and biodegradable components.',
    image: 'https://images.unsplash.com/photo-1581152309595-c304b4d05c14?w=800&auto=format&fit=crop',
    products: 10,
    gradient: 'gradient-secondary'
  },
  {
    id: 'premium',
    title: 'Premium Collection',
    description: 'Luxury finishes and exclusive designs. Limited editions and artist collaborations.',
    image: 'https://images.unsplash.com/photo-1615062631393-99b145f47bea?w=800&auto=format&fit=crop',
    products: 6,
    gradient: 'gradient-sunset'
  },
  {
    id: 'kids',
    title: 'Kids Collection',
    description: 'Fun, durable designs perfect for children. Leak-proof caps and easy-to-clean materials.',
    image: 'https://images.unsplash.com/photo-1556895116-bc12e3005b2f?w=800&auto=format&fit=crop',
    products: 9,
    gradient: 'gradient-warm'
  },
  {
    id: 'custom',
    title: 'Custom Designs',
    description: 'Create your own unique bottle. Choose colors, patterns, and personalized engravings.',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop',
    products: 0,
    gradient: 'gradient-ocean'
  }
];

const Collections = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Navbar />
      <main>
        <div className="pt-24 pb-16 gradient-ocean">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Collections</h1>
              <p className="text-lg text-indigo-100 max-w-2xl mx-auto">
                Explore our curated collections of premium bottles designed for every lifestyle.
              </p>
            </motion.div>
          </div>
        </div>
        
        <div className="py-16 container mx-auto px-4 bg-gradient-to-b from-[#0f172a] to-indigo-900">
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
            className="mt-20 p-8 glass rounded-lg text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Looking for Something Special?</h2>
            <p className="text-indigo-100 mb-6">
              We offer custom corporate orders and personalized bottles for events, gifts, and promotions.
            </p>
            <Button 
              className="bg-accent hover:bg-accent/90 text-white"
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
      <div className={`relative overflow-hidden rounded-lg shadow-md h-80 ${collection.gradient}`}>
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <img 
          src={collection.image} 
          alt={collection.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop";
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <h3 className="text-2xl font-bold text-white">{collection.title}</h3>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-200">
              {collection.products} {collection.products === 1 ? 'Product' : 'Products'}
            </span>
            <motion.div 
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="glass rounded-full px-3 py-1 text-white text-sm font-medium"
            >
              View Collection
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-indigo-200 line-clamp-2">{collection.description}</p>
        <div className="mt-3 flex justify-between items-center">
          <Button 
            variant="ghost" 
            className="text-indigo-200 hover:text-white hover:bg-indigo-800/50"
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
              className={`${collection.gradient} text-white rounded-full shadow-lg`}
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
