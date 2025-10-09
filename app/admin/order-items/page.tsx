"use client";

import { useEffect, useState } from "react";
import { apiUrl, adminToken } from "../../common/http";
import AdminLayout from "../AdminLayout";

// TypeScript interface for category
export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  variant_id: number;
  quantity: number;
  price_at_purchase: number;
  discount_applied: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}


export default function CategoriesPage() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");

  const fetchOrders = async () => {
    try {
      setLoader(true);
      const res = await fetch(`${apiUrl}/order-items`, {
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
        setOrderItems(result.data);
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
  const filteredOrderItems = orderItems.filter((orderItem) =>
    orderItem.id.toString().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-4">Orders</h1>

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
      ) : filteredOrderItems.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Product ID</th>
                <th className="px-6 py-3">Variant ID</th>
                <th className="px-6 py-3">Quantity</th>
                <th className="px-6 py-3">Purchase Price</th>
                <th className="px-6 py-3">Discount Price</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrderItems.map((orderItem) => (
                <tr
                  key={orderItem.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-3">{orderItem.id}</td>
                  <td className="px-6 py-3 font-medium">{orderItem.order_id}</td>
                  <td className="px-6 py-3 font-medium">{orderItem.product_id}</td>
                  <td className="px-6 py-3 font-medium">{orderItem.variant_id}</td>
                  <td className="px-6 py-3 font-medium">{orderItem.quantity}</td>
                  <td className="px-6 py-3 font-medium">{orderItem.price_at_purchase}</td>
                  <td className="px-6 py-3 font-medium">{orderItem.discount_applied}</td>
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