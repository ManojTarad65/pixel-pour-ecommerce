
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/components/ui/sonner';
import ReviewForm from '@/components/product/ReviewForm';
import ReviewList from '@/components/product/ReviewList';
import { products } from '@/data/products';

interface Review {
  id: number;
  productId: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState<Review[]>([]);
  
  const product = products.find(p => p.id === parseInt(id || '0'));
  
  useEffect(() => {
    // In a real app, fetch reviews from API
    const savedReviews = localStorage.getItem(`reviews_${id}`);
    if (savedReviews) {
      try {
        setReviews(JSON.parse(savedReviews));
      } catch (e) {
        console.error("Error parsing saved reviews:", e);
      }
    }
  }, [id]);
  
  const saveReviews = (newReviews: Review[]) => {
    localStorage.setItem(`reviews_${id}`, JSON.stringify(newReviews));
    setReviews(newReviews);
  };
  
  const handleAddReview = (review: Review) => {
    const newReviews = [...reviews, review];
    saveReviews(newReviews);
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      toast.success("Proceeding to checkout...", {
        description: "In a real store, this would redirect to checkout."
      });
    }
  };
  
  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 pt-24 pb-16">
          <p className="text-center text-xl">Product not found</p>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-lg overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full object-cover object-center md:h-[500px]"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col"
          >
            <div>
              <span className="text-sm text-gray-500 uppercase tracking-wider">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-navy-800 mt-1">
                {product.name}
              </h1>
              
              <div className="flex items-center mt-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      fill={star <= Math.round(averageRating) ? 'currentColor' : 'none'}
                      className={`h-5 w-5 ${
                        star <= Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {reviews.length > 0 
                    ? `${averageRating.toFixed(1)} (${reviews.length} reviews)` 
                    : 'No reviews yet'}
                </span>
              </div>
              
              <div className="mt-6">
                <p className="text-2xl font-semibold text-navy-800">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-gray-700">{product.description}</p>
              </div>
              
              <div className="mt-8">
                <div className="flex items-center mb-4">
                  <label htmlFor="quantity" className="mr-4 text-sm font-medium">
                    Quantity:
                  </label>
                  <div className="flex items-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      disabled={quantity <= 1}
                      className="h-8 w-8 p-0"
                    >
                      -
                    </Button>
                    <span className="mx-3 w-8 text-center">{quantity}</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-8 w-8 p-0"
                    >
                      +
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={handleAddToCart}
                    className="bg-navy-700 hover:bg-navy-800 text-white"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                  </Button>
                  <Button
                    onClick={handleBuyNow}
                    variant="outline"
                    className="border-navy-400 text-navy-700 hover:bg-navy-100/50"
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16"
        >
          <div>
            <ReviewList reviews={reviews} />
          </div>
          <div>
            <ReviewForm productId={product.id} onReviewSubmitted={handleAddReview} />
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
