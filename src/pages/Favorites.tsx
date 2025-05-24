
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useCart } from '@/contexts/CartContext';
import { useUser } from '@/contexts/UserContext';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();
  const { addToCart } = useCart();
  const { isAuthenticated } = useUser();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-16 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Please log in to view your favorites</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white flex items-center gap-3">
              <Heart className="h-8 w-8 text-red-500" fill="currentColor" />
              My Favorites ({favorites.length})
            </h1>
            {favorites.length > 0 && (
              <Button 
                variant="outline" 
                onClick={clearFavorites}
                className="border-red-400/30 text-red-300 hover:bg-red-600/20 hover:text-red-200"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>

          {favorites.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-medium text-white mb-2">No favorites yet</h3>
              <p className="text-indigo-200 mb-6">Start browsing and add items to your favorites</p>
              <Link to="/shop">
                <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                  Browse Products
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="glass group relative h-full flex flex-col border-indigo-300/20 bg-white/5 backdrop-blur-sm">
                    <div className="relative pt-4 px-4 overflow-hidden">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-6 right-6 z-10 text-red-500 hover:text-red-600"
                        onClick={() => removeFromFavorites(product.id)}
                      >
                        <Heart size={18} fill="currentColor" />
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
                      <div className="mt-auto pt-4">
                        <div className="font-medium text-lg mb-3 text-white">${product.price.toFixed(2)}</div>
                        <div className="grid grid-cols-2 gap-2">
                          <Button 
                            size="sm" 
                            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-md"
                            onClick={() => addToCart(product)}
                          >
                            <ShoppingCart className="h-4 w-4 mr-1" /> Add
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-red-400/30 text-red-300 hover:bg-red-600/20 hover:text-red-200"
                            onClick={() => removeFromFavorites(product.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" /> Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Favorites;
