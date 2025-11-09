import React from 'react';
import { SaleProduct, CountdownTimer } from '../types/sale';
import { Star, Heart, ShoppingCart, Eye, Clock, Zap, Flame, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

interface SaleProductCardProps {
  product: SaleProduct;
  viewMode: 'grid' | 'list' | 'compact';
  onAddToCart: (product: SaleProduct) => void;
  onQuickView: (product: SaleProduct) => void;
  onAddToWishlist: (product: SaleProduct) => void;
  countdownTimer?: CountdownTimer;
}

const SaleProductCard: React.FC<SaleProductCardProps> = ({
  product,
  viewMode,
  onAddToCart,
  onQuickView,
  onAddToWishlist,
  countdownTimer
}) => {
  const [isWishlisted, setIsWishlisted] = React.useState(false);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-3 h-3 ${
          index < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getDiscountTierIcon = () => {
    switch (product.discountTier) {
      case 'hot':
        return <Flame className="w-3 h-3" />;
      case 'popular':
        return <Zap className="w-3 h-3" />;
      case 'ending-soon':
        return <AlertTriangle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getDiscountTierColor = () => {
    switch (product.discountTier) {
      case 'hot':
        return 'bg-red-500 text-white';
      case 'popular':
        return 'bg-orange-500 text-white';
      case 'ending-soon':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getDiscountTierText = () => {
    switch (product.discountTier) {
      case 'hot':
        return 'Hot Deal';
      case 'popular':
        return 'Popular';
      case 'ending-soon':
        return 'Ending Soon';
      default:
        return 'On Sale';
    }
  };

  const calculateSavings = () => {
    return product.originalPrice - product.price;
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    onAddToWishlist(product);
  };

  // ... rest of the component remains the same (just using Flame instead of Fire)
  // Compact View
  if (viewMode === 'compact') {
    return (
      <Link href={`/products/${product.id}`} className="block">
        <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-300 group cursor-pointer">
          <div className="flex items-center p-3">
            {/* Product Image */}
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 mr-4">
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-gray-600 text-xs">Image</span>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-medium text-gray-900 text-sm group-hover:text-blue-600 transition-colors truncate">
                  {product.name}
                </h3>
                <button
                  onClick={handleWishlist}
                  className={`ml-2 p-1 rounded transition-colors flex-shrink-0 ${
                    isWishlisted
                      ? 'text-red-500 bg-red-50'
                      : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                  }`}
                >
                  <Heart className={`w-3 h-3 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg font-bold text-gray-900">${product.price}</span>
                <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                <span className="text-xs font-medium bg-red-100 text-red-700 px-1 rounded">
                  -{product.discount}%
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="flex">{renderStars(product.rating)}</div>
                <span>({product.reviewCount})</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // List View
  if (viewMode === 'list') {
    return (
      <Link href={`/products/${product.id}`} className="block">
        <div className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 group cursor-pointer">
          <div className="flex flex-col md:flex-row">
            {/* Product Image */}
            <div className="md:w-64 md:h-64 w-full h-48 relative flex-shrink-0">
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-gray-600 text-sm">Product Image</span>
              </div>
              
              {/* Discount Badge */}
              <div className="absolute top-3 left-3">
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  -{product.discount}%
                </div>
              </div>

              {/* Discount Tier Badge */}
              <div className="absolute top-3 right-3">
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getDiscountTierColor()}`}>
                  {getDiscountTierIcon()}
                  {getDiscountTierText()}
                </div>
              </div>

              {/* Stock Status */}
              <div className="absolute bottom-3 left-3">
                {product.stock > 0 ? (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                    {product.stock} left
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Countdown Timer */}
              {countdownTimer && (
                <div className="absolute bottom-3 right-3">
                  <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                    countdownTimer.isEndingSoon 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    <Clock className="w-3 h-3" />
                    <span>{countdownTimer.hours}h {countdownTimer.minutes}m</span>
                  </div>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex-1 p-6">
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                        {product.name}
                      </h3>
                    </div>
                    <button
                      onClick={handleWishlist}
                      className={`p-2 rounded-lg transition-colors ${
                        isWishlisted
                          ? 'text-red-500 bg-red-50'
                          : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex">{renderStars(product.rating)}</div>
                      <span className="text-sm text-gray-600">({product.reviewCount})</span>
                    </div>
                    <span className="text-sm text-gray-500">{product.category}</span>
                  </div>

                  {/* Savings Info */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-700">Save ${calculateSavings()}</div>
                      <div className="text-sm text-green-600">You Save</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-700">{product.unitsSold.toLocaleString()}</div>
                      <div className="text-sm text-blue-600">Sold</div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                      <span className="text-lg text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    </div>
                    <div className="text-sm text-red-600 font-medium">
                      Save {product.discount}%
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleQuickView}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleAddToCart}
                      disabled={product.stock === 0}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        product.stock === 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Grid View (default)
  return (
    <Link href={`/products/${product.id}`} className="block">
      <div className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 group cursor-pointer h-full flex flex-col">
        {/* Product Image */}
        <div className="relative aspect-square">
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <span className="text-gray-600 text-sm">Product Image</span>
          </div>
          
          {/* Discount Badge */}
          <div className="absolute top-3 left-3">
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              -{product.discount}%
            </div>
          </div>

          {/* Discount Tier Badge */}
          <div className="absolute top-3 right-3">
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getDiscountTierColor()}`}>
              {getDiscountTierIcon()}
              {getDiscountTierText()}
            </div>
          </div>

          {/* Stock Status */}
          <div className="absolute bottom-3 left-3">
            {product.stock > 0 ? (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                {product.stock} left
              </span>
            ) : (
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                Out of Stock
              </span>
            )}
          </div>

          {/* Countdown Timer */}
          {countdownTimer && (
            <div className="absolute bottom-3 right-3">
              <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                countdownTimer.isEndingSoon 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                <Clock className="w-3 h-3" />
                <span>{countdownTimer.hours}h {countdownTimer.minutes}m</span>
              </div>
            </div>
          )}

          {/* Hover Actions */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
            <button
              onClick={handleAddToCart}
              className="bg-white rounded-full p-3 shadow-lg hover:bg-red-500 hover:text-white transition-colors duration-200"
              disabled={product.stock === 0}
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
            <button
              onClick={handleQuickView}
              className="bg-white rounded-full p-3 shadow-lg hover:bg-blue-500 hover:text-white transition-colors duration-200"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={handleWishlist}
              className={`rounded-full p-3 shadow-lg transition-colors duration-200 ${
                isWishlisted
                  ? 'bg-red-500 text-white'
                  : 'bg-white hover:bg-red-500 hover:text-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
            
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">{renderStars(product.rating)}</div>
              <span className="text-sm text-gray-600">({product.reviewCount})</span>
            </div>

            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

            {/* Savings Info */}
            <div className="flex items-center justify-between text-sm mb-3 p-2 bg-gray-50 rounded">
              <span className="text-green-600 font-medium">
                Save ${calculateSavings()}
              </span>
              <span className="text-blue-600">
                {product.unitsSold.toLocaleString()} sold
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900">${product.price}</span>
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              </div>
              <div className="text-xs text-red-600 font-medium">
                Save {product.discount}%
              </div>
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                product.stock === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SaleProductCard;