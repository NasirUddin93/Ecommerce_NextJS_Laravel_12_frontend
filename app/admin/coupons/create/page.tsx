"use client";

import { useState, useMemo } from "react";
import { apiUrl, adminToken } from "../../../common/http";
import AdminLayout from "../../AdminLayout";
import Link from "next/link";

type DiscountType = "percentage" | "fixed";
type CouponStatus = "active" | "inactive";

interface CouponForm {
  code: string;
  description: string;
  discount_type: DiscountType;
  discount_value: string | number;      // text while typing, number on submit
  min_purchase_amount: string | number; // text while typing, number on submit
  max_discount_amount: string | number | ""; // optional
  valid_from: string; // YYYY-MM-DD
  valid_to: string;   // YYYY-MM-DD
  usage_limit: string | number;
  status: CouponStatus;
}

export default function CreateCouponPage() {
  const [form, setForm] = useState<CouponForm>({
    code: "",
    description: "",
    discount_type: "percentage",
    discount_value: "",
    min_purchase_amount: "",
    max_discount_amount: "",
    valid_from: "",
    valid_to: "",
    usage_limit: "1",
    status: "active",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // simple client-side checks to catch common mistakes
  const clientErrors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!form.code.trim()) e.code = "Code is required.";
    const dv = Number(form.discount_value);
    if (Number.isNaN(dv) || dv <= 0) e.discount_value = "Discount value must be a positive number.";
    if (form.discount_type === "percentage" && (dv <= 0 || dv > 100)) {
      e.discount_value = "Percentage must be between 1 and 100.";
    }
    const minAmt = Number(form.min_purchase_amount);
    if (Number.isNaN(minAmt) || minAmt < 0) e.min_purchase_amount = "Min purchase must be 0 or more.";
    if (form.max_discount_amount !== "" && (Number.isNaN(Number(form.max_discount_amount)) || Number(form.max_discount_amount) < 0)) {
      e.max_discount_amount = "Max discount must be 0 or more (or leave blank).";
    }
    const usage = Number(form.usage_limit);
    if (Number.isNaN(usage) || usage < 1) e.usage_limit = "Usage limit must be 1 or more.";
    if (form.valid_from && form.valid_to && form.valid_to < form.valid_from) {
      e.valid_to = "Valid To must be the same or after Valid From.";
    }
    return e;
  }, [form]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm(prev => {
      // keep text while typing; cast in submit
      if (
        name === "discount_value" ||
        name === "min_purchase_amount" ||
        name === "max_discount_amount" ||
        name === "usage_limit"
      ) {
        return { ...prev, [name]: value };
      }
      if (name === "discount_type") {
        return { ...prev, discount_type: value as DiscountType };
      }
      if (name === "status") {
        return { ...prev, status: value as CouponStatus };
      }
      return { ...prev, [name]: type === "number" ? Number(value) : value };
    });
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    // prevent submit if client-side errors exist
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        code: form.code.trim(),
        description: form.description.trim() || null,
        discount_type: form.discount_type,
        discount_value: Number(form.discount_value ?? 0),
        min_purchase_amount: Number(form.min_purchase_amount ?? 0),
        max_discount_amount:
          form.max_discount_amount === "" ? null : Number(form.max_discount_amount),
        valid_from: form.valid_from || null, // send null if not set
        valid_to: form.valid_to || null,     // send null if not set
        usage_limit: Number(form.usage_limit ?? 1),
        status: form.status, // "active" | "inactive"
      };

      const res = await fetch(
        // If your apiUrl is WITHOUT /api, use `${apiUrl}/api/coupons`
        `${apiUrl}/coupons`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken()}`,
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // prefer Laravel validation errors
        if (data?.errors && typeof data.errors === "object") {
          const flat: Record<string, string> = {};
          Object.entries<any>(data.errors).forEach(([k, v]) => {
            flat[k] = Array.isArray(v) ? v.join(" ") : String(v);
          });
          setErrors(flat);
          alert("❌ Please fix validation errors.");
        } else {
          alert("❌ " + (data?.message || `HTTP ${res.status}`));
        }
        return;
      }

      alert("✅ Coupon created successfully!");
      setForm({
        code: "",
        description: "",
        discount_type: "percentage",
        discount_value: "",
        min_purchase_amount: "",
        max_discount_amount: "",
        valid_from: "",
        valid_to: "",
        usage_limit: "1",
        status: "active",
      });
      setErrors({});
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create coupon");
    } finally {
      setIsSubmitting(false);
    }
  };

  const FieldError = ({ name }: { name: keyof CouponForm | string }) =>
    errors[name as string] ? (
      <p className="text-sm text-red-600 mt-1">{errors[name as string]}</p>
    ) : null;

  return (
    <AdminLayout>
      <div className="p-4 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Add Coupon</h1>
          <div className="flex gap-2">
            <Link
              href="/admin/coupons"
              className="px-3 py-2 rounded-lg border hover:bg-gray-50"
            >
              ← Back
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Code */}
          <div>
            <label className="block text-sm font-medium mb-1">Code *</label>
            <input
              name="code"
              value={form.code}
              onChange={handleChange}
              placeholder="e.g., SAVE10"
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
            <FieldError name="code" />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Short note about this coupon"
              className="w-full border border-gray-300 rounded-lg p-2 min-h-[80px]"
            />
            <FieldError name="description" />
          </div>

          {/* Discount Type + Value */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Discount Type *</label>
              <select
                name="discount_type"
                value={form.discount_type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed amount</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Discount Value *</label>
              <input
                type="number"
                step="0.01"
                name="discount_value"
                value={form.discount_value}
                onChange={handleChange}
                placeholder={form.discount_type === "percentage" ? "e.g., 10" : "e.g., 100"}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              />
              <FieldError name="discount_value" />
            </div>
          </div>

          {/* Min/Max amounts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Min Purchase Amount *</label>
              <input
                type="number"
                step="0.01"
                name="min_purchase_amount"
                value={form.min_purchase_amount}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              />
              <FieldError name="min_purchase_amount" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Max Discount Amount</label>
              <input
                type="number"
                step="0.01"
                name="max_discount_amount"
                value={form.max_discount_amount}
                onChange={handleChange}
                placeholder="(optional)"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <FieldError name="max_discount_amount" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Usage Limit *</label>
              <input
                type="number"
                name="usage_limit"
                value={form.usage_limit}
                onChange={handleChange}
                min={1}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              />
              <FieldError name="usage_limit" />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Valid From</label>
              <input
                type="date"
                name="valid_from"
                value={form.valid_from}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <FieldError name="valid_from" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Valid To</label>
              <input
                type="date"
                name="valid_to"
                value={form.valid_to}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <FieldError name="valid_to" />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">Status *</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <FieldError name="status" />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {isSubmitting ? "Creating Coupon..." : "Add Coupon"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
