// import Image from "next/image";
// import Link from "next/link";

// export default function Home() {
//   return (
//     <div className="font-sans min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <section className="bg-gray-900 text-white py-20 px-6 text-center">
//         <h1 className="text-4xl sm:text-5xl font-bold mb-4">Shop the Latest Trends</h1>
//         <p className="text-lg sm:text-xl mb-6">Discover exclusive deals on fashion, electronics, and more.</p>
//         <Link
//           href="/shop"
//           className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold"
//         >
//           Shop Now
//         </Link>
//       </section>

//       {/* Categories */}
//       <section className="max-w-7xl mx-auto py-12 px-6">
//         <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//           {["Men", "Women", "Electronics", "Home"].map((cat) => (
//             <div
//               key={cat}
//               className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition"
//             >
//               <p className="text-lg font-semibold">{cat}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Featured Products */}
//       <section className="bg-white py-12 px-6">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {[1, 2, 3, 4].map((item) => (
//               <div
//                 key={item}
//                 className="border rounded-lg shadow-sm hover:shadow-lg transition"
//               >
//                 <Image
//                   src="/next.svg" // replace with product image
//                   alt="Product"
//                   width={300}
//                   height={200}
//                   className="w-full h-48 object-contain bg-gray-100 rounded-t-lg"
//                 />
//                 <div className="p-4">
//                   <h3 className="font-semibold text-lg">Product {item}</h3>
//                   <p className="text-gray-600">$29.99</p>
//                   <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Newsletter */}
//       <section className="bg-blue-600 text-white py-12 px-6 text-center">
//         <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
//         <p className="mb-6">Subscribe to our newsletter for exclusive offers.</p>
//         <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="px-4 py-2 rounded-md text-gray-900 w-full"
//           />
//           <button className="bg-black px-6 py-2 rounded-md hover:bg-gray-800">
//             Subscribe
//           </button>
//         </form>
//       </section>

//     </div>
//   );
// }


// app/page.tsx
"use client"
import Layout from "./components/Layouts";
import Image from "next/image";
import Link from "next/link";
// import { useState } from "react";
// import { localBaseUrl } from "./common/http";
// import { apiUrl } from "./common/http";
// import { adminToken } from "./common/http";
import { Star, Truck, Shield, RefreshCw } from "lucide-react";
// import { useEffect } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  isNew?: boolean;
  isOnSale?: boolean;
}

interface Category {
  name: string;
  image: string;
  itemCount: number;
}

export default function Home() {
    // const [products, setProducts] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [search, setSearch] = useState("");


  const featuredProducts: Product[] = [
    {
      id: 1,
      name: "Classic White T-Shirt",
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.5,
      reviewCount: 128,
      image: "/public/T-Shirt.webp",
      isOnSale: true,
    },
    {
      id: 2,
      name: "Slim Fit Jeans",
      price: 59.99,
      rating: 4.2,
      reviewCount: 89,
      image: "/public/jeans.webp",
      isNew: true,
    },
    {
      id: 3,
      name: "Wireless Headphones",
      price: 99.99,
      originalPrice: 129.99,
      rating: 4.8,
      reviewCount: 256,
      image: "/api/placeholder/300/300",
      isOnSale: true,
    },
    {
      id: 4,
      name: "Sports Running Shoes",
      price: 79.99,
      rating: 4.3,
      reviewCount: 167,
      image: "/api/placeholder/300/300",
    },
  ];

  const categories: Category[] = [
    { name: "Men's Fashion", image: "/public/men_fashon.jpg", itemCount: 234 },
    { name: "Women's Fashion", image: "/public/women_fashon.jpg", itemCount: 189 },
    { name: "Electronics", image: "/public/electronics.jpg", itemCount: 156 },
    { name: "Home & Living", image: "/public/home.webp", itemCount: 98 },
  ];

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free shipping on orders over $50",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% secure payment processing",
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "30-day return policy",
    },
  ];

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


  
    // const getImageUrl = (imageUrl: string) => {
    //   if (!imageUrl) return '';
    //   if (imageUrl.startsWith('http')) return imageUrl;
    //   if (imageUrl.startsWith('/storage/')) return `${localBaseUrl}${imageUrl}`;
    //   return `${localBaseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
    // };

    // const fetchProducts = async () => {
    //   try {
    //     const res = await fetch(`${apiUrl}/products`, {
    //       headers: { Authorization: `Bearer ${adminToken()}` },
    //     });
    //     const data = await res.json();
    //     setProducts(data.data || data);        
    //   } catch (err) {
    //     console.error("Error fetching products:", err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

      // Filter products by search text
  // const filteredProducts = products.filter((p) =>
  //   p.id.toLowerCase().includes(search.toLowerCase())
  // );

    // useEffect(()=>{
    //   fetchProducts();
    // });


  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Summer Sale Collection
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Up to 50% off on selected items
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
              >
                Shop Now
              </Link>
              <Link
                href="/sale"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-lg"
              >
                View Sale
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600">
              Discover products from our main categories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="aspect-square relative bg-gray-100">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {category.itemCount} items
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
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
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden group"
              >
                <div className="relative aspect-square bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {product.isNew && (
                      <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        NEW
                      </span>
                    )}
                    {product.isOnSale && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        SALE
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      ({product.reviewCount})
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
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

      {/* Newsletter Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-300 mb-8">
            Subscribe to our newsletter for exclusive offers and new product updates
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}