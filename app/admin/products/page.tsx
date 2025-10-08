"use client";

import { useEffect, useState } from "react";
import { apiUrl, adminToken, localBaseUrl } from "../../common/http";
import AdminLayout from "../AdminLayout";
import { Product } from "./product";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http')) return imageUrl;
    if (imageUrl.startsWith('/storage/')) return `${localBaseUrl}${imageUrl}`;
    return `${localBaseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${apiUrl}/products`, {
        headers: { Authorization: `Bearer ${adminToken()}` },
      });
      const data = await res.json();
      setProducts(data.data || data);        
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };
  // Handle delete product
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`${apiUrl}/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${adminToken()}` },
      });

      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
        alert("✅ Product deleted successfully!");
      } else {
        const err = await res.json();
        alert("❌ Error deleting product: " + err.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product!");
    }
  };

  // Filter products by search text
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

    // Fetch all products
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold mb-3 md:mb-0">Product List</h1>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-64 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <a
              href="/admin/products/create"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              + Add Product
            </a>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 border-b">Image</th>
                  <th className="p-3 border-b">Name</th>
                  <th className="p-3 border-b">Category</th>
                  <th className="p-3 border-b">Brand</th>
                  <th className="p-3 border-b">Price</th>
                  <th className="p-3 border-b">Stock</th>
                  <th className="p-3 border-b">Status</th>
                  <th className="p-3 border-b text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3 border-b">
                      {product.images && product.images.length > 0 ? (
                        <div className="flex items-center justify-center">
                          <img
                            src={getImageUrl(product.images[0].image_url)}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded border"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center border">
                          <span className="text-gray-400 text-xs text-center">No image</span>
                        </div>
                      )}
                    </td>
                    <td className="p-3 border-b font-medium">{product.name}</td>
                    <td className="p-3 border-b">
                      {product.category?.name || "-"}
                    </td>
                    <td className="p-3 border-b">
                      {product.brand?.name || "-"}
                    </td>
                    <td className="p-3 border-b">${product.base_price}</td>
                    <td className="p-3 border-b">{product.stock_quantity}</td>
                    <td className="p-3 border-b">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          product.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="p-3 border-b text-right">
                      <div className="flex justify-end gap-2">
                        <a
                          href={`/admin/products/${product.id}`}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                          title="View"
                        >
                          👁
                        </a>
                        <a
                          href={`/admin/products/edit/${product.id}`}
                          className="text-yellow-600 hover:text-yellow-800 p-1 rounded hover:bg-yellow-50"
                          title="Edit"
                        >
                          ✏️
                        </a>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                          title="Delete"
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}