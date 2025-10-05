"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const userData = localStorage.getItem("adminUser");

    if (!token) {
      router.push("/admin/login");
    } else {
      setUser(userData ? JSON.parse(userData) : null);
    }
  }, [router]);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 bg-white shadow-md transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0`}
      >
        <div className="p-4 text-2xl font-bold border-b">Admin</div>
        <nav className="p-4 space-y-2">
          <a href="/admin/dashboard" className="block p-2 rounded hover:bg-gray-200">
            Dashboard
          </a>
          <a href="/admin/brands" className="block p-2 rounded hover:bg-gray-200">
            Brands
          </a>
          <a href="/admin/categories" className="block p-2 rounded hover:bg-gray-200">
            Categories
          </a>

          <a href="/admin/products" className="block p-2 rounded hover:bg-gray-200">
            Products
          </a>
          <a href="/admin/sizes" className="block p-2 rounded hover:bg-gray-200">
            Sizes
          </a>

          <a href="/admin/orders" className="block p-2 rounded hover:bg-gray-200">
            Orders
          </a>
          <a href="/admin/users" className="block p-2 rounded hover:bg-gray-200">
            Users
          </a>
          <a href="/admin/reports" className="block p-2 rounded hover:bg-gray-200">
            Reports
          </a>
          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              localStorage.removeItem("adminUser");
              router.push("/admin/login");
            }}
            className="mt-6 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="flex justify-between items-center bg-white p-4 shadow">
          <div className="flex items-center space-x-2">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-md hover:bg-gray-200"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg
                className="h-6 w-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-xl font-semibold">Admin Panel</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden sm:block text-gray-600">
              {user?.name || "Admin User"}
            </span>
            <Image
              src={"/profile.jpg"}
              alt="profile"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
