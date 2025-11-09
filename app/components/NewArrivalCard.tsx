import React from 'react';
import { NewArrivalProduct } from '../types/new-arrivals';
import { Star, Heart, ShoppingCart, Eye, Clock, Zap, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface NewArrivalCardProps {
  product: NewArrivalProduct;
  viewMode: 'grid' | 'list' | 'masonry';
  onAddToCart: (product: NewArrivalProduct) => void;
  onQuickView: (product: NewArrivalProduct) => void;
  onAddToWishlist: (product: NewArrivalProduct) => void;
}

const NewArrivalCard: React.FC<NewArrivalCardProps> = ({
  product,
  viewMode,
  onAddToCart,
  onQuickView,
  onAddToWishlist
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

  const getDaysSinceArrival = () => {
    const arrival = new Date(product.arrivalDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - arrival.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysSinceArrival = getDaysSinceArrival();
  const isVeryNew = daysSinceArrival <= 3;
  const isNew = daysSinceArrival <= 7;

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
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1">
                {product.isNew && (
                  <div className={`flex items-center gap-1 text-white px-2 py-1 rounded-full text-xs font-medium ${
                    isVeryNew ? 'bg-red-500' : isNew ? 'bg-orange-500' : 'bg-blue-500'
                  }`}>
                    <Clock className="w-3 h-3" />
                    {isVeryNew ? 'Just Added' : isNew ? 'New' : `${daysSinceArrival}d ago`}
                  </div>
                )}
                {product.isBestseller && (
                  <div className="flex items-center gap-1 bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    <TrendingUp className="w-3 h-3" />
                    Bestseller
                  </div>
                )}
                {product.featured && (
                  <div className="flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    <Zap className="w-3 h-3" />
                    Featured
                  </div>
                )}
              </div>

              {/* Stock Status */}
              <div className="absolute top-3 right-3">
                {product.stock > 0 ? (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                    In Stock
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Discount Badge */}
              {product.discount && (
                <div className="absolute bottom-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                  -{product.discount}%
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
                    {product.tags.length > 3 && (
                      <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs">
                        +{product.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
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
                          : 'bg-blue-600 text-white hover:bg-blue-700'
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

  // Grid/Masonry View
  return (
    <Link href={`/products/${product.id}`} className="block">
      <div className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 group cursor-pointer h-full flex flex-col">
        {/* Product Image */}
        <div className="relative aspect-square">
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <span className="text-gray-600 text-sm">Product Image</span>
          </div>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.isNew && (
              <div className={`flex items-center gap-1 text-white px-2 py-1 rounded-full text-xs font-medium ${
                isVeryNew ? 'bg-red-500' : isNew ? 'bg-orange-500' : 'bg-blue-500'
              }`}>
                <Clock className="w-3 h-3" />
                {isVeryNew ? 'Just Added' : isNew ? 'New' : `${daysSinceArrival}d ago`}
              </div>
            )}
            {product.isBestseller && (
              <div className="flex items-center gap-1 bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                <TrendingUp className="w-3 h-3" />
                Bestseller
              </div>
            )}
            {product.featured && (
              <div className="flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                <Zap className="w-3 h-3" />
                Featured
              </div>
            )}
          </div>

          {/* Stock Status */}
          <div className="absolute top-3 right-3">
            {product.stock > 0 ? (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                In Stock
              </span>
            ) : (
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                Out of Stock
              </span>
            )}
          </div>

          {/* Discount Badge */}
          {product.discount && (
            <div className="absolute bottom-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
              -{product.discount}%
            </div>
          )}

          {/* Hover Actions */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
            <button
              onClick={handleAddToCart}
              className="bg-white rounded-full p-3 shadow-lg hover:bg-blue-500 hover:text-white transition-colors duration-200"
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

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {product.tags.slice(0, 2).map(tag => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
              {product.tags.length > 2 && (
                <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs">
                  +{product.tags.length - 2}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                product.stock === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
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

export default NewArrivalCard;