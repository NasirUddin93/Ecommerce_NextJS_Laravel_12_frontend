// app/admin/notifications/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "../../AdminLayout";
import { apiUrl, adminToken } from "../../../common/http";

type NotificationType = "order" | "payment" | "shipping" | "system" | "other";

interface NotificationForm {
  user_id: number;
  title: string;
  message: string;
  type: NotificationType;
  is_read: boolean;     // we'll send 1/0 to Laravel
  read_at: string | null; // ISO string or null
}

export default function CreateNotificationPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<NotificationForm>({
    user_id: 0,
    title: "",
    message: "",
    type: "other",
    is_read: false,
    read_at: null,
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    if (name === "is_read") {
      setForm((f) => ({ ...f, is_read: checked }));
      return;
    }
    if (name === "user_id") {
      setForm((f) => ({ ...f, user_id: Number(value) || 0 }));
      return;
    }
    if (name === "read_at") {
      // value comes in as "YYYY-MM-DDTHH:mm"
      setForm((f) => ({ ...f, read_at: value ? new Date(value).toISOString() : null }));
      return;
    }
    setForm((f) => ({ ...f, [name]: type === "number" ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // basic client-side checks
    if (!form.title.trim() || !form.message.trim()) {
      setError("Title and message are required.");
      return;
    }
    if (!form.user_id) {
      setError("Valid user ID is required.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        user_id: form.user_id,
        title: form.title.trim(),
        message: form.message.trim(),
        type: form.type,
        is_read: form.is_read ? 1 : 0,   // Laravel friendly
        read_at: form.read_at,           // null or ISO string
      };

      const res = await fetch(`${apiUrl}/notifications`, {
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
          "Failed to create notification.";
        setError(typeof msg === "string" ? msg : "Failed to create notification.");
        return;
      }

      alert("✅ Notification created successfully!");
      router.push("/admin/notifications");
    } catch (err) {
      console.error(err);
      setError("Unexpected error creating notification.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // turn ISO into input[type=datetime-local] value
  const readAtLocalValue = form.read_at
    ? new Date(form.read_at).toISOString().slice(0, 16)
    : "";

  return (
    <AdminLayout>
      <div className="p-4 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Add Notification</h1>
          <button
            type="button"
            onClick={() => router.push("/admin/notifications")}
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

          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              name="title"
              placeholder="e.g. Order shipped"
              value={form.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              name="message"
              placeholder="Write the notification message…"
              value={form.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 min-h-[120px]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 capitalize"
            >
              <option value="order">order</option>
              <option value="payment">payment</option>
              <option value="shipping">shipping</option>
              <option value="system">system</option>
              <option value="other">other</option>
            </select>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="is_read"
                checked={form.is_read}
                onChange={handleChange}
              />
              <span className="text-sm">Mark as read</span>
            </label>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Read At (optional)
              </label>
              <input
                type="datetime-local"
                name="read_at"
                value={readAtLocalValue}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <p className="text-xs text-gray-500 mt-1">
                If left blank, it will be null. If “Mark as read” is checked and this
                is blank, your API can set it server-side.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Creating…" : "Create Notification"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
