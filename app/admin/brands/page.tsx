"use client";

import { useEffect, useState } from "react";
import { apiUrl, adminToken} from "../../common/http";
import Link from "next/link";
import AdminLayout from "../AdminLayout";


export default function BrandList() {

  interface Brand{
      id:number;
      name: string;
      status: number;
  }

  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchBrands = async () => {
    try {
      const res = await fetch(`${apiUrl}/brands`, {
        headers: { Authorization: `Bearer ${adminToken()}` },
      });
      const data = await res.json();
      setBrands(data.data || data);        
    } catch (err) {
      console.error("Error fetching brands:", err);
    } finally {
      setLoading(false);
    }
  };
  // Handle delete product
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this brand?")) return;

    try {
      const res = await fetch(`${apiUrl}/brands/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${adminToken()}` },
      });

      if (res.ok) {
        setBrands(brands.filter((p) => p.id !== id));
        alert("✅ Brands deleted successfully!");
      } else {
        const err = await res.json();
        alert("❌ Error deleting brand: " + err.message);
      }
    } catch (error) {
      console.error("Error deleting brands:", error);
      alert("Error deleting brand!");
    }
  };

  // Filter brands by search text
  const filteredBrands = brands.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

    // Fetch all brands
  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold mb-3 md:mb-0">Brand List</h1>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search Brands..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-64 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Link
              href="/admin/brands/create"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              + Add Brand
            </Link>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading brands...</p>
        ) : filteredBrands.length === 0 ? (
          <p className="text-center text-gray-500">No brands found.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 border-b">Id</th>
                  <th className="p-3 border-b">Name</th>
                  <th className="p-3 border-b">Status</th>
                  <th className="p-3 border-b text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBrands.map((brand) => (
                  <tr
                    key={brand.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3 border-b font-medium">{brand.id}</td>
                    <td className="p-3 border-b font-medium">{brand.name}</td>
                    <td className="p-3 border-b">
                      {
                        brand.status === 1 ? <span className="bg-green-100 px-2 py-2 rounded-lg text-gray-500 text-green-800">Active</span> : <span className="bg-green-100 px-2 py-2 rounded-lg text-red-500 text-green-800">Inactive</span>
                      }
                    </td>
                    <td className="p-3 border-b text-right">
                      <div className="flex justify-end gap-2">
                        <a
                          href={`/admin/brands/${brand.id}`}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                          title="View"
                        >
                          👁
                        </a>
                        <a
                          href={`/admin/brands/edit/${brand.id}`}
                          className="text-yellow-600 hover:text-yellow-800 p-1 rounded hover:bg-yellow-50"
                          title="Edit"
                        >
                          ✏️
                        </a>
                        <button
                          onClick={() => handleDelete(brand.id)}
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