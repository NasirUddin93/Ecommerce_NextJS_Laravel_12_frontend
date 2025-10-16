"use client";
import { useState } from "react";
import { apiUrl, adminToken } from "../../../common/http";
import AdminLayout from "../../AdminLayout";

interface OrderForm {
  user_id: number;
  total_amount: number;
  discount_amount: number;
  shipping_fee: number;
  final_amount: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
}

export default function AddOrder() {
  
  const [form, setForm] = useState<OrderForm>({ 
  user_id: 0,
  total_amount: 0,
  discount_amount: 0,
  shipping_fee:0,
  final_amount: 0,
  status: "pending"  
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const key = name as keyof OrderForm;

    // setForm({ ...form, [key]: type === "number" ? Number(value) : value });
    setForm({
      ...form,
      [key]: ["total_amount","discount_amount","shipping_fee","final_amount","user_id"].includes(key)
        ? Number(value)
        : value,
    });

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("user_id", String(form.user_id));
      formData.append("total_amount", String(form.total_amount));
      formData.append("discount_amount", String(form.discount_amount));
      formData.append("shipping_fee", String(form.shipping_fee));
      formData.append("final_amount", String(form.final_amount));
      formData.append("status", String(form.status));

      const res = await fetch(`${apiUrl}/orders`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminToken()}`,
        },
        body: formData,
      });

      const responseData = await res.json();

      if (!res.ok) {
        alert("❌ " + JSON.stringify(responseData.errors || responseData.message));
        return;
      }

      alert("✅ Order created successfully!");
      setForm({ 
          user_id: 0,
        total_amount: 0,
        discount_amount: 0,
        shipping_fee:0,
        final_amount: 0,
        status: "pending"
      
      });
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Failed to create order");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Add Order</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Customer ID</label>
            <input
              name="user_id"
              placeholder="Enter order name"
              value={form.user_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Total Amount</label>
            <input
              name="total_amount"
              placeholder="Enter order name"
              value={form.total_amount}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Discount Amount</label>
            <input
              name="discount_amount"
              placeholder="Enter order name"
              value={form.discount_amount}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Shipping Fee</label>
            <input
              name="shipping_fee"
              placeholder="Enter order name"
              value={form.shipping_fee}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Final Amount</label>
            <input
              name="final_amount"
              placeholder="Enter order name"
              value={form.final_amount}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
            </select>
         </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {isSubmitting ? "Creating Order..." : "Add Order"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
