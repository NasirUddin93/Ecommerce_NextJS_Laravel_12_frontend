"use client";

import { useEffect, useState } from "react";
import { apiUrl, adminToken } from "../../common/http";
import AdminLayout from "../AdminLayout";

// TypeScript interface for category
interface Payment {
  id: number;
  order_id: number;
  user_id: number;
  payment_method: 'debit'|'credit'|'refund'|'chargeback';
  transaction_id: number;
  amount: number;
  status: 'pending'|'success'|'failed'|'refunded';
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export default function ProductVariants() {

  const [productVariants, setProductVariants] = useState<Payment[]>([]);
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");

  const fetchSizes = async () => {
    try {
      setLoader(true);
      const res = await fetch(`${apiUrl}/transactions`, {
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
    productVariants.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-4">Payments</h1>

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
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Method</th>
                <th className="px-6 py-3">Tran_Id</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Created At</th>
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
                  <td className="px-6 py-3">{productVariant.order_id}</td>
                  <td className="px-6 py-3">{productVariant.payment_method}</td>
                  <td className="px-6 py-3">{productVariant.transaction_id}</td>
                  <td className="px-6 py-3">{productVariant.amount}</td>
                  <td className="px-6 py-3">{productVariant.status}</td>
                  <td className="px-6 py-3">{productVariant.created_at}</td>

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
          No sizes found
        </div>
      )}
    </AdminLayout>
  );
}