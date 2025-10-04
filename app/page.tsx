import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20 px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Shop the Latest Trends</h1>
        <p className="text-lg sm:text-xl mb-6">Discover exclusive deals on fashion, electronics, and more.</p>
        <Link
          href="/shop"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold"
        >
          Shop Now
        </Link>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {["Men", "Women", "Electronics", "Home"].map((cat) => (
            <div
              key={cat}
              className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition"
            >
              <p className="text-lg font-semibold">{cat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="border rounded-lg shadow-sm hover:shadow-lg transition"
              >
                <Image
                  src="/next.svg" // replace with product image
                  alt="Product"
                  width={300}
                  height={200}
                  className="w-full h-48 object-contain bg-gray-100 rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">Product {item}</h3>
                  <p className="text-gray-600">$29.99</p>
                  <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-blue-600 text-white py-12 px-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
        <p className="mb-6">Subscribe to our newsletter for exclusive offers.</p>
        <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-md text-gray-900 w-full"
          />
          <button className="bg-black px-6 py-2 rounded-md hover:bg-gray-800">
            Subscribe
          </button>
        </form>
      </section>

    </div>
  );
}
