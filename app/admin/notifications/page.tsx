"use client";

import { useEffect, useMemo, useState } from "react";
import { apiUrl, adminToken } from "../../common/http";
import AdminLayout from "../AdminLayout";

type NotificationType = "order" | "payment" | "shipping" | "system" | "other";

export interface Notification {
  id: number;
  user_id: number;
  title: string;
  message: string;
  type: NotificationType;
  is_read: boolean | number;   // Laravel might return 0/1
  read_at?: Date | null;
  created_at?: Date;
  updated_at?: Date;
}

interface ApiListResponse<T> {
  status: number;
  data: T[];
  message?: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    try {
      setLoader(true);
      setError(null);

      const res = await fetch(`${apiUrl}/notifications`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
        cache: "no-store",
      });

      const result: ApiListResponse<Notification> = await res.json();
      setLoader(false);

      if (result?.status === 200 && Array.isArray(result?.data)) {
        setNotifications(result.data);
      } else {
        setError("Unexpected API response.");
        console.error("Unexpected response:", result);
      }
    } catch (e) {
      setLoader(false);
      setError("Failed to load notifications.");
      console.error("Error fetching notifications:", e);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const asBool = (v: boolean | number) => (typeof v === "boolean" ? v : Number(v) === 1);
  const fmtDate = (d?: string | null) => (d ? new Date(d).toLocaleString() : "—");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return notifications;
    return notifications.filter((n) => {
      const idMatch = n.id.toString().includes(q);
      const userMatch = n.user_id.toString().includes(q);
      const titleMatch = n.title?.toLowerCase().includes(q);
      const msgMatch = (n.message ?? "").toLowerCase().includes(q);
      const typeMatch = (n.type ?? "").toLowerCase().includes(q);
      return idMatch || userMatch || titleMatch || msgMatch || typeMatch;
    });
  }, [search, notifications]);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <button
          onClick={fetchNotifications}
          className="px-3 py-2 rounded-lg border hover:bg-gray-50"
          title="Refresh"
        >
          ↻ Refresh
        </button>
      </div>

      {/* Search */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by ID, user, title, message, or type…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* States */}
      {loader && <div className="text-center py-6 text-gray-500">Loading...</div>}
      {!loader && error && <div className="text-center py-6 text-red-600">{error}</div>}
      {!loader && !error && filtered.length === 0 && (
        <div className="text-center py-6 text-gray-500">No notifications found</div>
      )}

      {!loader && !error && filtered.length > 0 && (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Message</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Read</th>
                <th className="px-6 py-3">Read At</th>
                <th className="px-6 py-3">Created</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((n) => {
                const read = asBool(n.is_read);
                return (
                  <tr key={n.id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-6 py-3">{n.id}</td>
                    <td className="px-6 py-3 font-medium">{n.user_id}</td>
                    <td className="px-6 py-3">{n.title}</td>
                    <td className="px-6 py-3">
                      <span className="line-clamp-2">{n.message}</span>
                    </td>
                    <td className="px-6 py-3">
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 capitalize">
                        {n.type ?? "other"}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          read ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {read ? "Read" : "Unread"}
                      </span>
                    </td>
                    <td className="px-6 py-3">{fmtDate(n.read_at)}</td>
                    <td className="px-6 py-3">{fmtDate(n.created_at)}</td>
                    <td className="px-6 py-3">
                      <div className="flex justify-center gap-3">
                        <button className="text-blue-600 hover:text-blue-800" title="View">
                          👁
                        </button>
                        <button className="text-yellow-600 hover:text-yellow-800" title="Mark as Unread">
                          ✉️
                        </button>
                        <button className="text-green-600 hover:text-green-800" title="Mark as Read">
                          ✅
                        </button>
                        <button className="text-red-600 hover:text-red-800" title="Delete">
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
