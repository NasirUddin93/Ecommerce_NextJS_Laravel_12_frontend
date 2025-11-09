import React, { useState } from 'react';
import { Review } from '../types/product';
import { Star, Heart, Check, HelpCircle } from 'lucide-react';

interface ProductReviewsProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  ratingDistribution: Record<number, number>;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({
  reviews,
  averageRating,
  totalReviews,
  ratingDistribution
}) => {
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'highest' | 'lowest'>('recent');

  const filteredReviews = reviews
    .filter(review => !filterRating || review.rating === filterRating)
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'helpful':
          return b.helpful - a.helpful;
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

  const renderStars = (rating: number, size: 'sm' | 'md' = 'md') => {
    const starSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`${starSize} ${
          index < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        {/* Rating Summary */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-900">{averageRating}</div>
            <div className="flex justify-center mb-2">
              {renderStars(averageRating, 'md')}
            </div>
            <div className="text-sm text-gray-500">{totalReviews} reviews</div>
          </div>
          
          {/* Rating Distribution */}
          <div className="space-y-2 min-w-48">
            {[5, 4, 3, 2, 1].map(rating => (
              <button
                key={rating}
                onClick={() => setFilterRating(filterRating === rating ? null : rating)}
                className="flex items-center gap-2 w-full group"
              >
                <div className="flex items-center gap-1 w-8">
                  <span className="text-sm text-gray-600">{rating}</span>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${((ratingDistribution[rating] || 0) / totalReviews) * 100}%`
                    }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-8 text-right">
                  {ratingDistribution[rating] || 0}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="recent">Most Recent</option>
            <option value="helpful">Most Helpful</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
          </select>
          
          {filterRating && (
            <button
              onClick={() => setFilterRating(null)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map(review => (
          <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {review.user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{review.user.name}</h4>
                    {review.user.verified && (
                      <Check className="w-4 h-4 text-blue-500" />
                    )}
                    {review.verifiedPurchase && (
                      <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {renderStars(review.rating, 'sm')}
                    </div>
                    <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
                  </div>
                </div>
              </div>
              
              <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors">
                <HelpCircle className="w-4 h-4" />
                <span className="text-sm">Report</span>
              </button>
            </div>

            <div className="space-y-3">
              <h5 className="font-semibold text-gray-900 text-lg">{review.title}</h5>
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
              
              {/* Review Images */}
              {review.images && review.images.length > 0 && (
                <div className="flex gap-2">
                  {review.images.map((image, index) => (
                    <button
                      key={index}
                      className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center"
                    >
                      <span className="text-xs text-gray-500">Image {index + 1}</span>
                    </button>
                  ))}
                </div>
              )}
              
              {/* Helpful Actions */}
              <div className="flex items-center gap-4 pt-2">
                <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">Helpful ({review.helpful})</span>
                </button>
                <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                  Reply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {filteredReviews.length > 0 && (
        <div className="text-center">
          <button className="bg-white border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;