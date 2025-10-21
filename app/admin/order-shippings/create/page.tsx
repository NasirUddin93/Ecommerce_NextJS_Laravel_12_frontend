// app/admin/order-shippings/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "../../AdminLayout";
import { apiUrl, adminToken } from "../../../common/http";

// TypeScript interface for Order Shipping
interface OrderShippingForm {
  order_id: number;
  shipping_method_id: number;
  address: string;
  tracking_number: string;
}

export default function CreateOrderShippingPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<OrderShippingForm>({
    order_id: 0,
    shipping_method_id: 0,
    address: "",
    tracking_number: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Update form state
    setForm((f) => ({
      ...f,
      [name]: value ? (name === "order_id" || name === "shipping_method_id" ? Number(value) : value) : "",
    }));
  };

  const validate = (): string | null => {
    if (!form.order_id || !form.shipping_method_id || !form.address || !form.tracking_number) {
      return "All fields are required.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        order_id: form.order_id,
        shipping_method_id: form.shipping_method_id,
        address: form.address,
        tracking_number: form.tracking_number,
      };

      const res = await fetch(`${apiUrl}/order-shippings`, {
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
          "Failed to create order shipping.";
        setError(typeof msg === "string" ? msg : "Failed to create order shipping.");
        return;
      }

      alert("✅ Order Shipping created successfully!");
      router.push("/admin/order-shippings");
    } catch (err) {
      console.error(err);
      setError("Unexpected error creating order shipping.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Add Order Shipping</h1>
          <button
            type="button"
            onClick={() => router.push("/admin/order-shippings")}
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
          {/* Order ID */}
          <div>
            <label className="block text-sm font-medium mb-1">Order ID</label>
            <input
              name="order_id"
              type="number"
              placeholder="e.g. 123"
              value={form.order_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          {/* Shipping Method ID */}
          <div>
            <label className="block text-sm font-medium mb-1">Shipping Method ID</label>
            <input
              name="shipping_method_id"
              type="number"
              placeholder="e.g. 456"
              value={form.shipping_method_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              name="address"
              type="text"
              placeholder="e.g. 123 Main St, City, Country"
              value={form.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          {/* Tracking Number */}
          <div>
            <label className="block text-sm font-medium mb-1">Tracking Number</label>
            <input
              name="tracking_number"
              type="text"
              placeholder="e.g. 1Z999AA10123456789"
              value={form.tracking_number}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Creating…" : "Create Order Shipping"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
