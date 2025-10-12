"use client";

import { useEffect, useState } from "react";
import { apiUrl, adminToken } from "../../common/http";
import AdminLayout from "../AdminLayout";

// TypeScript interface for category
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "customer";
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export default function ProductVariants() {

  const [productVariants, setProductVariants] = useState<User[]>([]);
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");

  const fetchSizes = async () => {
    try {
      setLoader(true);
      const res = await fetch(`${apiUrl}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      });

      const result = await res.json();
      console.log(result);
      setLoader(false);

      if (result.status === 200 && Array.isArray(result.data)) {
        setProductVariants(result.data);
      } else {
        console.error("Unexpected response:", result);
      }
    } catch (error) {
      setLoader(false);
      console.error("Error fetching sizes:", error);
    }
  };

  useEffect(() => {
    fetchSizes();
  }, []);

  // Filter categories based on search text
  const filteredProductVariants = productVariants.filter((productVariants) =>
    productVariants.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-4">Users</h1>

      {/* Search Input */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search sizes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loader ? (
        <div className="text-center py-6 text-gray-500">Loading...</div>
      ) : filteredProductVariants.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">User ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProductVariants.map((productVariant) => (
                <tr
                  key={productVariant.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-3">{productVariant.id}</td>
                  <td className="px-6 py-3">{productVariant.name}</td>
                  <td className="px-6 py-3">{productVariant.email}</td>
                  <td className="px-6 py-3">{productVariant.role}</td>
                  {/* <td className="px-6 py-3 font-medium">{productVariant.processed_at}</td> */}
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
          No user found
        </div>
      )}
    </AdminLayout>
  );
}