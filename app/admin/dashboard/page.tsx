// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";




// export default function DashboardPage() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//     const router = useRouter();
//   const [user, setUser] = useState<any>(null);

//     useEffect(() => {
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
//           <a href="/dashboard" className="block p-2 rounded hover:bg-gray-200">
//             Dashboard
//           </a>
//           <a href="/admin/brands" className="block p-2 rounded hover:bg-gray-200">
//             Brands
//           </a>
//           <a href="/admin/products" className="block p-2 rounded hover:bg-gray-200">
//             Products
//           </a>
//           <a href="/admin/orders" className="block p-2 rounded hover:bg-gray-200">
//             Orders
//           </a>
//           <a href="/admin/users" className="block p-2 rounded hover:bg-gray-200">
//             Users
//           </a>
//           <a href="/admin/reports" className="block p-2 rounded hover:bg-gray-200">
//             Reports
//           </a>
//           <button
//             onClick={() => {
//               localStorage.removeItem("adminToken");
//               localStorage.removeItem("adminUser");
//               router.push("/admin/login");
//             }}
//             className="mt-6 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
//           >
//           Logout
//         </button>
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
//             <h1 className="text-xl font-semibold">Dashboard</h1>
//           </div>
//           <div className="flex items-center space-x-4">
//             <span className="hidden sm:block text-gray-600">Admin User</span>
//             <Image
//               src={"/profile.jpg"}
//               alt="profile"
//               width={40}
//               height={40}
//               className="w-10 h-10 rounded-full"
//             />
//           </div>
//         </header>

//         {/* Content */}
//         <main className="p-4 sm:p-6">
//           {/* Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             <div className="bg-white p-6 rounded-xl shadow">
//               <h2 className="text-lg font-semibold">Total Products</h2>
//               <p className="text-2xl font-bold mt-2">120</p>
//             </div>
//             <div className="bg-white p-6 rounded-xl shadow">
//               <h2 className="text-lg font-semibold">Total Orders</h2>
//               <p className="text-2xl font-bold mt-2">350</p>
//             </div>
//             <div className="bg-white p-6 rounded-xl shadow">
//               <h2 className="text-lg font-semibold">Revenue</h2>
//               <p className="text-2xl font-bold mt-2">$12,400</p>
//             </div>
//           </div>

//           {/* Table */}
//           <div className="bg-white mt-6 p-4 sm:p-6 rounded-xl shadow overflow-x-auto">
//             <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
//             <table className="w-full text-left border-collapse text-sm sm:text-base">
//               <thead>
//                 <tr>
//                   <th className="border-b p-2">Order ID</th>
//                   <th className="border-b p-2">Customer</th>
//                   <th className="border-b p-2">Amount</th>
//                   <th className="border-b p-2">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="border-b p-2">#1001</td>
//                   <td className="border-b p-2">John Doe</td>
//                   <td className="border-b p-2">$250</td>
//                   <td className="border-b p-2 text-green-600">Completed</td>
//                 </tr>
//                 <tr>
//                   <td className="border-b p-2">#1002</td>
//                   <td className="border-b p-2">Jane Smith</td>
//                   <td className="border-b p-2">$180</td>
//                   <td className="border-b p-2 text-yellow-600">Pending</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }


"use client";

import AdminLayout from "../AdminLayout";

export default function DashboardPage() {
  return (
    <AdminLayout>
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Total Products</h2>
          <p className="text-2xl font-bold mt-2">120</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-2xl font-bold mt-2">350</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Revenue</h2>
          <p className="text-2xl font-bold mt-2">$12,400</p>
        </div>
      </div>
    </AdminLayout>
  );
}
