// // Sample products data - in real app, this would come from your API
// import 
// const sampleProducts = [
//   {
//     id: '1',
//     name: 'Classic White T-Shirt',
//     price: 29.99,
//     image: 'jeans.webp',
//     description: 'Comfortable and versatile white t-shirt made from 100% organic cotton.',
//     category: 'Clothing'
//   },
//   {
//     id: '2',
//     name: 'Denim Jacket',
//     price: 89.99,
//     image: 'electronics.jpg',
//     description: 'Vintage-style denim jacket with a comfortable fit and durable construction.',
//     category: 'Clothing'
//   },
//   {
//     id: '3',
//     name: 'Running Shoes',
//     price: 129.99,
//     image: 'shoes.jpg',
//     description: 'Lightweight running shoes with excellent cushioning and support.',
//     category: 'Footwear'
//   },
//   // Add more sample products as needed
// ];

// export default function ShopPage() {
//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <h1 className="text-3xl font-bold text-gray-900 mb-8">Shop All Products</h1>
      
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {sampleProducts.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// }