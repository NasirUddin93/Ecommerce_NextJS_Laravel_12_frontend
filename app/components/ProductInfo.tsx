import React, { useState } from 'react';
import { Product, ProductVariant } from '../types/product';
import { Star, Truck, Shield, RotateCcw, Check, X, Heart, Share2 } from 'lucide-react';

interface ProductInfoProps {
  product: Product;
  onAddToCart: (product: Product, selectedVariants: Record<string, string>, quantity: number) => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, onAddToCart }) => {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Initialize selected variants
  React.useEffect(() => {
    const initialVariants: Record<string, string> = {};
    product.variants.forEach(variant => {
      const availableValue = variant.values.find(v => v.available);
      if (availableValue) {
        initialVariants[variant.id] = availableValue.id;
      }
    });
    setSelectedVariants(initialVariants);
  }, [product.variants]);

  const handleVariantSelect = (variantId: string, valueId: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantId]: valueId
    }));
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedVariants, quantity);
  };

  const handleBuyNow = () => {
    onAddToCart(product, selectedVariants, quantity);
    // Navigate to cart page
  };

  const getSelectedVariant = (variantId: string) => {
    return product.variants
      .find(v => v.id === variantId)
      ?.values.find(v => v.id === selectedVariants[variantId]);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const isAddToCartDisabled = product.stock === 0 || 
    product.variants.some(variant => 
      variant.required && !selectedVariants[variant.id]
    );

  return (
    <div className="space-y-6">
      {/* Brand & Category */}
      <div className="space-y-2">
        <p className="text-sm text-gray-500">{product.brand}</p>
        <p className="text-sm text-blue-600">{product.category} • {product.subcategory}</p>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 leading-tight">{product.name}</h1>

      {/* Rating & Reviews */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex">{renderStars(product.rating)}</div>
          <span className="text-sm font-medium text-gray-900">{product.rating}</span>
        </div>
        <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
        <span className="text-sm text-green-600 font-medium">✓ In Stock</span>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-gray-900">${product.price}</span>
          {product.originalPrice && (
            <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
          )}
          {product.discount && (
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
              Save {product.discount}%
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500">SKU: {product.sku}</p>
      </div>

      {/* Description */}
      <p className="text-gray-700 leading-relaxed">{product.description}</p>

      {/* Variants */}
      {product.variants.map(variant => (
        <div key={variant.id} className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="font-medium text-gray-900">{variant.name}</label>
            {variant.required && (
              <span className="text-sm text-gray-500">Required</span>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            {variant.values.map(value => {
              const isSelected = selectedVariants[variant.id] === value.id;
              const isAvailable = value.available && value.stock > 0;
              
              return (
                <button
                  key={value.id}
                  onClick={() => isAvailable && handleVariantSelect(variant.id, value.id)}
                  disabled={!isAvailable}
                  className={`
                    relative px-4 py-3 border-2 rounded-lg font-medium transition-all duration-200
                    ${isSelected
                      ? 'border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-200'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    }
                    ${!isAvailable
                      ? 'opacity-50 cursor-not-allowed grayscale'
                      : 'hover:shadow-md'
                    }
                  `}
                >
                  {variant.type === 'color' && (
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: value.value }}
                      />
                      <span>{value.label}</span>
                    </div>
                  )}
                  {variant.type !== 'color' && value.label}
                  
                  {/* Stock Indicator */}
                  {isAvailable && value.stock < 10 && (
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs px-1 rounded">
                      Low
                    </span>
                  )}
                  
                  {!isAvailable && (
                    <X className="absolute -top-1 -right-1 bg-red-500 text-white rounded w-4 h-4" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Quantity & Add to Cart */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              className="px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              -
            </button>
            <span className="px-4 py-3 font-medium min-w-12 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
              className="px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              +
            </button>
          </div>
          
          <div className="text-sm text-gray-500">
            {product.stock} items available
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleAddToCart}
            disabled={isAddToCartDisabled}
            className={`
              flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-200
              ${isAddToCartDisabled
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
              }
            `}
          >
            Add to Cart
          </button>
          
          <button
            onClick={handleBuyNow}
            disabled={isAddToCartDisabled}
            className={`
              flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-200
              ${isAddToCartDisabled
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-orange-600 text-white hover:bg-orange-700 hover:shadow-lg'
              }
            `}
          >
            Buy Now
          </button>
          
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`
              p-4 rounded-xl border-2 transition-all duration-200
              ${isWishlisted
                ? 'border-red-500 bg-red-50 text-red-600'
                : 'border-gray-300 text-gray-600 hover:border-gray-400'
              }
            `}
          >
            <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Truck className="w-5 h-5 text-green-600" />
          <div>
            <div className="font-medium text-gray-900">Free Shipping</div>
            <div>On orders over ${product.shipping.minFreeShippingAmount}</div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <RotateCcw className="w-5 h-5 text-blue-600" />
          <div>
            <div className="font-medium text-gray-900">Easy Returns</div>
            <div>{product.shipping.returnPolicy}</div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Shield className="w-5 h-5 text-purple-600" />
          <div>
            <div className="font-medium text-gray-900">Warranty</div>
            <div>{product.warranty}</div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Check className="w-5 h-5 text-green-600" />
          <div>
            <div className="font-medium text-gray-900">In Stock</div>
            <div>Estimated delivery: {product.shipping.estimatedDelivery}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;