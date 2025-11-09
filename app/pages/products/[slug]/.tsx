import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Product, Review, RecommendedProduct } from '../../types/product';
import { mockProduct, mockReviews, mockRecommendedProducts } from '../../data/mockProduct';
import ProductImageGallery from '../../components/ProductImageGallery';
import ProductInfo from '../../components/ProductInfo';
import ProductReviews from '../../components/ProductReviews';
import RecommendedProducts from '../../components/RecommendedProducts';
import { Star, Truck, Shield, RotateCcw, Check, Heart, Share2 } from 'lucide-react';

const ProductDetailsPage: NextPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews' | 'shipping'>('description');
  const [product] = useState<Product>(mockProduct);
  const [reviews] = useState<Review[]>(mockReviews);

  // Calculate rating distribution
  const ratingDistribution = reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const handleAddToCart = (product: Product, selectedVariants: Record<string, string>, quantity: number) => {
    console.log('Adding to cart:', {
      product: product.name,
      variants: selectedVariants,
      quantity,
      price: product.price
    });
    // Implement cart logic
  };

  const tabs = [
    { id: 'description', label: 'Description', count: null },
    { id: 'specifications', label: 'Specifications', count: Object.keys(product.specifications).length },
    { id: 'reviews', label: 'Reviews', count: product.reviewCount },
    { id: 'shipping', label: 'Shipping & Returns', count: null }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <button onClick={() => router.push('/')} className="hover:text-gray-900 transition-colors">
              Home
            </button>
            <span>/</span>
            <button onClick={() => router.push('/categories')} className="hover:text-gray-900 transition-colors">
              {product.category}
            </button>
            <span>/</span>
            <button onClick={() => router.push(`/categories?subcategory=${product.subcategory}`)} className="hover:text-gray-900 transition-colors">
              {product.subcategory}
            </button>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            <ProductImageGallery
              images={product.images}
              productName={product.name}
            />
          </div>

          {/* Product Info */}
          <div>
            <ProductInfo
              product={product}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border mb-16">
          {/* Tab Headers */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`
                    flex items-center gap-2 px-6 py-4 border-b-2 font-medium transition-colors whitespace-nowrap
                    ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  {tab.label}
                  {tab.count !== null && (
                    <span className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${activeTab === tab.id
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-600'
                      }
                    `}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'description' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Product Description</h3>
                <div className="prose prose-lg max-w-none text-gray-700">
                  {product.fullDescription.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                {/* Features List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-700">{key}</span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <ProductReviews
                reviews={reviews}
                averageRating={product.rating}
                totalReviews={product.reviewCount}
                ratingDistribution={ratingDistribution}
              />
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-gray-900">Shipping Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Truck className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="font-medium text-gray-900">Free Shipping</div>
                          <div className="text-gray-600">
                            On orders over ${product.shipping.minFreeShippingAmount}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="font-medium text-gray-900">Estimated Delivery</div>
                          <div className="text-gray-600">{product.shipping.estimatedDelivery}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-gray-900">Return Policy</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <RotateCcw className="w-5 h-5 text-orange-600" />
                        <div>
                          <div className="font-medium text-gray-900">Easy Returns</div>
                          <div className="text-gray-600">{product.shipping.returnPolicy}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-purple-600" />
                        <div>
                          <div className="font-medium text-gray-900">Warranty</div>
                          <div className="text-gray-600">{product.warranty}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recommended Products */}
        <RecommendedProducts products={mockRecommendedProducts} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;