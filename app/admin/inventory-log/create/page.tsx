// app/admin/inventory-log/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "../../AdminLayout";
import { apiUrl, adminToken } from "../../../common/http";

// TypeScript interface for Inventory Log
interface InventoryLogForm {
  product_id: number;
  variant_id: number;
  change_type: "in" | "out";
  quantity_changed: number;
  note: string;
}

export default function CreateInventoryLogPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<InventoryLogForm>({
    product_id: 0,
    variant_id: 0,
    change_type: "in",
    quantity_changed: 0,
    note: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Update form state
    setForm((f) => ({
      ...f,
      [name]: name === "quantity_changed" ? Number(value) : value,
    }));
  };

  const validate = (): string | null => {
    if (!form.product_id || !form.variant_id || !form.quantity_changed || !form.note) {
      return "All fields are required.";
    }
    if (form.quantity_changed <= 0) {
      return "Quantity changed must be greater than 0.";
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
        product_id: form.product_id,
        variant_id: form.variant_id,
        change_type: form.change_type,
        quantity_changed: form.quantity_changed,
        note: form.note,
      };

      const res = await fetch(`${apiUrl}/inventory-log`, {
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
          "Failed to create inventory log.";
        setError(typeof msg === "string" ? msg : "Failed to create inventory log.");
        return;
      }

      alert("✅ Inventory Log created successfully!");
      router.push("/admin/inventory-log");
    } catch (err) {
      console.error(err);
      setError("Unexpected error creating inventory log.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Add Inventory Log</h1>
          <button
            type="button"
            onClick={() => router.push("/admin/inventory-log")}
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
          {/* Product ID */}
          <div>
            <label className="block text-sm font-medium mb-1">Product ID</label>
            <input
              name="product_id"
              type="number"
              placeholder="e.g. 123"
              value={form.product_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          {/* Variant ID */}
          <div>
            <label className="block text-sm font-medium mb-1">Variant ID</label>
            <input
              name="variant_id"
              type="number"
              placeholder="e.g. 456"
              value={form.variant_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          {/* Change Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Change Type</label>
            <select
              name="change_type"
              value={form.change_type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 bg-white"
              required
            >
              <option value="in">In</option>
              <option value="out">Out</option>
            </select>
          </div>

          {/* Quantity Changed */}
          <div>
            <label className="block text-sm font-medium mb-1">Quantity Changed</label>
            <input
              name="quantity_changed"
              type="number"
              placeholder="e.g. 10"
              value={form.quantity_changed}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              min={1}
              required
            />
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium mb-1">Note</label>
            <textarea
              name="note"
              placeholder="e.g. Stock adjustment"
              value={form.note}
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
            {isSubmitting ? "Creating…" : "Create Inventory Log"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
