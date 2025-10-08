"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiUrl, adminToken, getImageUrl } from "../../../common/http";
import AdminLayout from "../../AdminLayout";
import { Product, Brand, Category } from "./Product";


//  Safe placeholder image component
const SafeImage = ({ 
  src, 
  alt, 
  className,
  fallbackText = "Image"
}: { 
  src: string; 
  alt: string; 
  className?: string;
  fallbackText?: string;
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
    setImgSrc(`data:image/svg+xml;base64,${btoa(`
      <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" 
              text-anchor="middle" dy=".3em" fill="#9ca3af">${fallbackText}</text>
      </svg>
    `)}`);
  };

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
};

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // ✅ FIXED: Set client-side flag to avoid hydration mismatches
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 📌 Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = adminToken();
        if (!token) {
          throw new Error('Authentication required');
        }
        
        const res = await fetch(`${apiUrl}/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error('Product not found');
          }
          throw new Error('Failed to fetch product');
        }
        
        const data = await res.json();
        setProduct(data.data);
        
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (productId && isClient) {
      fetchProduct();
    }
  }, [productId, isClient]);

  // 📌 Handle delete product
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) return;

    try {
      const token = adminToken();
      if (!token) {
        alert('Authentication required');
        return;
      }

      const res = await fetch(`${apiUrl}/products/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        alert("✅ Product deleted successfully!");
        router.push('/admin/products');
      } else {
        const err = await res.json();
        alert("❌ Error deleting product: " + err.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("❌ Error deleting product!");
    }
  };

  // ✅ FIXED: Safe date formatting that works on both server and client
  const formatDate = (dateString: string) => {
    // Use a consistent locale and format to avoid hydration mismatches
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC' // Use UTC to avoid timezone differences
    });
  };

  // ✅ FIXED: Safe currency formatting
  const formatCurrency = (amount: number) => {
    // Use consistent formatting
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Show loading state
  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading product details...</p>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // Show error state
  if (error || !product) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
              <p className="text-gray-600 mb-6">{error || "The product you're looking for doesn't exist."}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => router.push('/admin/products')}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Back to Products
                </button>
                <button
                  onClick={() => router.push('/admin/products/add')}
                  className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Add New Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const primaryImage = product.images.find(img => img.is_primary) || product.images[0];
  const secondaryImages = product.images.filter(img => img !== primaryImage);

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <button
                  onClick={() => router.push('/admin/products')}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <span>←</span>
                  <span>Back to Products</span>
                </button>
                <span className="text-gray-400 hidden sm:inline">|</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  product.status === "active" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}>
                  {product.status.toUpperCase()}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 break-words">{product.name}</h1>
              <p className="text-gray-600 mt-1">SKU: {product.sku}</p>
            </div>
            
            <div className="flex gap-3 mt-4 lg:mt-0 flex-wrap">
              <button
                onClick={() => router.push(`/admin/products/edit/${product.id}`)}
                className="bg-yellow-500 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2 flex-1 sm:flex-none justify-center"
              >
                <span>✏️</span>
                <span className="hidden sm:inline">Edit</span>
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2 flex-1 sm:flex-none justify-center"
              >
                <span>🗑</span>
                <span className="hidden sm:inline">Delete</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Column - Images */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Images</h3>
                
                {product.images.length > 0 ? (
                  <div className="space-y-4">
                    {/* Primary Image */}
                    <div className="relative">
                      <div className="aspect-square w-full rounded-lg border-2 border-blue-500 overflow-hidden bg-gray-100">
                        <SafeImage
                          src={getImageUrl(primaryImage.image_url)}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          fallbackText="Product Image"
                        />
                      </div>
                      {primaryImage.is_primary && (
                        <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">
                          Primary
                        </span>
                      )}
                    </div>

                    {/* Thumbnail Images */}
                    {secondaryImages.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Additional Images</h4>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
                          {secondaryImages.map((image, index) => (
                            <div
                              key={image.id}
                              className="aspect-square rounded-lg border border-gray-300 overflow-hidden bg-gray-100 cursor-pointer hover:border-blue-500 transition-colors"
                              onClick={() => setActiveImageIndex(index + 1)}
                            >
                              <SafeImage
                                src={getImageUrl(image.image_url)}
                                alt={`${product.name} ${index + 2}`}
                                className="w-full h-full object-cover"
                                fallbackText="Image"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="aspect-square w-full rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl text-gray-400 mb-2">🖼️</div>
                      <p className="text-gray-500">No images available</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Product Details */}
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <p className="text-gray-900 font-medium">{product.category?.name || "No category"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                    <p className="text-gray-900 font-medium">{product.brand?.name || "No brand"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Base Price</label>
                    <p className="text-xl sm:text-2xl font-bold text-blue-600">{formatCurrency(product.base_price)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                    <p className={`text-lg font-semibold ${
                      product.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {product.stock_quantity} units
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                    <p className="text-gray-900">{product.weight ? `${product.weight} kg` : "Not specified"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Seasonal Product</label>
                    <p className="text-gray-900">{product.is_seasonal ? "Yes" : "No"}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{product.description}</p>
                </div>
              )}

              {/* Seasonal Information */}
              {product.is_seasonal && (product.seasonal_start_date || product.seasonal_end_date) && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Seasonal Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.seasonal_start_date && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                        <p className="text-gray-900">{formatDate(product.seasonal_start_date)}</p>
                      </div>
                    )}
                    {product.seasonal_end_date && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                        <p className="text-gray-900">{formatDate(product.seasonal_end_date)}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Metadata */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Metadata</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Created</label>
                    <p className="text-gray-600">{formatDate(product.created_at)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Updated</label>
                    <p className="text-gray-600">{formatDate(product.updated_at)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Images</label>
                    <p className="text-gray-600">{product.images.length} images</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product ID</label>
                    <p className="text-gray-600 font-mono">{product.id}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}