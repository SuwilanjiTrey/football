// src/components/shop/shop.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/authContext';
import firebaseService from '../../services/firebaseApi';

const Shop = ({ onNavigate }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'jerseys', name: 'Jerseys' },
    { id: 'training', name: 'Training Gear' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'equipment', name: 'Equipment' }
  ];

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, products]);

  const loadProducts = async () => {
    setLoading(true);
    const data = await firebaseService.getProducts();
    setProducts(data);
    setLoading(false);
  };

  const handleAddToCart = async (product) => {
    if (!currentUser) {
      onNavigate('login');
      return;
    }

    const result = await firebaseService.addToCart(product.id, 1, product.sizes[0]);
    if (result.success) {
      alert('Added to cart!');
    }
  };

  return (
    <section className="py-16 bg-gray-900 relative min-h-screen">
      <div className="container mx-auto px-4 mt-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            OFFICIAL STORE
          </h1>
          <p className="text-gray-400 text-lg">Get your authentic ZPL merchandise</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-4 top-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-green-600 to-orange-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Cart Button */}
        {currentUser && (
          <div className="mb-8 flex justify-end">
            <button
              onClick={() => onNavigate('cart')}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold flex items-center gap-2 transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              VIEW CART
            </button>
          </div>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group border border-green-600/20 hover:border-green-600/50"
              >
                <div className="h-64 bg-gray-700 relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = '/placeholder.png';
                    }}
                  />
                  {product.featured && (
                    <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      FEATURED
                    </div>
                  )}
                  {product.stock < 10 && (
                    <div className="absolute bottom-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      ONLY {product.stock} LEFT
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{product.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-green-400">
                      K{product.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">
                      Stock: {product.stock}
                    </span>
                  </div>

                  <div className="flex gap-2 mb-4 flex-wrap">
                    {product.sizes.map(size => (
                      <span
                        key={size}
                        className="px-3 py-1 bg-gray-700 rounded text-xs font-semibold"
                      >
                        {size}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${
                      product.stock === 0
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {product.stock === 0 ? 'OUT OF STOCK' : 'ADD TO CART'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-green-600 opacity-5 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-orange-600 opacity-5 animate-pulse"></div>
      </div>
    </section>
  );
};

export default Shop;
