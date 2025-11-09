import React from 'react';
import { Product } from '../types/shop';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onQuickView }) => {
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

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="relative overflow-hidden">
        {/* Product Image */}
        <div className="aspect-square bg-gray-100 relative">
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <span className="text-gray-500 text-sm">Product Image</span>
          </div>
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                New
              </span>
            )}
            {product.isBestseller && (
              <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                Bestseller
              </span>
            )}
            {product.discount && (
              <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="absolute top-2 right-2">
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

          {/* Hover Actions */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
            <button
              onClick={() => onAddToCart(product)}
              className="bg-white rounded-full p-2 shadow-lg hover:bg-blue-500 hover:text-white transition-colors duration-200"
              disabled={product.stock === 0}
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
            <button
              onClick={() => onQuickView(product)}
              className="bg-white rounded-full p-2 shadow-lg hover:bg-blue-500 hover:text-white transition-colors duration-200"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button className="bg-white rounded-full p-2 shadow-lg hover:bg-red-500 hover:text-white transition-colors duration-200">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Brand */}
        <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
        
        {/* Product Name */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex">{renderStars(product.rating)}</div>
          <span className="text-sm text-gray-600">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold text-gray-900">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(product)}
          disabled={product.stock === 0}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
            product.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;