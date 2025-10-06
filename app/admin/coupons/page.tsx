"use client";

import { useEffect, useMemo, useState } from "react";
import { apiUrl, adminToken } from "../../common/http";
import AdminLayout from "../AdminLayout";

type DiscountType = "percentage" | "fixed";
type CouponStatus = "active" | "inactive";

interface Coupon {
  id: number;
  code: string;
  description?: string | null;
  discount_type: DiscountType;
  discount_value: number | string;
  min_purchase_amount: number | string;
  max_discount_amount?: number | string | null;
  valid_from?: string | null; // 'YYYY-MM-DD'
  valid_to?: string | null;   // 'YYYY-MM-DD'
  usage_limit: number;
  status: CouponStatus;
  created_at?: string;
  updated_at?: string;
}

interface ApiListResponse<T> {
  status: number;
  data: T[];
  message?: string;
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

  const fetchCoupons = async () => {
    try {
      setLoader(true);
      setError(null);

      const res = await fetch(`${apiUrl}/coupons`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`, // remove if public
        },
        cache: "no-store",
      });

      const result: ApiListResponse<Coupon> = await res.json();
      setLoader(false);

      if (result?.status === 200 && Array.isArray(result?.data)) {
        setCoupons(result.data);
      } else {
        setError("Unexpected API response.");
        console.error("Unexpected response:", result);
      }
    } catch (e) {
      setLoader(false);
      setError("Failed to load coupons.");
      console.error("Error fetching coupons:", e);
    }
  };

  useEffect(() => {
    fetchCoupons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return coupons;
    return coupons.filter((c) => {
      const code = c.code?.toLowerCase() ?? "";
      const desc = (c.description ?? "").toString().toLowerCase();
      return code.includes(q) || desc.includes(q);
    });
  }, [search, coupons]);

  const money = (v: number | string | null | undefined) => {
    if (v === null || v === undefined) return "—";
    const n = typeof v === "string" ? Number(v) : v;
    if (Number.isNaN(n)) return String(v);
    return n.toFixed(2);
  };

  const fmtDiscount = (type: DiscountType, value: number | string) => {
    const n = typeof value === "string" ? Number(value) : value;
    if (Number.isNaN(n)) return String(value);
    return type === "percentage" ? `${n}%` : money(n);
    // tip: show currency symbol if you have one, e.g. `$${money(n)}`
  };

  const fmtDate = (d?: string | null) => (d ? d : "—");

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Coupons</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchCoupons}
            className="px-3 py-2 rounded-lg border hover:bg-gray-50"
            title="Refresh"
          >
            ↻ Refresh
          </button>
          {/* You can wire this to a Create Coupon page or modal */}
          <button
            className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            title="Create"
          >
            + New Coupon
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by code or description…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* States */}
      {loader && <div className="text-center py-6 text-gray-500">Loading…</div>}
      {!loader && error && (
        <div className="text-center py-6 text-red-600">{error}</div>
      )}
      {!loader && !error && filtered.length === 0 && (
        <div className="text-center py-6 text-gray-500">No coupons found</div>
      )}

      {!loader && !error && filtered.length > 0 && (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Code</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Discount</th>
                <th className="px-4 py-3">Min Purchase</th>
                <th className="px-4 py-3">Max Discount</th>
                <th className="px-4 py-3">Valid From</th>
                <th className="px-4 py-3">Valid To</th>
                <th className="px-4 py-3">Usage Limit</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{c.id}</td>
                  <td className="px-4 py-3 font-medium">{c.code}</td>
                  <td className="px-4 py-3">
                    {c.description ? c.description : <span className="text-gray-400">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className="whitespace-nowrap">
                      {fmtDiscount(c.discount_type, c.discount_value)}
                    </span>
                  </td>
                  <td className="px-4 py-3">{money(c.min_purchase_amount)}</td>
                  <td className="px-4 py-3">{money(c.max_discount_amount ?? null)}</td>
                  <td className="px-4 py-3">{fmtDate(c.valid_from)}</td>
                  <td className="px-4 py-3">{fmtDate(c.valid_to)}</td>
                  <td className="px-4 py-3">{c.usage_limit}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        c.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {c.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-3">
                      <button className="text-blue-600 hover:text-blue-800" title="View">
                        👁
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-800" title="Edit">
                        ✏️
                      </button>
                      <button className="text-red-600 hover:text-red-800" title="Delete">
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
