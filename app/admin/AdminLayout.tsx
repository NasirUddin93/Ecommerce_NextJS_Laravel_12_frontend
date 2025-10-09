// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link"; 

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const router = useRouter();
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     const token = localStorage.getItem("adminToken");
//     const userData = localStorage.getItem("adminUser");

//     if (!token) {
//       router.push("/admin/login");
//     } else {
//       setUser(userData ? JSON.parse(userData) : null);
//     }
//   }, [router]);

//   return (
//     <div className="min-h-screen flex bg-gray-100">
//       {/* Sidebar */}
//       <aside
//         className={`fixed inset-y-0 left-0 transform ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } w-64 bg-white shadow-md transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0`}
//       >
//         <div className="p-4 text-2xl font-bold border-b">Admin</div>
//         <nav className="p-4 space-y-2">
//           <Link href="/admin/dashboard" className="block p-2 rounded hover:bg-gray-200">
//             Dashboard
//           </Link>
//           <Link href="/admin/brands" className="block p-2 rounded hover:bg-gray-200">
//             Brands
//           </Link>
//           <Link href="/admin/categories" className="block p-2 rounded hover:bg-gray-200">
//             Categories
//           </Link>

//           <Link href="/admin/products" className="block p-2 rounded hover:bg-gray-200">
//             Products
//           </Link>

//           <Link href="/admin/product-variants" className="block p-2 rounded hover:bg-gray-200">
//             Products Variants
//           </Link>

//           <Link href="/admin/wishlist" className="block p-2 rounded hover:bg-gray-200">
//             Wishlist
//           </Link>
//           <Link href="/admin/discounts" className="block p-2 rounded hover:bg-gray-200">
//             Discounts
//           </Link>

//           <Link href="/admin/sizes" className="block p-2 rounded hover:bg-gray-200">
//             Sizes
//           </Link>
//           <Link href="/admin/coupons" className="block p-2 rounded hover:bg-gray-200">
//             Coupons
//           </Link>

//           <Link href="/admin/coupon-usages" className="block p-2 rounded hover:bg-gray-200">
//             Coupon Usages 
//           </Link>


//           <Link href="/admin/shipping-methods" className="block p-2 rounded hover:bg-gray-200">
//             Shipping methods  
//           </Link>

//           <Link href="/admin/order-shippings" className="block p-2 rounded hover:bg-gray-200">
//             Order Shippings  
//           </Link>

//           <Link href="/admin/orders" className="block p-2 rounded hover:bg-gray-200">
//             Orders
//           </Link>

//          <Link href="/admin/order-items" className="block p-2 rounded hover:bg-gray-200">
//             Order Items
//           </Link>


//           <Link href="/admin/reviews" className="block p-2 rounded hover:bg-gray-200">
//             Reviews 
//           </Link>

//          <Link href="/admin/notifications" className="block p-2 rounded hover:bg-gray-200">
//             Notifications 
//           </Link>


//           <Link href="/admin/users" className="block p-2 rounded hover:bg-gray-200">
//             Users
//           </Link>


//           <Link href="/admin/reports" className="block p-2 rounded hover:bg-gray-200">
//             Reports
//           </Link>


//           <Link href="/admin/payments" className="block p-2 rounded hover:bg-gray-200">
//             Payments 
//           </Link>

//           <Link href="/admin/transactions" className="block p-2 rounded hover:bg-gray-200">
//             Transactions 
//           </Link>


//           <Link href="/admin/inventory-log" className="block p-2 rounded hover:bg-gray-200">
//             Inventory Log
//           </Link>


//           <button
//             onClick={() => {
//               localStorage.removeItem("adminToken");
//               localStorage.removeItem("adminUser");
//               router.push("/admin/login");
//             }}
//             className="mt-6 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
//           >
//             Logout
//           </button>
//         </nav>
//       </aside>

//       {/* Main content */}
//       <div className="flex-1 flex flex-col">
//         {/* Topbar */}
//         <header className="flex justify-between items-center bg-white p-4 shadow">
//           <div className="flex items-center space-x-2">
//             {/* Mobile menu button */}
//             <button
//               className="lg:hidden p-2 rounded-md hover:bg-gray-200"
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//             >
//               <svg
//                 className="h-6 w-6 text-gray-700"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>
//             </button>
//             <h1 className="text-xl font-semibold">Admin Panel</h1>
//           </div>
//           <div className="flex items-center space-x-4">
//             <span className="hidden sm:block text-gray-600">
//               {user?.name || "Admin User"}
//             </span>
//             <Image
//               src={"/profile.jpg"}
//               alt="profile"
//               width={40}
//               height={40}
//               className="w-10 h-10 rounded-full"
//             />
//           </div>
//         </header>

//         {/* Dynamic Page Content */}
//         <main className="p-4 sm:p-6">{children}</main>
//       </div>
//     </div>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Tags,
  Truck,
  CreditCard,
  Users,
  MessageSquare,
  Bell,
  BarChart3,
  LogOut,
  ShoppingBag,
  Gift,
  FolderOpen,
  ClipboardList,
  Heart,
  Layers,
  ListOrdered,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const userData = localStorage.getItem("adminUser");

    if (!token) {
      router.push("/admin/login");
    } else {
      setUser(userData ? JSON.parse(userData) : null);
    }
  }, [router]);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      links: [{ href: "/admin/dashboard", label: "Overview" }],
    },
    {
      title: "Products",
      icon: Package,
      links: [
        { href: "/admin/brands", label: "Brands" },
        { href: "/admin/categories", label: "Categories" },
        { href: "/admin/products", label: "Products" },
        { href: "/admin/product-variants", label: "Product Variants" },
        { href: "/admin/sizes", label: "Sizes" },
        { href: "/admin/inventory-log", label: "Inventory Log" },
      ],
    },
    {
      title: "Promotions",
      icon: Gift,
      links: [
        { href: "/admin/discounts", label: "Discounts" },
        { href: "/admin/coupons", label: "Coupons" },
        { href: "/admin/coupon-usages", label: "Coupon Usages" },
      ],
    },
    {
      title: "Orders & Shipping",
      icon: Truck,
      links: [
        { href: "/admin/orders", label: "Orders" },
        { href: "/admin/order-items", label: "Order Items" },
        { href: "/admin/shipping-methods", label: "Shipping Methods" },
        { href: "/admin/order-shippings", label: "Order Shippings" },
      ],
    },
    {
      title: "Payments",
      icon: CreditCard,
      links: [
        { href: "/admin/payments", label: "Payments" },
        { href: "/admin/transactions", label: "Transactions" },
      ],
    },
    {
      title: "Users & Reviews",
      icon: Users,
      links: [
        { href: "/admin/users", label: "Users" },
        { href: "/admin/reviews", label: "Reviews" },
        { href: "/admin/wishlist", label: "Wishlist" },
      ],
    },
    {
      title: "Reports & Notifications",
      icon: BarChart3,
      links: [
        { href: "/admin/reports", label: "Reports" },
        { href: "/admin/notifications", label: "Notifications" },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 bg-white shadow-md transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 z-40`}
      >
        <div className="p-4 text-2xl font-bold border-b flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-blue-600" />
          <span>Admin Panel</span>
        </div>

        <nav className="p-4 space-y-2 overflow-y-auto">
          {menuItems.map((menu) => (
            <div key={menu.title}>
              <button
                onClick={() => toggleMenu(menu.title)}
                className="flex justify-between items-center w-full p-2 text-left rounded hover:bg-gray-100 font-semibold"
              >
                <div className="flex items-center gap-2">
                  <menu.icon className="w-5 h-5 text-gray-700" />
                  <span>{menu.title}</span>
                </div>
                <svg
                  className={`w-4 h-4 transform transition-transform ${
                    openMenu === menu.title ? "rotate-90" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {openMenu === menu.title && (
                <div className="pl-6 space-y-1 mt-1">
                  {menu.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block p-2 rounded text-sm transition ${
                        pathname === link.href
                          ? "bg-blue-100 text-blue-700 font-semibold"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              localStorage.removeItem("adminUser");
              router.push("/admin/login");
            }}
            className="mt-6 flex items-center justify-center gap-2 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
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
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
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

        {/* Page Content */}
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
