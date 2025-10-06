"use client";

import { useEffect, useState } from "react";
import { Product } from "./product";
import AdminLayout from "../AdminLayout";
import Image from "next/image";
import { apiUrl, adminToken } from "../../common/http";
import { useRouter } from "next/navigation";



export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter(); // ✅ Initialize router

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
        console.log(result.data);
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

    const deleteProduct = async (id: number) => {
        if (!confirm("Are you sure to delete?")) return;
        await fetch(`${apiUrl}/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${adminToken()}` },
        });
        fetchProducts();
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
        <button
          onClick={() => router.push("/admin/products/create")}
          className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Product
        </button>
      </div>

      {loader ? (
        <div className="text-center py-6 text-gray-500">Loading...</div>
      ) : filteredProducts.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Image</th>
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
                    <td>
                        {product.product_images[product.id] && (
                            <Image
                            src={product.product_images[product.id].image_url}
                            alt={product.name}
                            width={50}
                            height={50}
                            />
                        )}                    
                  </td>
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
                      onClick={() => alert("Edit page")}
                    >
                      ✏️
                    </button>
                    {/* Delete */}
                    <button
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                      onClick={() => deleteProduct(product.id)}
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



