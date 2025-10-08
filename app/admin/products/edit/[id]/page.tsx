"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiUrl, adminToken } from "../../../../common/http";
import AdminLayout from "../../../AdminLayout";

interface Category {
  id: number;
  name: string;
}

interface Brand {
  id: number;
  name: string;
}

interface ProductImage {
  id: number;
  image_url: string;
  is_primary: boolean;
}

interface Product {
  id: number;
  category_id: string;
  brand_id: string;
  name: string;
  sku: string;
  description: string;
  base_price: number;
  stock_quantity: number;
  weight: number;
  is_seasonal: boolean;
  seasonal_start_date: string;
  seasonal_end_date: string;
  status: "active" | "inactive";
  images: ProductImage[];
}

interface ProductForm {
  category_id: string;
  brand_id: string;
  name: string;
  sku: string;
  description: string;
  base_price: number;
  stock_quantity: number;
  weight: number;
  is_seasonal: boolean;
  seasonal_start_date: string;
  seasonal_end_date: string;
  status: "active" | "inactive";
}

interface ImagePreview {
  file?: File;
  preview: string;
  id: string;
  isExisting?: boolean;
  existingId?: number;
}

export default function EditProduct() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const [form, setForm] = useState<ProductForm>({
    category_id: "",
    brand_id: "",
    name: "",
    sku: "",
    description: "",
    base_price: 0,
    stock_quantity: 0,
    weight: 0,
    is_seasonal: false,
    seasonal_start_date: "",
    seasonal_end_date: "",
    status: "active",
  });

  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);

  // ✅ UPDATED: Use the same image URL function as page2.tsx
  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) return '';
    
    console.log("Original image URL:", imageUrl); // Debug log
    
    // If it's already an absolute URL, return as is
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    // If it starts with /storage/, it's a Laravel storage path
    // We need to convert it to the actual public URL
    if (imageUrl.startsWith('/storage/')) {
      // Remove '/storage/' and prepend with the Laravel server URL
      const laravelBaseUrl = process.env.NEXT_PUBLIC_LARAVEL_URL || 'http://localhost:8000';
      const cleanPath = imageUrl.replace('/storage/', '');
      return `${laravelBaseUrl}/storage/${cleanPath}`;
    }
    
    // If it's any other relative path, prepend the Laravel base URL
    const laravelBaseUrl = process.env.NEXT_PUBLIC_LARAVEL_URL || 'http://localhost:8000';
    return `${laravelBaseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
  };

  // 📌 Fetch product data, categories & brands
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch product data
        const productRes = await fetch(`${apiUrl}/products/${productId}`, {
          headers: { Authorization: `Bearer ${adminToken()}` },
        });
        
        if (!productRes.ok) {
          throw new Error('Product not found');
        }
        
        const productData = await productRes.json();
        const product: Product = productData.data;

        // Set form data
        setForm({
          category_id: product.category_id.toString(),
          brand_id: product.brand_id.toString(),
          name: product.name,
          sku: product.sku,
          description: product.description || "",
          base_price: product.base_price,
          stock_quantity: product.stock_quantity,
          weight: product.weight || 0,
          is_seasonal: product.is_seasonal,
          seasonal_start_date: product.seasonal_start_date || "",
          seasonal_end_date: product.seasonal_end_date || "",
          status: product.status,
        });

        // ✅ UPDATED: Use the same image URL conversion as page2.tsx
        const existingImagePreviews: ImagePreview[] = product.images.map(img => ({
          preview: getImageUrl(img.image_url), // Use getImageUrl function instead of direct API URL
          id: `existing-${img.id}`,
          isExisting: true,
          existingId: img.id
        }));
        setImagePreviews(existingImagePreviews);

        // Debug: Log image URLs to verify
        console.log("🖼️ Existing images converted:", existingImagePreviews.map(img => ({
          original: product.images.find(i => i.id === img.existingId)?.image_url,
          converted: img.preview
        })));

        // Fetch categories
        const catRes = await fetch(`${apiUrl}/categories`, {
          headers: { Authorization: `Bearer ${adminToken()}` },
        });
        const catData = await catRes.json();
        setCategories(catData.data || catData);

        // Fetch brands
        const brandRes = await fetch(`${apiUrl}/brands`, {
          headers: { Authorization: `Bearer ${adminToken()}` },
        });
        const brandData = await brandRes.json();
        setBrands(brandData.data || brandData);

      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error loading product data");
        router.push('/admin/products');
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchData();
    }
  }, [productId, router]);

  // 📌 Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      imagePreviews.forEach((image) => {
        if (!image.isExisting) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, [imagePreviews]);

  // 📌 Handle input change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const key = name as keyof ProductForm;

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setForm({ ...form, [key]: target.checked });
    } else if (type === "number") {
      setForm({ ...form, [key]: value === "" ? 0 : Number(value) });
    } else {
      setForm({ ...form, [key]: value });
    }
  };

  // 📌 Handle new image uploads with preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const newPreviews: ImagePreview[] = newFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file),
        id: Math.random().toString(36).substr(2, 9)
      }));
      
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
    e.target.value = '';
  };

  // 📌 Remove image from preview
  const removeImage = (id: string) => {
    setImagePreviews(prev => {
      const imageToRemove = prev.find(img => img.id === id);
      
      // If it's an existing image, add to delete list
      if (imageToRemove?.isExisting && imageToRemove.existingId) {
        setImagesToDelete(prev => [...prev, imageToRemove.existingId!]);
      }
      
      // Clean up object URL if it's a new image
      if (imageToRemove && !imageToRemove.isExisting) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      
      return prev.filter(img => img.id !== id);
    });
  };

  // 📌 Move image up in the list
  const moveImageUp = (index: number) => {
    if (index === 0) return;
    setImagePreviews(prev => {
      const newPreviews = [...prev];
      [newPreviews[index - 1], newPreviews[index]] = [newPreviews[index], newPreviews[index - 1]];
      return newPreviews;
    });
  };

  // 📌 Move image down in the list
  const moveImageDown = (index: number) => {
    if (index === imagePreviews.length - 1) return;
    setImagePreviews(prev => {
      const newPreviews = [...prev];
      [newPreviews[index], newPreviews[index + 1]] = [newPreviews[index + 1], newPreviews[index]];
      return newPreviews;
    });
  };

  // 📌 Set image as primary (first in list)
  const setAsPrimary = (index: number) => {
    if (index === 0) return;
    setImagePreviews(prev => {
      const newPreviews = [...prev];
      const [movedImage] = newPreviews.splice(index, 1);
      newPreviews.unshift(movedImage);
      return newPreviews;
    });
  };

  // 📌 Submit product update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Create FormData object
      const formData = new FormData();
      
      // Append all product data with proper data types
      formData.append('_method', 'PUT'); // For Laravel to recognize as PUT request
      formData.append('category_id', form.category_id);
      formData.append('brand_id', form.brand_id);
      formData.append('name', form.name);
      formData.append('sku', form.sku);
      formData.append('description', form.description);
      formData.append('base_price', form.base_price.toString());
      formData.append('stock_quantity', form.stock_quantity.toString());
      formData.append('weight', form.weight.toString());
      formData.append('is_seasonal', form.is_seasonal ? '1' : '0');
      formData.append('status', form.status);
      
      if (form.is_seasonal) {
        if (form.seasonal_start_date) {
          formData.append('seasonal_start_date', form.seasonal_start_date);
        }
        if (form.seasonal_end_date) {
          formData.append('seasonal_end_date', form.seasonal_end_date);
        }
      }
      
      // Append new images only (not existing ones)
      const newImages = imagePreviews.filter(img => !img.isExisting);
      newImages.forEach((imagePreview) => {
        if (imagePreview.file) {
          formData.append('images[]', imagePreview.file);
        }
      });

      // Append images to delete
      imagesToDelete.forEach(id => {
        formData.append('images_to_delete[]', id.toString());
      });

      console.log("Updating product with:", {
        formData: Object.fromEntries(formData.entries()),
        imagesToDelete
      });

      // Update product
      const res = await fetch(`${apiUrl}/products/${productId}`, {
        method: "POST", // Using POST with _method=PUT for Laravel
        headers: {
          "Authorization": `Bearer ${adminToken()}`,
        },
        body: formData,
      });

      const responseData = await res.json();
      
      if (!res.ok) {
        console.error("Backend error:", responseData);
        alert("Error: " + JSON.stringify(responseData.errors || responseData.message));
        return;
      }

      console.log("Success response:", responseData);
      alert("✅ Product updated successfully!");
      
      // Redirect to products list
      router.push('/admin/products');
      
    } catch (err) {
      console.error("Error updating product:", err);
      alert("❌ Error updating product");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-4 max-w-4xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Loading product data...</div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout> 
      <div className="p-4 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Edit Product</h1>
          <button
            onClick={() => router.push('/admin/products')}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Back to Products
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left Column - Product Details */}
          <div className="space-y-4">
            {/* Category Dropdown */}
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                name="category_id"
                value={form.category_id}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand Dropdown */}
            <div>
              <label className="block text-sm font-medium mb-1">Brand</label>
              <select
                name="brand_id"
                value={form.brand_id}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">-- Select Brand --</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <input 
                name="name" 
                placeholder="Enter product name" 
                value={form.name} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                required 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">SKU</label>
              <input 
                name="sku" 
                placeholder="Enter SKU" 
                value={form.sku} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                required 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea 
                name="description" 
                placeholder="Enter product description" 
                value={form.description} 
                onChange={handleChange} 
                rows={3}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Base Price ($)</label>
                <input 
                  type="number" 
                  name="base_price" 
                  placeholder="0.00" 
                  value={form.base_price} 
                  onChange={handleChange} 
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  step="0.01"
                  min="0"
                  required 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Stock Quantity</label>
                <input 
                  type="number" 
                  name="stock_quantity" 
                  placeholder="0" 
                  value={form.stock_quantity} 
                  onChange={handleChange} 
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  min="0"
                  required 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Weight (kg)</label>
              <input 
                type="number" 
                name="weight" 
                placeholder="0.00" 
                value={form.weight} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                step="0.01" 
                min="0"
              />
            </div>

            <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg">
              <input
                type="checkbox"
                name="is_seasonal"
                checked={form.is_seasonal}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label className="text-sm font-medium">Seasonal Product?</label>
            </div>

            {form.is_seasonal && (
              <div className="grid grid-cols-2 gap-4 p-3 border border-gray-300 rounded-lg bg-gray-50">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <input
                    type="date"
                    name="seasonal_start_date"
                    value={form.seasonal_start_date}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <input
                    type="date"
                    name="seasonal_end_date"
                    value={form.seasonal_end_date}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Right Column - Image Upload & Preview */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Product Images</label>
              <input 
                type="file" 
                multiple 
                onChange={handleImageChange} 
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
                accept="image/jpg,image/jpeg,image/png,image/webp"
              />
              <p className="text-xs text-gray-500 mt-1">
                Add new images. First image will be set as primary. Existing images can be reordered or removed.
              </p>
            </div>
            
            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="border border-gray-300 rounded-lg p-4">
                <h3 className="text-sm font-medium mb-3">
                  Image Previews ({imagePreviews.length})
                  <span className="text-xs text-green-600 ml-2">
                    • First image is primary
                  </span>
                </h3>
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {imagePreviews.map((image, index) => (
                    <div 
                      key={image.id} 
                      className={`flex items-center gap-3 p-3 border rounded-lg ${
                        index === 0 ? 'border-green-500 bg-green-50' : 'border-gray-200'
                      } ${image.isExisting ? 'bg-blue-50 border-blue-200' : ''}`}
                    >
                      {/* Image */}
                      <div className="flex-shrink-0 w-16 h-16 border rounded overflow-hidden">
                        <img 
                          src={image.preview} 
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // ✅ ADDED: Error handling for images like in page2.tsx
                            console.error("Image failed to load:", e.currentTarget.src);
                            e.currentTarget.src = `https://via.placeholder.com/64x64?text=No+Image`;
                            e.currentTarget.alt = 'Image not found';
                            e.currentTarget.className = 'w-full h-full object-cover bg-gray-200';
                          }}
                          onLoad={(e) => {
                            console.log("✅ Image loaded successfully:", e.currentTarget.src);
                          }}
                        />
                      </div>
                      
                      {/* Image Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {image.isExisting ? 'Existing Image' : image.file?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {image.isExisting ? 'Server stored' : `${(image.file?.size || 0 / 1024).toFixed(1)} KB`}
                        </p>
                        <div className="flex gap-2 mt-1">
                          {index === 0 && (
                            <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                              Primary
                            </span>
                          )}
                          {image.isExisting && (
                            <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                              Existing
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex flex-col gap-1">
                        {index !== 0 && (
                          <button
                            type="button"
                            onClick={() => setAsPrimary(index)}
                            className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                            title="Set as primary"
                          >
                            ⭐
                          </button>
                        )}
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => moveImageUp(index)}
                            disabled={index === 0}
                            className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Move up"
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            onClick={() => moveImageDown(index)}
                            disabled={index === imagePreviews.length - 1}
                            className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Move down"
                          >
                            ↓
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(image.id)}
                          className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                          title="Remove image"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isSubmitting ? 'Updating Product...' : 'Update Product'}
            </button>

            {/* Images to delete info */}
            {imagesToDelete.length > 0 && (
              <div className="text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
                <strong>Note:</strong> {imagesToDelete.length} image(s) will be deleted on save.
              </div>
            )}
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}