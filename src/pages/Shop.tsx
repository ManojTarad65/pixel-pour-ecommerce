
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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <main>
        {/* Hero Section */}
        <div className="pt-24 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Bottles</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Discover our complete collection of premium bottles designed for every lifestyle and adventure.
              </p>
            </motion.div>
          </div>
        </div>
        
        <div className="py-12 container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25' 
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 backdrop-blur-sm border border-slate-700/50'
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-2xl text-slate-400">No products found in this category.</p>
              <p className="text-slate-500 mt-2">Try selecting a different category.</p>
            </motion.div>
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
  const [imageError, setImageError] = useState(false);
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

  const handleImageError = () => {
    setImageError(true);
  };

  const getImageSrc = () => {
    if (imageError) {
      return "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80";
    }
    return product.image;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <Card className="group relative h-full flex flex-col bg-slate-800/30 backdrop-blur-sm border-slate-700/50 hover:border-purple-500/30 transition-all duration-300 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative pt-6 px-6 overflow-hidden">
          {product.isNew && (
            <div className="absolute top-8 left-8 z-10 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              NEW
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-8 right-8 z-10 rounded-full ${
              isFav 
                ? 'text-red-500 hover:text-red-600 bg-white/10' 
                : 'text-slate-400 hover:text-red-500 bg-white/5 hover:bg-white/10'
            } transition-all duration-200`}
            onClick={handleToggleFavorite}
          >
            <Heart 
              size={18} 
              fill={isFav ? 'currentColor' : 'none'}
            />
          </Button>
          
          <Link to={`/product/${product.id}`}>
            <motion.div 
              className="aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 mb-6 relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={getImageSrc()} 
                alt={product.name} 
                className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-500" 
                onError={handleImageError}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          </Link>
        </div>
        
        <div className="p-6 flex-grow flex flex-col relative z-10">
          <span className="text-xs text-purple-400 uppercase tracking-wider font-medium">{product.category}</span>
          <Link to={`/product/${product.id}`} className="hover:text-purple-400 transition-colors">
            <h3 className="font-semibold text-xl mt-2 text-white group-hover:text-purple-300 transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-slate-400 mt-3 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
          
          <div className="mt-auto pt-6">
            <div className="font-bold text-2xl mb-4 text-white">
              ${product.price.toFixed(2)}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-500/25 transition-all duration-200"
                onClick={() => addToCart(product.id)}
              >
                <ShoppingCart className="h-4 w-4 mr-2" /> Add
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white hover:border-slate-500 transition-all duration-200"
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
