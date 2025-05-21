
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';
import { Star } from 'lucide-react';

interface ReviewFormProps {
  productId: number;
  onReviewSubmitted: (review: any) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !comment || rating === 0) {
      toast.error('Please fill in all fields and provide a rating');
      return;
    }

    const newReview = {
      id: Date.now(),
      productId,
      name,
      rating,
      comment,
      date: new Date().toISOString()
    };

    onReviewSubmitted(newReview);
    
    // Reset form
    setRating(0);
    setName('');
    setComment('');
    
    toast.success('Review submitted successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-medium">Write a Review</h3>
      
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Your Name
        </label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Rating</label>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="focus:outline-none"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
            >
              <Star 
                fill={star <= (hoveredRating || rating) ? 'currentColor' : 'none'}
                className={`h-6 w-6 ${
                  star <= (hoveredRating || rating) 
                    ? 'text-yellow-400' 
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="comment" className="text-sm font-medium">
          Your Review
        </label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review here..."
          rows={4}
          required
        />
      </div>
      
      <Button type="submit">
        Submit Review
      </Button>
    </form>
  );
};

export default ReviewForm;
