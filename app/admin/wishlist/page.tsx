"use client";

import { useEffect, useState } from "react";
import { apiUrl, adminToken } from "../../common/http";
import AdminLayout from "../AdminLayout";
import Link from "next/link";

// TypeScript interface for Wishlist
interface Wishlist {
  id: number;
  user_id: number;
  product_id: number;
  created_at?: Date;
  deleted_at?: Date | null; // Handle soft delete
}

export default function WishlistPage() {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");

  const fetchWishlists = async () => {
    try {
      setLoader(true);
      const res = await fetch(`${apiUrl}/wishlists`, {
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
        setWishlists(result.data);
      } else {
        console.error("Unexpected response:", result);
      }
    } catch (error) {
      setLoader(false);
      console.error("Error fetching wishlists:", error);
    }
  };

  useEffect(() => {
    fetchWishlists();
  }, []);

  // Filter wishlists based on search text (using user_id or product_id)
  const filteredWishlists = wishlists.filter((wishlist) =>
    wishlist.product_id.toString().includes(search.toLowerCase()) ||
    wishlist.user_id.toString().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-4">Wishlist</h1>

      {/* Search Input */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by user ID or product ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <Link
              href="/admin/wishlist/create"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              + Add Wishlist
        </Link>

      {loader ? (
        <div className="text-center py-6 text-gray-500">Loading...</div>
      ) : filteredWishlists.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">User ID</th>
                <th className="px-6 py-3">Product ID</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWishlists.map((wishlist) => (
                <tr
                  key={wishlist.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-3">{wishlist.id}</td>
                  <td className="px-6 py-3">{wishlist.user_id}</td>
                  <td className="px-6 py-3">{wishlist.product_id}</td>

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
          No wishlists found
        </div>
      )}
    </AdminLayout>
  );
}
