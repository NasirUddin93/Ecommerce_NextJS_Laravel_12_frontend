"use client"
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { localBaseUrl } from "../common/http";
import { apiUrl } from "../common/http";
import { adminToken } from "../common/http";
import { useEffect } from "react";
import { useCart } from "../contexts/CartContext";


// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   originalPrice?: number;
//   rating: number;
//   reviewCount: number;
//   image: string;
//   isNew?: boolean;
//   isOnSale?: boolean;
// }

interface Product {
  id: number;
  category_id: number;
  brand_id: number;
  name: string;
  sku: string;
  description: string;
  base_price: number;
  stock_quantity: number;
  weight: number;
  is_seasonal: boolean;
  seasonal_start_date: Date;
  seasonal_end_date: Date;
  images?: { image_url: string }[];
}


export default function FeaturedProducts(){

  const { addToCart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);


  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http')) return imageUrl;
    if (imageUrl.startsWith('/storage/')) return `${localBaseUrl}${imageUrl}`;
    return `${localBaseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${apiUrl}/products`, {
        headers: { Authorization: `Bearer ${adminToken()}` },
      });
      const data = await res.json();
      console.log(data);
      setProducts(data.data || data);        
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      // setLoading(false);
    }
  };

    const handleAddToCart = () => {
    addToCart(products);
    // You can add additional feedback here (toast, notification, etc.)
  };

    // Fetch all products
    useEffect(() => {
      fetchProducts();
    }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

    return (

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600">
              Check out our most popular items
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {
                products.map((product)=>(

              <div key={product.id}                
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden group"
              >
                <div className="relative aspect-square bg-gray-100">
                {/* <img
                  src={getImageUrl(product.images[0].image_url)}
                  alt="Jeans"
                  className="object-cover object-[0%_0%] group-hover:scale-105 transition-transform"
                /> */}
                        {product.images && product.images.length > 0 ? (
                    <img
                      src={getImageUrl(product.images[0].image_url)}
                      alt={product.name}
                      className="object-cover object-[0%_0%] w-full h-full group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-400">
                      No Image
                    </div>
                  )}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {product.id && (
                      <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        NEW
                      </span>
                    )}
                    {product.is_seasonal && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        SALE
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-3">
                    {product.name}
                  </h3>

                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {renderStars(4)}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {product.base_price}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">
                        {product.base_price}
                      </span>
                      {product.base_price && (
                        <span className="text-sm text-gray-500 line-through">
                          {product.base_price}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={handleAddToCart}
                     className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
                  

                ))
              }

            
          </div>

          <div className="text-center mt-12">
            <Link
              href="/shop"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    );
}



// "use client"
// import { Star } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { localBaseUrl, apiUrl, adminToken } from "../common/http";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// interface Product {
//   id: number;
//   category_id: number;
//   brand_id: number;
//   name: string;
//   sku: string;
//   description: string;
//   base_price: number;
//   stock_quantity: number;
//   weight: number;
//   is_seasonal: boolean;
//   seasonal_start_date: Date;
//   seasonal_end_date: Date;
//   images?: { image_url: string }[];
// }

// interface PaginationMeta {
//   current_page: number;
//   last_page: number;
//   per_page: number;
//   total: number;
//   from: number;
//   to: number;
// }

// export default function FeaturedProducts() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [paginationMeta, setPaginationMeta] = useState<PaginationMeta | null>(null);

//   const getImageUrl = (imageUrl: string) => {
//     if (!imageUrl) return '';
//     if (imageUrl.startsWith('http')) return imageUrl;
//     if (imageUrl.startsWith('/storage/')) return `${localBaseUrl}${imageUrl}`;
//     return `${localBaseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
//   };

//   const fetchProducts = async (page: number = 1) => {
//     try {
//       setLoading(true);
//       const res = await fetch(`${apiUrl}/products?page=${page}`, {
//         headers: { Authorization: `Bearer ${adminToken()}` },
//       });
//       const data = await res.json();
//       console.log(data);
      
//       // Handle different API response structures
//       if (data.data) {
//         setProducts(data.data);
//         setPaginationMeta(data.meta || {
//           current_page: data.current_page || page,
//           last_page: data.last_page || 1,
//           per_page: data.per_page || 12,
//           total: data.total || data.data.length,
//           from: data.from || 1,
//           to: data.to || data.data.length
//         });
//         setTotalPages(data.meta?.last_page || data.last_page || 1);
//       } else {
//         setProducts(data);
//         setPaginationMeta(null);
//         setTotalPages(1);
//       }
//     } catch (err) {
//       console.error("Error fetching products:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts(currentPage);
//   }, [currentPage]);

//   const handlePageChange = (page: number) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const renderStars = (rating: number) => {
//     return Array.from({ length: 5 }).map((_, index) => (
//       <Star
//         key={index}
//         className={`h-4 w-4 ${
//           index < Math.floor(rating)
//             ? "text-yellow-400 fill-current"
//             : "text-gray-300"
//         }`}
//       />
//     ));
//   };

//   const renderPaginationButtons = () => {
//     const buttons = [];
//     const maxVisiblePages = 5;
    
//     let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
//     let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
//     // Adjust start page if we're near the end
//     if (endPage - startPage + 1 < maxVisiblePages) {
//       startPage = Math.max(1, endPage - maxVisiblePages + 1);
//     }

//     // Previous button
//     buttons.push(
//       <button
//         key="prev"
//         onClick={() => handlePageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//       >
//         <ChevronLeft className="h-4 w-4" />
//       </button>
//     );

//     // First page
//     if (startPage > 1) {
//       buttons.push(
//         <button
//           key={1}
//           onClick={() => handlePageChange(1)}
//           className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
//         >
//           1
//         </button>
//       );
//       if (startPage > 2) {
//         buttons.push(
//           <span key="ellipsis1" className="px-2 py-2 text-gray-500">
//             ...
//           </span>
//         );
//       }
//     }

//     // Page numbers
//     for (let page = startPage; page <= endPage; page++) {
//       buttons.push(
//         <button
//           key={page}
//           onClick={() => handlePageChange(page)}
//           className={`px-3 py-2 rounded-lg border transition-colors ${
//             currentPage === page
//               ? 'border-blue-600 bg-blue-600 text-white'
//               : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
//           }`}
//         >
//           {page}
//         </button>
//       );
//     }

//     // Last page
//     if (endPage < totalPages) {
//       if (endPage < totalPages - 1) {
//         buttons.push(
//           <span key="ellipsis2" className="px-2 py-2 text-gray-500">
//             ...
//           </span>
//         );
//       }
//       buttons.push(
//         <button
//           key={totalPages}
//           onClick={() => handlePageChange(totalPages)}
//           className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
//         >
//           {totalPages}
//         </button>
//       );
//     }

//     // Next button
//     buttons.push(
//       <button
//         key="next"
//         onClick={() => handlePageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//       >
//         <ChevronRight className="h-4 w-4" />
//       </button>
//     );

//     return buttons;
//   };

//   return (
//     <section className="py-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">
//             Featured Products
//           </h2>
//           <p className="text-lg text-gray-600">
//             Check out our most popular items
//           </p>
//         </div>

//         {loading && (
//           <div className="text-center py-8">
//             <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <p className="mt-2 text-gray-600">Loading products...</p>
//           </div>
//         )}

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {products.map((product) => (
//             <div 
//               key={product.id}                
//               className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden group"
//             >
//               <div className="relative aspect-square bg-gray-100">
//                 {product.images && product.images.length > 0 ? (
//                   <img
//                     src={getImageUrl(product.images[0].image_url)}
//                     alt={product.name}
//                     className="object-cover object-[0%_0%] w-full h-full group-hover:scale-105 transition-transform"
//                   />
//                 ) : (
//                   <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-400">
//                     No Image
//                   </div>
//                 )}
//                 <div className="absolute top-3 left-3 flex gap-2">
//                   {product.id && (
//                     <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
//                       NEW
//                     </span>
//                   )}
//                   {product.is_seasonal && (
//                     <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
//                       SALE
//                     </span>
//                   )}
//                 </div>
//               </div>

//               <div className="p-4">
//                 <h3 className="font-semibold text-gray-900 mb-2 line-clamp-3">
//                   {product.name}
//                 </h3>

//                 <div className="flex items-center mb-2">
//                   <div className="flex items-center">
//                     {renderStars(4)}
//                   </div>
//                   <span className="text-sm text-gray-600 ml-2">
//                     ${product.base_price}
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-2">
//                     <span className="text-lg font-bold text-gray-900">
//                       ${product.base_price}
//                     </span>
//                     {product.base_price && (
//                       <span className="text-sm text-gray-500 line-through">
//                         ${product.base_price}
//                       </span>
//                     )}
//                   </div>
//                   <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="mt-12 flex flex-col items-center space-y-4">
//             {/* Pagination Info */}
//             {paginationMeta && (
//               <div className="text-sm text-gray-600">
//                 Showing {paginationMeta.from} to {paginationMeta.to} of {paginationMeta.total} products
//               </div>
//             )}
            
//             {/* Pagination Controls */}
//             <div className="flex items-center space-x-2">
//               {renderPaginationButtons()}
//             </div>
            
//             {/* Page Indicator */}
//             <div className="text-sm text-gray-500">
//               Page {currentPage} of {totalPages}
//             </div>
//           </div>
//         )}

//         <div className="text-center mt-12">
//           <Link
//             href="/shop"
//             className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
//           >
//             View All Products
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }