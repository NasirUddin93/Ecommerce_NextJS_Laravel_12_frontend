// app/admin/payments/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "../../AdminLayout";
import { apiUrl, adminToken } from "../../../common/http";

type PaymentMethod = "debit" | "credit" | "refund" | "chargeback";
type PaymentStatus  = "pending" | "success" | "failed" | "refunded";

interface PaymentForm {
  user_id: number;
  order_id: number;
  payment_method: PaymentMethod;
  transaction_id: string;
  amount: number;
  status: PaymentStatus;
}

export default function CreatePaymentPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<PaymentForm>({
    user_id: 0,
    order_id: 0,
    payment_method: "debit",
    transaction_id: "",
    amount: 0,
    status: "pending",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    // numeric fields
    if (name === "user_id" || name === "order_id") {
      setForm((f) => ({ ...f, [name]: Number(value) || 0 }));
      return;
    }
    if (name === "amount") {
      setForm((f) => ({ ...f, amount: Number(value) || 0 }));
      return;
    }

    // selects / text
    setForm((f) => ({
      ...f,
      [name]:
        type === "number"
          ? Number(value)
          : (value as PaymentMethod | PaymentStatus | string),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // basic client-side checks
    if (!form.user_id || form.user_id < 1) {
      setError("Valid user ID is required.");
      return;
    }
    if (!form.order_id || form.order_id < 1) {
      setError("Valid order ID is required.");
      return;
    }
    if (!form.transaction_id.trim()) {
      setError("Transaction ID is required.");
      return;
    }
    if (form.amount <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        user_id: form.user_id,
        order_id: form.order_id,
        payment_method: form.payment_method,
        transaction_id: form.transaction_id.trim(),
        amount: Number(form.amount),
        status: form.status,
      };

      const res = await fetch(`${apiUrl}/payments`, {
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
          "Failed to create payment.";
        setError(typeof msg === "string" ? msg : "Failed to create payment.");
        return;
      }

      alert("✅ Payment created successfully!");
      router.push("/admin/payments");
    } catch (err) {
      console.error(err);
      setError("Unexpected error creating payment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Add Payment</h1>
          <button
            type="button"
            onClick={() => router.push("/admin/payments")}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">User ID</label>
              <input
                name="user_id"
                type="number"
                placeholder="e.g. 42"
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
                placeholder="e.g. 1001"
                value={form.order_id}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Payment Method
            </label>
            
          <select
            name="payment_method"
            value={form.payment_method}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 capitalize"
          >
            <option value="card">card</option>
            <option value="mobile_banking">mobile_banking</option>
            <option value="COD">COD</option>
          </select>

          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Transaction ID
            </label>
            <input
              name="transaction_id"
              placeholder="e.g. TXN-ABC-12345"
              value={form.transaction_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Amount</label>
              <input
                name="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="e.g. 199.99"
                value={form.amount}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 capitalize"
              >
                <option value="pending">pending</option>
                <option value="success">success</option>
                <option value="failed">failed</option>
                <option value="refunded">refunded</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Creating…" : "Create Payment"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
