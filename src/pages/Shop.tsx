
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useUser } from '@/contexts/UserContext';
import { products } from '@/data/products';

const categories = ["All", "Classic", "Thermal", "Insulated", "Modern", "Sports", "Glass", "Stainless Steel", "Kids"];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { addToCart } = useCart();
  const { isAuthenticated } = useUser();

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleAddToCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      const success = addToCart(product);
      if (!success && !isAuthenticated) {
        // This will trigger the auth modal through the navbar
      }
    }
  };

  const handleBuyNow = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      const success = addToCart(product);
      if (success) {
        toast.success(`Processing purchase for ${product?.name}!`, {
          description: "This would redirect to checkout in a real store."
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
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
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Shop All Bottles</h1>
              <p className="text-lg text-indigo-200 max-w-2xl mx-auto">
                Browse our complete collection of premium bottles designed for every lifestyle.
              </p>
            </motion.div>
          </div>
        </div>
        
        <div className="py-12 container mx-auto px-4 bg-gradient-to-t from-[#0f172a] to-transparent">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category 
                    ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg' 
                    : 'bg-white/10 text-indigo-100 hover:bg-white/20 backdrop-blur-sm'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
              <p className="text-xl text-indigo-300">No products found in this category.</p>
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
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { isAuthenticated } = useUser();
  const isFav = isFavorite(product.id);

  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      toast.error("Please login to add favorites");
      return;
    }
    
    if (isFav) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="bottle-card glass group relative h-full flex flex-col border-indigo-300/20 bg-white/5 backdrop-blur-sm">
        <div className="relative pt-4 px-4 overflow-hidden">
          {product.isNew && (
            <div className="absolute top-6 left-6 z-10 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
              NEW
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-6 right-6 z-10 ${
              isFav 
                ? 'text-red-500 hover:text-red-600' 
                : 'text-white/60 hover:text-red-500'
            }`}
            onClick={handleToggleFavorite}
          >
            <Heart 
              size={18} 
              fill={isFav ? 'currentColor' : 'none'}
            />
          </Button>
          <Link to={`/product/${product.id}`}>
            <motion.div 
              className="aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-indigo-900/30 to-purple-900/30 mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="h-full w-full object-cover object-center hover:opacity-90 transition-opacity" 
              />
            </motion.div>
          </Link>
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <span className="text-xs text-indigo-300 uppercase tracking-wider">{product.category}</span>
          <Link to={`/product/${product.id}`} className="hover:text-purple-400 transition-colors">
            <h3 className="font-semibold text-lg mt-1 text-white">{product.name}</h3>
          </Link>
          <p className="text-sm text-indigo-200 mt-2 line-clamp-2">{product.description}</p>
          <div className="mt-auto pt-4">
            <div className="font-medium text-lg mb-3 text-white">${product.price.toFixed(2)}</div>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-md"
                onClick={() => addToCart(product.id)}
              >
                <ShoppingCart className="h-4 w-4 mr-1" /> Add
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="border-indigo-400/30 text-indigo-100 hover:bg-indigo-600/20 hover:text-white"
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
