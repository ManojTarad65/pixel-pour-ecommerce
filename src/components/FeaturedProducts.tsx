
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: "Azure Classic",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop",
    category: "Classic",
    isNew: true,
  },
  {
    id: 2,
    name: "Eco Thermal",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1581152309595-c304b4d05c14?w=600&auto=format&fit=crop",
    category: "Thermal",
  },
  {
    id: 3,
    name: "Summit Insulated",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1610631687337-04552bfb8d85?w=600&auto=format&fit=crop",
    category: "Insulated",
  },
  {
    id: 4,
    name: "Minimalist Sleek",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1610631787330-c3eac43fbf60?w=600&auto=format&fit=crop",
    category: "Modern",
    isNew: true,
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-20 bg-gray-50" id="featured">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4">Featured Bottles</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our most popular designs, crafted with premium materials for an exceptional experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button 
            variant="outline" 
            size="lg" 
            className="border-navy-400 text-navy-700 hover:bg-navy-100/50"
          >
            View All Products
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

const ProductCard = ({ product, index }: { product: Product, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="bottle-card group relative h-full flex flex-col">
        <div className="relative pt-4 px-4 overflow-hidden">
          {product.isNew && (
            <div className="absolute top-6 left-6 z-10 bg-bottle-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              NEW
            </div>
          )}
          <motion.div 
            className="aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="h-full w-full object-cover object-center" 
            />
          </motion.div>
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <span className="text-xs text-gray-500 uppercase tracking-wider">{product.category}</span>
          <h3 className="font-semibold text-lg mt-1 text-navy-800">{product.name}</h3>
          <div className="mt-auto pt-4 flex items-center justify-between">
            <span className="font-medium text-lg">${product.price.toFixed(2)}</span>
            <Button 
              size="sm" 
              className="bg-navy-700 hover:bg-navy-800 text-white rounded-full"
            >
              <ShoppingCart className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default FeaturedProducts;
