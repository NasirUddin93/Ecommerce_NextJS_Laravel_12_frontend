// app/orders/page.tsx
"use client";
import Link from "next/link";

export default function OrdersPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Orders</h1>
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    </div>
  );
}