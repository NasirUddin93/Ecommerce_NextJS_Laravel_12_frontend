"use client";

import { useEffect, useState } from "react";
import { apiUrl, adminToken } from "../../common/http";
import AdminLayout from "../AdminLayout";

// TypeScript interface for category
export interface InventoryLog {
  id: number;
  product_id: number;
  variant_id: number;
  change_type: "in"|"out";
  quantity_changed: number;
  note: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}


export default function CategoriesPage() {
  const [inventoryLogs, setInventoryLogs] = useState<InventoryLog[]>([]);
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");

  const fetchOrders = async () => {
    try {
      setLoader(true);
      const res = await fetch(`${apiUrl}/inventory-log`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      });

      const result = await res.json();
      // console.log(result);
      setLoader(false);

      if (result.status === 200 && Array.isArray(result.data)) {
        console.log(result.data);
        setInventoryLogs(result.data);
      } else {
        // console.log("Error fetching orders:", result);
        console.error("Unexpected response:", result);
      }
    } catch (error) {
      setLoader(false);
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter categories based on search text
  const filteredInventoryLogs = inventoryLogs.filter((inventoryLog) =>
    inventoryLog.id.toString().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-4">Inventory Log</h1>

      {/* Search Input */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loader ? (
        <div className="text-center py-6 text-gray-500">Loading...</div>
      ) : filteredInventoryLogs.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Product ID</th>
                <th className="px-6 py-3">Variant ID</th>
                <th className="px-6 py-3">Type Changed</th>
                <th className="px-6 py-3">Note</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventoryLogs.map((inventoryLog) => (
                <tr
                  key={inventoryLog.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-3">{inventoryLog.id}</td>
                  <td className="px-6 py-3 font-medium">{inventoryLog.product_id}</td>
                  <td className="px-6 py-3 font-medium">{inventoryLog.variant_id}</td>
                  <td className="px-6 py-3 font-medium">{inventoryLog.change_type}</td>
                  <td className="px-6 py-3 font-medium">{inventoryLog.quantity_changed}</td>
                  <td className="px-6 py-3 font-medium">{inventoryLog.note}</td>
                  {/* <td className="px-6 py-3 font-medium">{orderItem.created_at}</td> */}
                  {/* <td className="px-6 py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        order.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status === "paid" ? "Paid" : "Unpaid"}
                    </span>
                  </td> */}
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
          No order found
        </div>
      )}
    </AdminLayout>
  );
}