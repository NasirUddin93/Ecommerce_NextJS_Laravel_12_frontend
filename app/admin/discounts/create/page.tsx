// app/admin/discounts/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "../../AdminLayout";
import { apiUrl, adminToken } from "../../../common/http";

type DiscountType = "percentage" | "fixed";

interface DiscountForm {
  product_id: number;     // optional if category_id is provided
  category_id: number;    // optional if product_id is provided
  discount_type: DiscountType;
  discount_value: number;
  valid_from: string;     // YYYY-MM-DD
  valid_to: string;       // YYYY-MM-DD
}

export default function CreateDiscountPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<DiscountForm>({
    product_id: 0,
    category_id: 0,
    discount_type: "percentage",
    discount_value: 0,
    valid_from: "",
    valid_to: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleNumber = (val: string) => (val ? Number(val) : 0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "product_id" || name === "category_id") {
      setForm((f) => ({ ...f, [name]: handleNumber(value) }));
      return;
    }

    if (name === "discount_value") {
      setForm((f) => ({ ...f, discount_value: handleNumber(value) }));
      return;
    }

    if (name === "discount_type") {
      setForm((f) => ({ ...f, discount_type: value as DiscountType }));
      return;
    }

    // valid_from / valid_to are strings (YYYY-MM-DD)
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = (): string | null => {
    const targetingProduct = !!form.product_id && form.product_id > 0;
    const targetingCategory = !!form.category_id && form.category_id > 0;

    if (!targetingProduct && !targetingCategory) {
      return "Provide either a Product ID or a Category ID.";
    }

    if (form.discount_value <= 0) {
      return "Discount value must be greater than 0.";
    }

    if (form.discount_type === "percentage" && form.discount_value > 100) {
      return "Percentage discount cannot exceed 100.";
    }

    if (!form.valid_from || !form.valid_to) {
      return "Valid From and Valid To are required.";
    }

    const from = new Date(form.valid_from);
    const to = new Date(form.valid_to);
    if (isNaN(from.getTime()) || isNaN(to.getTime())) {
      return "Please provide valid dates for the discount period.";
    }
    if (to < from) {
      return "Valid To must be the same as or after Valid From.";
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
      // Prepare payload; send 0 as null to avoid server-side validation issues
      const payload = {
        product_id: form.product_id > 0 ? form.product_id : null,
        category_id: form.category_id > 0 ? form.category_id : null,
        discount_type: form.discount_type,
        discount_value: form.discount_value,
        valid_from: form.valid_from, // e.g., "2025-10-21"
        valid_to: form.valid_to,     // e.g., "2025-10-31"
      };

      const res = await fetch(`${apiUrl}/discounts`, {
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
          "Failed to create discount.";
        setError(typeof msg === "string" ? msg : "Failed to create discount.");
        return;
      }

      alert("✅ Discount created successfully!");
      router.push("/admin/discounts");
    } catch (err) {
      console.error(err);
      setError("Unexpected error creating discount.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Add Discount</h1>
          <button
            type="button"
            onClick={() => router.push("/admin/discounts")}
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
          {/* Target: Product or Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Product ID (optional)
              </label>
              <input
                name="product_id"
                type="number"
                placeholder="e.g. 101"
                value={form.product_id}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Category ID (optional)
              </label>
              <input
                name="category_id"
                type="number"
                placeholder="e.g. 12"
                value={form.category_id}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
          </div>
          <p className="text-xs text-gray-500">
            You must provide either a Product ID or a Category ID.
          </p>

          {/* Discount Type */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Discount Type
            </label>
            <select
              name="discount_type"
              value={form.discount_type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 bg-white"
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed</option>
            </select>
          </div>

          {/* Discount Value */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Discount Value
            </label>
            <input
              name="discount_value"
              type="number"
              placeholder="e.g. 15"
              value={form.discount_value}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              min={0}
              step="0.01"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              If type is <b>percentage</b>, value should be between 0–100.
              If <b>fixed</b>, value is a flat amount in your store currency.
            </p>
          </div>

          {/* Validity Period */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Valid From
              </label>
              <input
                name="valid_from"
                type="date"
                value={form.valid_from}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Valid To</label>
              <input
                name="valid_to"
                type="date"
                value={form.valid_to}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Creating…" : "Create Discount"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
