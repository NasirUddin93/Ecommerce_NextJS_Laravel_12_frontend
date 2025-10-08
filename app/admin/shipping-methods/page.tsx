"use client";

import { useEffect, useMemo, useState } from "react";
import { apiUrl, adminToken } from "../../common/http";
import AdminLayout from "../AdminLayout";

interface ShippingMethods {
  id: number;
  name: string;
  description?: string | null;
  fee: number | string;               // Laravel may return string for decimals
  is_free_shipping: boolean | number; // Could be 0/1 or true/false depending on cast
  created_at?: string;
  updated_at?: string;
}

interface ApiListResponse<T> {
  status: number;
  data: T[];
  message?: string;
}

export default function ShippingsPage() {
  const [loader, setLoader] = useState(false);
  const [shippingMethods, setShippingMethods] = useState<ShippingMethods[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

  const fetchShippingMethods = async () => {
    try {
      setLoader(true);
      setError(null);

      const res = await fetch(`${apiUrl}/shipping-methods`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`, // remove if your route is public
        },
        cache: "no-store",
      });

      const result: ApiListResponse<ShippingMethods> = await res.json();
      setLoader(false);

      if (result?.status === 200 && Array.isArray(result?.data)) {
        setShippingMethods(result.data);
      } else {
        setError("Unexpected API response.");
        console.error("Unexpected response:", result);
      }
    } catch (e) {
      setLoader(false);
      setError("Failed to load shipping methods.");
      console.error("Error fetching shippings:", e);
    }
  };

  useEffect(() => {
    fetchShippingMethods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return shippingMethods;
    return shippingMethods.filter((s) => {
      const name = s.name?.toLowerCase() ?? "";
      const desc = (s.description ?? "").toString().toLowerCase();
      return name.includes(q) || desc.includes(q);
    });
  }, [search, shippingMethods]);

  const asBoolean = (v: boolean | number) => {
    if (typeof v === "boolean") return v;
    return Number(v) === 1;
  };

  const formatFee = (fee: number | string) => {
    const n = typeof fee === "string" ? Number(fee) : fee;
    if (Number.isNaN(n)) return String(fee);
    return n.toFixed(2);
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Shipping Methods</h1>
        <button
          onClick={fetchShippingMethods}
          className="px-3 py-2 rounded-lg border hover:bg-gray-50"
          title="Refresh"
        >
          ↻ Refresh
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or description…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* States */}
      {loader && (
        <div className="text-center py-6 text-gray-500">Loading…</div>
      )}

      {!loader && error && (
        <div className="text-center py-6 text-red-600">{error}</div>
      )}

      {!loader && !error && filtered.length === 0 && (
        <div className="text-center py-6 text-gray-500">No shipping methods found</div>
      )}

      {!loader && !error && filtered.length > 0 && (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Fee</th>
                <th className="px-6 py-3">Free Shipping</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((sm) => {
                const isFree = asBoolean(sm.is_free_shipping);
                return (
                  <tr key={sm.id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-6 py-3">{sm.id}</td>
                    <td className="px-6 py-3 font-medium">{sm.name}</td>
                    <td className="px-6 py-3">
                      {sm.description ? sm.description : <span className="text-gray-400">—</span>}
                    </td>
                    <td className="px-6 py-3">
                      {isFree ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                          Free
                        </span>
                      ) : (
                        <span>{formatFee(sm.fee)}</span>
                      )}
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          isFree ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {isFree ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex justify-center gap-3">
                        <button className="text-blue-600 hover:text-blue-800" title="View">👁</button>
                        <button className="text-yellow-600 hover:text-yellow-800" title="Edit">✏️</button>
                        <button className="text-red-600 hover:text-red-800" title="Delete">🗑</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
