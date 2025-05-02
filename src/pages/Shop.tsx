
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Azure Classic",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop",
    category: "Classic",
    isNew: true,
    description: "Our bestselling water bottle with a sleek design and double-wall insulation."
  },
  {
    id: 2,
    name: "Eco Thermal",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1581152309595-c304b4d05c14?w=600&auto=format&fit=crop",
    category: "Thermal",
    description: "Eco-friendly thermal bottle made from recycled materials."
  },
  {
    id: 3,
    name: "Summit Insulated",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1610631687337-04552bfb8d85?w=600&auto=format&fit=crop",
    category: "Insulated",
    description: "Perfect for hiking and outdoor adventures with 24hr temperature retention."
  },
  {
    id: 4,
    name: "Minimalist Sleek",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1610631787330-c3eac43fbf60?w=600&auto=format&fit=crop",
    category: "Modern",
    isNew: true,
    description: "Clean, minimalist design with premium materials for everyday use."
  },
  {
    id: 5,
    name: "Adventure Pro",
    price: 42.99,
    image: "https://images.unsplash.com/photo-1578598336954-4e34b3ba67ef?w=600&auto=format&fit=crop",
    category: "Sports",
    description: "Built for adventure with a durable exterior and leak-proof cap."
  },
  {
    id: 6,
    name: "Urban Glass",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1615062631393-99b145f47bea?w=600&auto=format&fit=crop",
    category: "Glass",
    description: "Stylish glass bottle with silicone sleeve for urban lifestyles."
  },
  {
    id: 7,
    name: "Stainless Steel Elite",
    price: 36.99,
    image: "https://images.unsplash.com/photo-1556895116-bc12e3005b2f?w=600&auto=format&fit=crop",
    category: "Stainless Steel",
    description: "Premium stainless steel bottle that keeps drinks cold for 48 hours."
  },
  {
    id: 8,
    name: "Kids Explorer",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1575366297858-8a5d3c76cc10?w=600&auto=format&fit=crop",
    category: "Kids",
    description: "Fun, kid-friendly design with easy-to-use straw and carry handle."
  }
];

const categories = ["All", "Classic", "Thermal", "Insulated", "Modern", "Sports", "Glass", "Stainless Steel", "Kids"];

// This is a basic shop page
const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartItems, setCartItems] = useState<{id: number, quantity: number}[]>([]);

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (productId: number) => {
    const existingItem = cartItems.find(item => item.id === productId);
    
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { id: productId, quantity: 1 }]);
    }
    
    const product = products.find(p => p.id === productId);
    toast.success(`${product?.name} added to cart!`);
  };

  const buyNow = (productId: number) => {
    const product = products.find(p => p.id === productId);
    toast.success(`Processing purchase for ${product?.name}!`, {
      description: "This would redirect to checkout in a real store."
    });
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
                addToCart={addToCart}
                buyNow={buyNow}
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
  product: Product, 
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
