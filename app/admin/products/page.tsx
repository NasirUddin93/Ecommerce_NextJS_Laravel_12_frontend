"use client";

import { useEffect, useState } from "react";
import { apiUrl, adminToken } from "../../common/http";
import AdminLayout from "../AdminLayout";
import Image from "next/image";

// TypeScript interface for product
export interface Product {
  id: number;
  category_id: number;
  brand_id: number;
  name: string;
  sku: string;
  description?: string;
  base_price: number;
  stock_quantity: number;
  weight?: number;
  is_seasonal: boolean;
  seasonal_start_date?: string | null; // ISO date string or null
  seasonal_end_date?: string | null;   // ISO date string or null
  status: "active" | "inactive";
  created_at: string;  // timestamp
  updated_at: string;  // timestamp
  deleted_at?: string | null; // for soft delete
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    try {
      setLoader(true);
      const res = await fetch(`${apiUrl}/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      });

      const result = await res.json();
      setLoader(false);

      if (result.status === 200 && Array.isArray(result.data)) {
        // console.log(result.data);
        setProducts(result.data);
      } else {
        // console.log("result:", result);
        console.error("Unexpected response:", result);
      }
    } catch (error) {
      setLoader(false);
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search text
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-4">Products</h1>

      {/* Search Input */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loader ? (
        <div className="text-center py-6 text-gray-500">Loading...</div>
      ) : filteredProducts.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                    <td><Image src={product.product_image} alt={product.name} width={40} height={40} /></td>
                  <td className="px-6 py-3">{product.sku}</td>
                  <td className="px-6 py-3 font-medium">{product.name}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        product.status === "active"? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.status === "active" ? "Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-6 py-3 flex justify-center gap-3">
                    {/* View */}
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      title="View"
                    >
                      👁
                    </button>
                    {/* Edit */}
                    <button
                      className="text-yellow-600 hover:text-yellow-800"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    {/* Delete */}
                    <button
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          No categories found
        </div>
      )}
    </AdminLayout>
  );
}
