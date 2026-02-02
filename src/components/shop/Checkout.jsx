// src/components/shop/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/authContext';
import firebaseService from '../../services/firebaseApi';

const Checkout = ({ onNavigate }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const { currentUser } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    paymentMethod: 'mobile-money'
  });

  useEffect(() => {
    if (!currentUser) {
      onNavigate('login');
      return;
    }
    loadCart();
  }, [currentUser, onNavigate]);

  const loadCart = async () => {
    setLoading(true);
    const cartData = await firebaseService.getCart();
    setCart(cartData);
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const orderData = {
      ...formData,
      items: cart,
      subtotal: calculateTotal(),
      shipping: 50,
      total: calculateTotal() + 50
    };

    const result = await firebaseService.createOrder(orderData);
    
    setProcessing(false);

    if (result.success) {
      alert('Order placed successfully!');
      onNavigate('orders');
    } else {
      alert('Error placing order. Please try again.');
    }
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
          CHECKOUT
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <div className="bg-gray-800 rounded-lg p-6 border border-green-600/20">
                <h2 className="text-2xl font-bold mb-6 text-green-400">Contact Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-300">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-300">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2 text-gray-300">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-gray-800 rounded-lg p-6 border border-green-600/20">
                <h2 className="text-2xl font-bold mb-6 text-green-400">Shipping Address</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-300">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-300">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-900 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-300">
                        Province *
                      </label>
                      <input
                        type="text"
                        name="province"
                        value={formData.province}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-900 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-300">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-900 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-gray-800 rounded-lg p-6 border border-green-600/20">
                <h2 className="text-2xl font-bold mb-6 text-green-400">Payment Method</h2>
                
                <div className="space-y-3">
                  <label className="flex items-center p-4 bg-gray-900 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="mobile-money"
                      checked={formData.paymentMethod === 'mobile-money'}
                      onChange={handleChange}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-bold">Mobile Money</div>
                      <div className="text-sm text-gray-400">MTN, Airtel, Zamtel</div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 bg-gray-900 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleChange}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-bold">Cash on Delivery</div>
                      <div className="text-sm text-gray-400">Pay when you receive</div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 bg-gray-900 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={formData.paymentMethod === 'bank'}
                      onChange={handleChange}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-bold">Bank Transfer</div>
                      <div className="text-sm text-gray-400">Direct bank payment</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-lg p-6 border border-green-600/30 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => {
                          e.target.src = '/placeholder.png';
                        }}
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{item.product.name}</div>
                        <div className="text-xs text-gray-400">
                          Size: {item.size} × {item.quantity}
                        </div>
                        <div className="text-green-400 font-bold text-sm">
                          K{(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-700 pt-4 space-y-3 mb-6">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
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
                  type="submit"
                  disabled={processing}
                  className="w-full py-3 bg-gradient-to-r from-green-600 to-orange-600 rounded-lg font-bold text-white hover:from-green-700 hover:to-orange-700 transition-all duration-300 disabled:opacity-50"
                >
                  {processing ? 'PROCESSING...' : 'PLACE ORDER'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Checkout;
