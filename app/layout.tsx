// "use client";

// import "./globals.css";
// import Link from "next/link";
// import { useState } from "react";




// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <html lang="en">
//       <body>

//         <header className="bg-gray-800 text-white shadow-md">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center h-16">
//               {/* Logo / Title */}
//               <h1 className="text-2xl font-bold">My Portfolio</h1>

//               {/* Desktop Nav */}
//               <nav className="hidden md:flex space-x-6">
//                 <Link href="/" className="hover:text-blue-400">Home</Link>
//                 <Link href="/shop" className="hover:text-blue-400">Shop</Link>
//                 <Link href="/categories" className="hover:text-blue-400">Categories</Link>
//                 <Link href="/offers" className="hover:text-blue-400">Offers</Link>
//                 <Link href="/new-arrivals" className="hover:text-blue-400">New Arrivals</Link>
//                 <Link href="/best-sellers" className="hover:text-blue-400">Best Sellers</Link>
//                 <Link href="/about" className="hover:text-blue-400">About</Link>
//                 <Link href="/contact" className="hover:text-blue-400">Contact</Link>
//                 <Link href="/admin/login" className="hover:text-blue-400">login</Link>
//               </nav>

//               {/* Mobile Hamburger */}
//               <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="md:hidden text-gray-200 hover:text-white focus:outline-none"
//               >
//                 {isOpen ? (
//                   <span className="text-2xl">✖</span>
//                 ) : (
//                   <span className="text-2xl">☰</span>
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Dropdown */}
//           {isOpen && (
//             <nav className="md:hidden bg-gray-700 px-4 py-3 space-y-2">
//               <Link href="/" className="block hover:text-blue-400">Home</Link>
//               <Link href="/shop" className="block hover:text-blue-400">Shop</Link>
//               <Link href="/categories" className="block hover:text-blue-400">Categories</Link>
//               <Link href="/offers" className="block hover:text-blue-400">Offers</Link>
//               <Link href="/new-arrivals" className="block hover:text-blue-400">New Arrivals</Link>
//               <Link href="/best-sellers" className="block hover:text-blue-400">Best Sellers</Link>
//               <Link href="/about" className="block hover:text-blue-400">About</Link>
//               <Link href="/contact" className="block hover:text-blue-400">Contact</Link>
//               <Link href="/admin/login" className="block hover:text-blue-400">login</Link>
//             </nav>
//           )}
//         </header>

//         {/* Main Content */}
//         <main className="container mx-auto p-6">{children}</main>

//         {/* Footer */}
//         <footer className="bg-gray-800 text-white text-center p-4 mt-10">
//           <p>© 2025 My Portfolio. All rights reserved.</p>
//         </footer>
//       </body>
//     </html>
//   );
// }


//app/layout.tsx
// import { CartProvider } from './contexts/CartContext';
// import "./globals.css";
// import { ReactNode } from "react";

// interface RootLayoutProps {
//   children: ReactNode;
// }

// export default function RootLayout({ children }: RootLayoutProps) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   );
// }


// import { CartProvider } from '@/contexts/CartContext';
import { CartProvider } from './contexts/CartContext';
// import Layout from '@/components/Layout';
import Layout from './components/Layouts';
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Layout>{children}</Layout>
        </CartProvider>
      </body>
    </html>
  );
}