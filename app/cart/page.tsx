"use client";

import { useCart } from '../contexts/CartContext';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { getImageUrl } from '../common/http';

export default function CartPage() {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    clearCart 
  } = useCart();

  // Safe price conversion function
  const getSafePrice = (price: any): number => {
    const numPrice = Number(price);
    return isNaN(numPrice) ? 0 : numPrice;
  };

  // Safe toFixed function
  const formatPrice = (price: any): string => {
    return getSafePrice(price).toFixed(2);
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-24 w-24 text-gray-400" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Your cart is empty</h2>
          <p className="mt-2 text-gray-600">Start shopping to add items to your cart</p>
          <Link
            href="/"
            className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border">
            {cartItems.map((item) => {
              const itemPrice = getSafePrice(item.product.base_price);
              const itemTotal = itemPrice * item.quantity;
              
              return (
                <div
                  key={item.product.id}
                  className="flex items-center space-x-4 p-6 border-b last:border-b-0"
                >
                  <img
                    src={item.product.images && item.product.images.length > 0 
                      ? getImageUrl(item.product.images[0].image_url) 
                      : '/placeholder-image.jpg'}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.product.name}
                    </h3>
                    <p className="text-gray-600">${formatPrice(item.product.base_price)}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    
                    <span className="w-8 text-center font-semibold">
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-semibold">
                      ${itemTotal.toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-600 hover:text-red-800 mt-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={clearCart}
            className="mt-4 text-red-600 hover:text-red-800 font-medium"
          >
            Clear Cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm border p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
            </div>
            <div className="border-t pt-3 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${(getCartTotal() * 1.1).toFixed(2)}</span>
            </div>
          </div>

          {/* <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
            Proceed to Checkout
          </button> */}

          {/* // In your CartPage component, replace the checkout button: */}
        <Link
          href="/checkout"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors text-center block"
        >
          Proceed to Checkout
        </Link>
          
          <Link
            href="/"
            className="block text-center mt-4 text-blue-600 hover:text-blue-800 font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}