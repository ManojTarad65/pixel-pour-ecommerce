
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { products } from '@/data/products';
import { toast } from '@/components/ui/sonner';

const FeaturedProducts = () => {
  const { addToCart } = useCart();
  
  const featuredProducts = products.slice(0, 4);
  
  const handleAddToCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addToCart(product);
      toast.success(`${product.name} added to cart!`);
    }
  };

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
          {featuredProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index} 
              onAddToCart={handleAddToCart} 
            />
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/shop">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-navy-400 text-navy-700 hover:bg-navy-100/50"
            >
              View All Products
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const ProductCard = ({ 
  product, 
  index, 
  onAddToCart 
}: { 
  product: any, 
  index: number, 
  onAddToCart: (id: number) => void 
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
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop";
                }}
              />
            </motion.div>
          </Link>
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <span className="text-xs text-gray-500 uppercase tracking-wider">{product.category}</span>
          <Link to={`/product/${product.id}`}>
            <h3 className="font-semibold text-lg mt-1 text-navy-800 hover:text-bottle-500 transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
          <div className="mt-auto pt-4 flex items-center justify-between">
            <span className="font-medium text-lg">${product.price.toFixed(2)}</span>
            <Button 
              size="sm" 
              className="bg-navy-700 hover:bg-navy-800 text-white rounded-full"
              onClick={() => onAddToCart(product.id)}
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
