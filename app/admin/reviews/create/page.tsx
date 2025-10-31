// app/admin/reviews/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "../../AdminLayout";
import { apiUrl, adminToken } from "../../../common/http";

// TypeScript interface for Review
interface ReviewForm {
  user_id: number;
  product_id: number;
  rating: number;
  comment: string;
}

export default function CreateReviewPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<ReviewForm>({
    user_id: 0,
    product_id: 0,
    rating: 0,
    comment: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Update form state
    setForm((f) => ({
      ...f,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const validate = (): string | null => {
    if (!form.user_id || !form.product_id || !form.rating || !form.comment) {
      return "All fields are required.";
    }
    if (form.rating < 1 || form.rating > 5) {
      return "Rating must be between 1 and 5.";
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
        user_id: form.user_id,
        product_id: form.product_id,
        rating: form.rating,
        comment: form.comment,
      };

      const res = await fetch(`${apiUrl}/reviews`, {
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
          "Failed to create review.";
        setError(typeof msg === "string" ? msg : "Failed to create review.");
        return;
      }

      alert("✅ Review created successfully!");
      router.push("/admin/reviews");
    } catch (err) {
      console.error(err);
      setError("Unexpected error creating review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Add Review</h1>
          <button
            type="button"
            onClick={() => router.push("/admin/reviews")}
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
          {/* User ID */}
          <div>
            <label className="block text-sm font-medium mb-1">User ID</label>
            <input
              name="user_id"
              type="number"
              placeholder="e.g. 123"
              value={form.user_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          {/* Product ID */}
          <div>
            <label className="block text-sm font-medium mb-1">Product ID</label>
            <input
              name="product_id"
              type="number"
              placeholder="e.g. 456"
              value={form.product_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium mb-1">Rating (1 to 5)</label>
            <input
              name="rating"
              type="number"
              placeholder="e.g. 5"
              value={form.rating}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              min={1}
              max={5}
              required
            />
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium mb-1">Comment</label>
            <textarea
              name="comment"
              placeholder="Your review comment"
              value={form.comment}
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
            {isSubmitting ? "Creating…" : "Create Review"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
