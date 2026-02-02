import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/authContext';
import firebaseService from '../../services/firebaseApi';

const AdminDashboard = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, isAdmin } = useAuth();

  // Product form state
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    category: 'jerseys',
    description: '',
    image: '',
    stock: '',
    sizes: 'S,M,L,XL',
    featured: false
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    if (!currentUser || !isAdmin()) {
      onNavigate('home');
      return;
    }
    loadData();
  }, [currentUser, activeTab]);

  const loadData = async () => {
    setLoading(true);
    
    if (activeTab === 'products') {
      const data = await firebaseService.getProducts();
      setProducts(data);
    } else if (activeTab === 'orders') {
      const data = await firebaseService.getOrders();
      setOrders(data);
    } else if (activeTab === 'users') {
      const data = await firebaseService.getUsers();
      setUsers(data);
    }
    
    setLoading(false);
  };

  // Product Management
  const handleProductFormChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setProductForm({
      ...productForm,
      [e.target.name]: value
    });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    
    const productData = {
      ...productForm,
      price: parseFloat(productForm.price),
      stock: parseInt(productForm.stock),
      sizes: productForm.sizes.split(',').map(s => s.trim())
    };

    let result;
    if (editingProduct) {
      result = await firebaseService.updateProduct(editingProduct.id, productData);
    } else {
      result = await firebaseService.addProduct(productData);
    }

    if (result.success) {
      setProductForm({
        name: '',
        price: '',
        category: 'jerseys',
        description: '',
        image: '',
        stock: '',
        sizes: 'S,M,L,XL',
        featured: false
      });
      setEditingProduct(null);
      loadData();
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      description: product.description,
      image: product.image,
      stock: product.stock.toString(),
      sizes: product.sizes.join(','),
      featured: product.featured
    });
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await firebaseService.deleteProduct(id);
      loadData();
    }
  };

  // Order Management
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    await firebaseService.updateOrderStatus(orderId, newStatus);
    loadData();
  };

  // User Management
  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await firebaseService.deleteUser(userId);
      loadData();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-600';
      case 'processing':
        return 'bg-blue-600';
      case 'shipped':
        return 'bg-purple-600';
      case 'delivered':
        return 'bg-green-600';
      case 'cancelled':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <section className="py-16 bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 to-orange-400 bg-clip-text text-transparent">
            ADMIN DASHBOARD
          </h1>
          <p className="text-gray-400">Manage your ZPL store</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {['products', 'orders', 'users'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-green-600 to-orange-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Product Form */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-lg p-6 border border-green-600/30 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <form onSubmit={handleProductSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Product Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={productForm.name}
                      onChange={handleProductFormChange}
                      required
                      className="w-full px-4 py-2 bg-gray-900 rounded text-white focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Price (K) *</label>
                    <input
                      type="number"
                      name="price"
                      value={productForm.price}
                      onChange={handleProductFormChange}
                      required
                      step="0.01"
                      className="w-full px-4 py-2 bg-gray-900 rounded text-white focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Category *</label>
                    <select
                      name="category"
                      value={productForm.category}
                      onChange={handleProductFormChange}
                      required
                      className="w-full px-4 py-2 bg-gray-900 rounded text-white focus:outline-none focus:ring-2 focus:ring-green-600"
                    >
                      <option value="jerseys">Jerseys</option>
                      <option value="training">Training Gear</option>
                      <option value="accessories">Accessories</option>
                      <option value="equipment">Equipment</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Description *</label>
                    <textarea
                      name="description"
                      value={productForm.description}
                      onChange={handleProductFormChange}
                      required
                      rows="3"
                      className="w-full px-4 py-2 bg-gray-900 rounded text-white focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Image URL *</label>
                    <input
                      type="text"
                      name="image"
                      value={productForm.image}
                      onChange={handleProductFormChange}
                      required
                      className="w-full px-4 py-2 bg-gray-900 rounded text-white focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Stock *</label>
                    <input
                      type="number"
                      name="stock"
                      value={productForm.stock}
                      onChange={handleProductFormChange}
                      required
                      className="w-full px-4 py-2 bg-gray-900 rounded text-white focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Sizes (comma-separated) *</label>
                    <input
                      type="text"
                      name="sizes"
                      value={productForm.sizes}
                      onChange={handleProductFormChange}
                      required
                      placeholder="S,M,L,XL"
                      className="w-full px-4 py-2 bg-gray-900 rounded text-white focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={productForm.featured}
                      onChange={handleProductFormChange}
                      className="mr-2"
                    />
                    <label className="text-sm font-semibold">Featured Product</label>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-green-600 hover:bg-green-700 rounded font-bold transition-colors"
                    >
                      {editingProduct ? 'UPDATE' : 'ADD PRODUCT'}
                    </button>
                    {editingProduct && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProduct(null);
                          setProductForm({
                            name: '',
                            price: '',
                            category: 'jerseys',
                            description: '',
                            image: '',
                            stock: '',
                            sizes: 'S,M,L,XL',
                            featured: false
                          });
                        }}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded font-bold transition-colors"
                      >
                        CANCEL
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Products List */}
            <div className="lg:col-span-2">
              {loading ? (
                <div className="flex justify-center py-20">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-600"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {products.map(product => (
                    <div key={product.id} className="bg-gray-800 rounded-lg p-6 border border-green-600/20">
                      <div className="flex gap-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-24 h-24 object-cover rounded"
                          onError={(e) => {
                            e.target.src = '/placeholder.png';
                          }}
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-bold">{product.name}</h3>
                              <p className="text-gray-400 text-sm">{product.category}</p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditProduct(product)}
                                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold"
                              >
                                EDIT
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm font-bold"
                              >
                                DELETE
                              </button>
                            </div>
                          </div>
                          <p className="text-gray-400 text-sm mt-2">{product.description}</p>
                          <div className="flex items-center gap-4 mt-3">
                            <span className="text-green-400 font-bold">K{product.price.toFixed(2)}</span>
                            <span className="text-gray-400">Stock: {product.stock}</span>
                            {product.featured && (
                              <span className="px-2 py-1 bg-orange-600 rounded text-xs font-bold">FEATURED</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-600"></div>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-20 text-gray-400">No orders yet</div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="bg-gray-800 rounded-lg border border-green-600/20">
                    <div className="p-6 border-b border-gray-700">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <div className="text-sm text-gray-400">Order ID</div>
                          <div className="font-bold">{order.id}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Customer</div>
                          <div className="font-semibold">{order.fullName}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Total</div>
                          <div className="font-bold text-green-400">K{order.total.toFixed(2)}</div>
                        </div>
                        <div>
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                            className={`px-4 py-2 rounded font-bold ${getStatusColor(order.status)} text-white`}
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-bold mb-2">Items</h4>
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="text-sm text-gray-400">
                                {item.product.name} - {item.size} × {item.quantity}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold mb-2">Shipping Info</h4>
                          <div className="text-sm text-gray-400 space-y-1">
                            <div>{order.address}</div>
                            <div>{order.city}, {order.province}</div>
                            <div>Phone: {order.phone}</div>
                            <div>Payment: {order.paymentMethod}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-600"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map(user => (
                  <div key={user.id} className="bg-gray-800 rounded-lg p-6 border border-green-600/20">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold">{user.name}</h3>
                        <p className="text-sm text-gray-400">{user.email}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        user.role === 'admin' ? 'bg-orange-600' : 'bg-blue-600'
                      }`}>
                        {user.role.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400 mb-4">
                      <div>Phone: {user.phone || 'N/A'}</div>
                      <div>Joined: {new Date(user.createdAt).toLocaleDateString()}</div>
                    </div>
                    {user.role !== 'admin' && (
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="w-full py-2 bg-red-600 hover:bg-red-700 rounded font-bold text-sm transition-colors"
                      >
                        DELETE USER
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminDashboard;