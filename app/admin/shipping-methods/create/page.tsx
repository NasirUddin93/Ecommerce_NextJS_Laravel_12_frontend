"use client";
import { useState } from "react";
import { apiUrl, adminToken } from "../../../common/http";
import AdminLayout from "../../AdminLayout";

interface ShippingMethodForm {
  name: string;
  description: string;
  fee: string | number;        // allow string while typing
  is_free_shipping: 0 | 1;     // store as 0/1 for easy select binding
  
}

export default function AddShippingMethod() {
  const [form, setForm] = useState<ShippingMethodForm>({
    name: "",
    description: "",
    fee: "",
    is_free_shipping: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm(prev => {
      if (name === "fee") {
        // keep raw text while typing; we’ll cast on submit
        return { ...prev, fee: value };
      }
      if (name === "is_free_shipping") {
        return { ...prev, is_free_shipping: Number(value) as 0 | 1 };
      }
      return { ...prev, [name]: type === "number" ? Number(value) : value };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const payload = {
        name: form.name,
        description: form.description || null,
        fee: Number(form.fee ?? 0),                     // numeric
        is_free_shipping: Number(form.is_free_shipping) // 0 or 1 OK for Laravel boolean
      };

      const res = await fetch(
        // If apiUrl does NOT already include /api, use `${apiUrl}/api/shipping-methods`
        `${apiUrl}/shipping-methods`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken()}`
          },
          body: JSON.stringify(payload)
        }
      );

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // show Laravel validation errors nicely
        const msg =
          (data?.errors && JSON.stringify(data.errors)) ||
          data?.message ||
          `HTTP ${res.status}`;
        alert("❌ " + msg);
        return;
      }

      alert("✅ Shipping Method created successfully!");
      setForm({ name: "", description: "", fee: "", is_free_shipping: 0 });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create Shipping Method");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Add Shipping Method</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              name="name"
              placeholder="Enter Shipping Method name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <input
              name="description"
              placeholder="Enter description"
              value={form.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Fee</label>
            <input
              type="number"
              step="0.01"
              name="fee"
              placeholder="Enter shipping fee"
              value={form.fee}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Is Free Shipping?</label>
            <select
              name="is_free_shipping"        // ✅ correct name
              value={form.is_free_shipping}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {isSubmitting ? "Creating Shipping Method..." : "Add Shipping Method"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
