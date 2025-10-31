// app/admin/order-items/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "../../AdminLayout";
import { apiUrl, adminToken } from "../../../common/http";

interface OrderItemForm {
  order_id: number;
  product_id: number;
  variant_id: number;
  quantity: number;
  price_at_purchase: number;
  discount_applied: number;
}

export default function CreateOrderItemPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<OrderItemForm>({
    order_id: 0,
    product_id: 0,
    variant_id: 0,
    quantity: 1,
    price_at_purchase: 0,
    discount_applied: 0,
  });
  const [error, setError] = useState<string | null>(null);

  // handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: Number(value) || 0,
    }));
  };

  // handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Basic validation
    if (!form.order_id || !form.product_id || !form.quantity) {
      setError("Order ID, Product ID, and Quantity are required.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        order_id: form.order_id,
        product_id: form.product_id,
        variant_id: form.variant_id,
        quantity: form.quantity,
        price_at_purchase: form.price_at_purchase,
        discount_applied: form.discount_applied,
      };

      const res = await fetch(`${apiUrl}/order-items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg =
          (data && (data.message || JSON.stringify(data.errors))) ||
          "Failed to create order item.";
        setError(typeof msg === "string" ? msg : "Failed to create order item.");
        return;
      }

      alert("✅ Order Item created successfully!");
      router.push("/admin/order-items");
    } catch (err) {
      console.error(err);
      setError("Unexpected error creating order item.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Add Order Item</h1>
          <button
            type="button"
            onClick={() => router.push("/admin/order-items")}
            className="px-3 py-2 rounded-lg border hover:bg-gray-50"
          >
            ← Back
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Order ID</label>
            <input
              name="order_id"
              type="number"
              placeholder="e.g. 101"
              value={form.order_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Product ID</label>
            <input
              name="product_id"
              type="number"
              placeholder="e.g. 55"
              value={form.product_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Variant ID</label>
            <input
              name="variant_id"
              type="number"
              placeholder="e.g. 12"
              value={form.variant_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <input
                name="quantity"
                type="number"
                min={1}
                value={form.quantity}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Price at Purchase
              </label>
              <input
                name="price_at_purchase"
                type="number"
                step="0.01"
                value={form.price_at_purchase}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Discount Applied
              </label>
              <input
                name="discount_applied"
                type="number"
                step="0.01"
                value={form.discount_applied}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Creating…" : "Create Order Item"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
