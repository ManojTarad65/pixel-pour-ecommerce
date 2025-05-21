
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { products } from '@/data/products';

const categories = ["All", "Classic", "Thermal", "Insulated", "Modern", "Sports", "Glass", "Stainless Steel", "Kids"];

// This is a basic shop page
const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { addToCart } = useCart();

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleAddToCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addToCart(product);
    }
  };

  const handleBuyNow = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addToCart(product);
      toast.success(`Processing purchase for ${product?.name}!`, {
        description: "This would redirect to checkout in a real store."
      });
    }
  };

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
        
        <div className="py-12 container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category 
                    ? 'bg-bottle-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05, duration: 0.5 }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={index} 
                addToCart={handleAddToCart}
                buyNow={handleBuyNow}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-10">
              <p className="text-xl text-gray-500">No products found in this category.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

const ProductCard = ({ 
  product, 
  index, 
  addToCart, 
  buyNow 
}: { 
  product: any, 
  index: number, 
  addToCart: (id: number) => void,
  buyNow: (id: number) => void
}) => {
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
          <Link to={`/product/${product.id}`}>
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
          </Link>
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <span className="text-xs text-gray-500 uppercase tracking-wider">{product.category}</span>
          <Link to={`/product/${product.id}`} className="hover:text-bottle-600">
            <h3 className="font-semibold text-lg mt-1 text-navy-800">{product.name}</h3>
          </Link>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
          <div className="mt-auto pt-4">
            <div className="font-medium text-lg mb-3">${product.price.toFixed(2)}</div>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                size="sm" 
                className="bg-navy-700 hover:bg-navy-800 text-white"
                onClick={() => addToCart(product.id)}
              >
                <ShoppingCart className="h-4 w-4 mr-1" /> Add
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="border-navy-400 text-navy-700 hover:bg-navy-100/50"
                onClick={() => buyNow(product.id)}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default Shop;
