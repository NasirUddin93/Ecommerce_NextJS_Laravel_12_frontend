"use client";
import { useState } from "react";
import { apiUrl, adminToken } from "../../../common/http";
import AdminLayout from "../../AdminLayout";

interface SizeForm {
  name: string;
  status: number;
}

export default function AddSize() {
  
  const [form, setForm] = useState<SizeForm>({ name: "",  status: 1 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const key = name as keyof SizeForm;

    setForm({ ...form, [key]: type === "number" ? Number(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("status", String(form.status));

      const res = await fetch(`${apiUrl}/sizes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminToken()}`,
        },
        body: formData,
      });

      const responseData = await res.json();

      if (!res.ok) {
        alert("❌ " + JSON.stringify(responseData.errors || responseData.message));
        return;
      }

      alert("✅ Size created successfully!");
      setForm({ name: "",  status: 1 });
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Failed to create Size");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Add Size</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Size Name</label>
            <input
              name="name"
              placeholder="Enter Size name"
              value={form.name}
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
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {isSubmitting ? "Creating Size..." : "Add Size"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
