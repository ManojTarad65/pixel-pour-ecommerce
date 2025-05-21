
import React from 'react';
import { Star } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Review {
  id: number;
  productId: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Customer Reviews</h3>
      
      <div className="divide-y divide-gray-200">
        {reviews.map((review) => (
          <div key={review.id} className="py-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  <span className="text-sm font-medium">{review.name.charAt(0)}</span>
                </div>
                <span className="font-medium">{review.name}</span>
              </div>
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(review.date), { addSuffix: true })}
              </span>
            </div>
            
            <div className="flex mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  fill={star <= review.rating ? 'currentColor' : 'none'}
                  className={`h-4 w-4 ${
                    star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
