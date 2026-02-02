import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/authContext';
import firebaseService from '../../services/firebaseApi';

const Cart = ({ onNavigate }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      onNavigate('login');
      return;
    }
    loadCart();
  }, [currentUser]);

  const loadCart = async () => {
    setLoading(true);
    const cartData = await firebaseService.getCart();
    setCart(cartData);
    setLoading(false);
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const result = await firebaseService.updateCartItem(itemId, newQuantity);
    if (result.success) {
      setCart(result.cart);
    }
  };

  const handleRemoveItem = async (itemId) => {
    const result = await firebaseService.removeFromCart(itemId);
    if (result.success) {
      setCart(result.cart);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-600"></div>
      </section>
    );
  }

  if (cart.length === 0) {
    return (
      <section className="py-16 bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className="text-2xl font-bold mb-4 text-gray-400">Your cart is empty</h2>
          <button
            onClick={() => onNavigate('shop')}
            className="px-8 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold transition-colors duration-300"
          >
            CONTINUE SHOPPING
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-green-400 to-orange-400 bg-clip-text text-transparent">
          SHOPPING CART
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div
                key={item.id}
                className="bg-gray-800 rounded-lg p-6 border border-green-600/20"
              >
                <div className="flex gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = '/placeholder.png';
                    }}
                  />

                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{item.product.name}</h3>
                    <p className="text-gray-400 text-sm mb-2">Size: {item.size}</p>
                    <p className="text-green-400 font-bold text-lg">
                      K{item.product.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>

                    <div className="flex items-center gap-2 bg-gray-900 rounded-lg">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-2 hover:bg-gray-700 rounded-l-lg"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 font-bold">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-2 hover:bg-gray-700 rounded-r-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6 border border-green-600/30 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal ({cart.length} items)</span>
                  <span>K{calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span>K50.00</span>
                </div>
                <div className="border-t border-gray-700 pt-3"></div>
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-green-400">K{(calculateTotal() + 50).toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('checkout')}
                className="w-full py-3 bg-gradient-to-r from-green-600 to-orange-600 rounded-lg font-bold text-white hover:from-green-700 hover:to-orange-700 transition-all duration-300 mb-4"
              >
                PROCEED TO CHECKOUT
              </button>

              <button
                onClick={() => onNavigate('shop')}
                className="w-full py-3 bg-transparent border-2 border-green-600 text-green-400 rounded-lg font-bold hover:bg-green-600 hover:text-white transition-all duration-300"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;