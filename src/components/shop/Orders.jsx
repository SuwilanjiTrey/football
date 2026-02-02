import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/authContext';
import firebaseService from '../../services/firebaseApi';

const Orders = ({ onNavigate }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      onNavigate('login');
      return;
    }
    loadOrders();
  }, [currentUser]);

  const loadOrders = async () => {
    setLoading(true);
    const ordersData = await firebaseService.getOrders();
    // Sort by most recent first
    ordersData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setOrders(ordersData);
    setLoading(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-600/20 text-yellow-400 border-yellow-600';
      case 'processing':
        return 'bg-blue-600/20 text-blue-400 border-blue-600';
      case 'shipped':
        return 'bg-purple-600/20 text-purple-400 border-purple-600';
      case 'delivered':
        return 'bg-green-600/20 text-green-400 border-green-600';
      case 'cancelled':
        return 'bg-red-600/20 text-red-400 border-red-600';
      default:
        return 'bg-gray-600/20 text-gray-400 border-gray-600';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-600"></div>
      </section>
    );
  }

  if (orders.length === 0) {
    return (
      <section className="py-16 bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h2 className="text-2xl font-bold mb-4 text-gray-400">No orders yet</h2>
          <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
          <button
            onClick={() => onNavigate('shop')}
            className="px-8 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold transition-colors duration-300"
          >
            START SHOPPING
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-orange-400 bg-clip-text text-transparent">
            MY ORDERS
          </h1>
          <button
            onClick={() => onNavigate('shop')}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold transition-colors duration-300"
          >
            CONTINUE SHOPPING
          </button>
        </div>

        <div className="space-y-4">
          {orders.map(order => (
            <div
              key={order.id}
              className="bg-gray-800 rounded-lg border border-green-600/20 overflow-hidden"
            >
              {/* Order Header */}
              <div className="p-6 border-b border-gray-700 bg-gray-800/50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Order ID</div>
                    <div className="font-bold text-lg">{order.id}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Date</div>
                    <div className="font-semibold">{formatDate(order.createdAt)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Total</div>
                    <div className="font-bold text-xl text-green-400">
                      K{order.total.toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <span className={`px-4 py-2 rounded-full text-sm font-bold border ${getStatusColor(order.status)}`}>
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <h3 className="text-lg font-bold mb-4">Items</h3>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex gap-4 p-4 bg-gray-900 rounded-lg">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded"
                        onError={(e) => {
                          e.target.src = '/placeholder.png';
                        }}
                      />
                      <div className="flex-1">
                        <div className="font-bold">{item.product.name}</div>
                        <div className="text-sm text-gray-400">
                          Size: {item.size} • Quantity: {item.quantity}
                        </div>
                        <div className="text-green-400 font-bold mt-1">
                          K{(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping Info */}
                <div className="mt-6 p-4 bg-gray-900 rounded-lg">
                  <h4 className="font-bold mb-3">Shipping Address</h4>
                  <div className="text-gray-400 text-sm space-y-1">
                    <div>{order.fullName}</div>
                    <div>{order.address}</div>
                    <div>{order.city}, {order.province}</div>
                    {order.postalCode && <div>{order.postalCode}</div>}
                    <div className="mt-2">
                      <span className="font-semibold text-white">Phone:</span> {order.phone}
                    </div>
                    <div>
                      <span className="font-semibold text-white">Payment:</span> {order.paymentMethod}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Orders;