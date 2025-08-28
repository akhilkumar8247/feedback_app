import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  size?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, size = 24 }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex gap-2 justify-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="transition-all duration-300 hover:scale-125 active:scale-110 focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-50 rounded-full p-1 hover:rotate-12 hover:shadow-lg"
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          aria-label={`Rate ${star} stars`}
        >
          <Star
            size={size}
            className={`transition-all duration-300 ${
              star <= (hoverRating || rating)
                ? 'fill-gradient-to-r from-yellow-400 to-orange-500 text-yellow-400 drop-shadow-lg'
                : 'text-gray-300 hover:text-yellow-400 hover:drop-shadow-md'
            }`}
            style={{
              filter: star <= (hoverRating || rating) ? 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))' : 'none'
            }}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;