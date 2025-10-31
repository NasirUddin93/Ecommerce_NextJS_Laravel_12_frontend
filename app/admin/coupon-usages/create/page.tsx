// app/admin/coupon-usages/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "../../AdminLayout";
import { apiUrl, adminToken } from "../../../common/http";

interface CouponUsageForm {
  coupon_id: number;
  user_id: number;
  order_id: number;
  used_at: string;
}

export default function CreateCouponUsagePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<CouponUsageForm>({
    coupon_id: 0,
    user_id: 0,
    order_id: 0,
    used_at: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "used_at" ? value : Number(value) || 0,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!form.coupon_id || !form.user_id || !form.order_id) {
      setError("Coupon ID, User ID, and Order ID are required.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // ✅ Fix: convert ISO → MySQL datetime
      const formattedUsedAt = form.used_at
        ? new Date(form.used_at).toISOString().slice(0, 19).replace("T", " ")
        : null;

      const payload = {
        coupon_id: form.coupon_id,
        user_id: form.user_id,
        order_id: form.order_id,
        used_at: formattedUsedAt,
      };

      const res = await fetch(`${apiUrl}/coupon-usages`, {
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
          "Failed to create coupon usage.";
        setError(typeof msg === "string" ? msg : "Failed to create coupon usage.");
        return;
      }

      alert("✅ Coupon usage created successfully!");
      router.push("/admin/coupon-usages");
    } catch (err) {
      console.error(err);
      setError("Unexpected error creating coupon usage.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const usedAtLocalValue = form.used_at
    ? new Date(form.used_at).toISOString().slice(0, 16)
    : "";

  return (
    <AdminLayout>
      <div className="p-4 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Add Coupon Usage</h1>
          <button
            type="button"
            onClick={() => router.push("/admin/coupon-usages")}
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
            <label className="block text-sm font-medium mb-1">Coupon ID</label>
            <input
              name="coupon_id"
              type="number"
              value={form.coupon_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">User ID</label>
            <input
              name="user_id"
              type="number"
              value={form.user_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Order ID</label>
            <input
              name="order_id"
              type="number"
              value={form.order_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Used At</label>
            <input
              name="used_at"
              type="datetime-local"
              value={usedAtLocalValue}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Creating…" : "Create Coupon Usage"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
