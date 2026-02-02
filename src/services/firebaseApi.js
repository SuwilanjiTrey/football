// Mock Firebase Service
// This simulates Firebase operations using localStorage
// Replace with actual Firebase SDK when ready

class FirebaseService {
  constructor() {
    this.storageKeys = {
      users: 'zpl_users',
      products: 'zpl_products',
      orders: 'zpl_orders',
      cart: 'zpl_cart',
      news: 'zpl_news',
      matches: 'zpl_matches',
      players: 'zpl_players'
    };
    this.currentUser = null;
    this.initializeData();
  }

  // Initialize with sample data if empty
  initializeData() {
    if (!localStorage.getItem(this.storageKeys.products)) {
      const sampleProducts = [
        {
          id: '1',
          name: 'Power Dynamos FC Jersey',
          price: 450,
          category: 'jerseys',
          description: 'Official Power Dynamos FC home jersey with pride colors',
          image: '/football/shop/power_dynamos.jpeg',
          stock: 50,
          sizes: ['S', 'M', 'L', 'XL', 'XXL'],
          featured: true,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Kabwe Warriors Away Jersey',
          price: 450,
          category: 'jerseys',
          description: 'Official away jersey in blue and black',
          image: '/football/shop/kabwe_warriors_away.jpg',
          stock: 45,
          sizes: ['S', 'M', 'L', 'XL', 'XXL'],
          featured: true,
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Soccer boots',
          price: 180,
          category: 'training',
          description: 'Professional training boots',
          image: '/football/shop/boots.jpeg',
          stock: 100,
          sizes: ['S', 'M', 'L', 'XL'],
          featured: false,
          createdAt: new Date().toISOString()
        },
        {
          id: '4',
          name: 'Zambian Scarf',
          price: 120,
          category: 'accessories',
          description: 'Show your support with official ZPL scarf',
          image: '/football/shop/scarf.jpeg',
          stock: 200,
          sizes: ['One Size'],
          featured: false,
          createdAt: new Date().toISOString()
        },
        {
          id: '5',
          name: 'Match Ball - Official',
          price: 350,
          category: 'equipment',
          description: 'Official Zambian themed match ball',
          image: '/football/shop/ball.jpg',
          stock: 30,
          sizes: ['Size 5'],
          featured: true,
          createdAt: new Date().toISOString()
        },
        {
          id: '6',
          name: 'FAZ Green Baseball Cap',
          price: 80,
          category: 'accessories',
          description: 'Embroidered FAZ logo cap',
          image: '/football/shop/faz_hat.jpeg',
          stock: 150,
          sizes: ['One Size'],
          featured: false,
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem(this.storageKeys.products, JSON.stringify(sampleProducts));
    }

    // Initialize admin user if no users exist
    if (!localStorage.getItem(this.storageKeys.users)) {
      const adminUser = {
        id: 'admin-1',
        email: 'admin@zpl.zm',
        password: 'admin123', // In production, this would be hashed
        name: 'Admin User',
        role: 'admin',
        createdAt: new Date().toISOString()
      };
      localStorage.setItem(this.storageKeys.users, JSON.stringify([adminUser]));
    }

    // Check if user is logged in
    const loggedInUser = localStorage.getItem('zpl_current_user');
    if (loggedInUser) {
      this.currentUser = JSON.parse(loggedInUser);
    }
  }

  // Authentication Methods
  async login(email, password) {
    const users = JSON.parse(localStorage.getItem(this.storageKeys.users) || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      const userWithoutPassword = { ...user };
      delete userWithoutPassword.password;
      this.currentUser = userWithoutPassword;
      localStorage.setItem('zpl_current_user', JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    }
    
    return { success: false, error: 'Invalid email or password' };
  }

  async register(userData) {
    const users = JSON.parse(localStorage.getItem(this.storageKeys.users) || '[]');
    
    // Check if email already exists
    if (users.find(u => u.email === userData.email)) {
      return { success: false, error: 'Email already registered' };
    }

    const newUser = {
      id: 'user-' + Date.now(),
      ...userData,
      role: 'customer',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(this.storageKeys.users, JSON.stringify(users));

    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    this.currentUser = userWithoutPassword;
    localStorage.setItem('zpl_current_user', JSON.stringify(userWithoutPassword));

    return { success: true, user: userWithoutPassword };
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('zpl_current_user');
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isAdmin() {
    return this.currentUser && this.currentUser.role === 'admin';
  }

  // Product CRUD Methods
  async getProducts(filters = {}) {
    const products = JSON.parse(localStorage.getItem(this.storageKeys.products) || '[]');
    
    let filtered = products;
    
    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }
    
    if (filters.featured) {
      filtered = filtered.filter(p => p.featured);
    }
    
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(search) || 
        p.description.toLowerCase().includes(search)
      );
    }
    
    return filtered;
  }

  async getProduct(id) {
    const products = JSON.parse(localStorage.getItem(this.storageKeys.products) || '[]');
    return products.find(p => p.id === id);
  }

  async addProduct(productData) {
    if (!this.isAdmin()) {
      return { success: false, error: 'Unauthorized' };
    }

    const products = JSON.parse(localStorage.getItem(this.storageKeys.products) || '[]');
    const newProduct = {
      id: 'prod-' + Date.now(),
      ...productData,
      createdAt: new Date().toISOString()
    };

    products.push(newProduct);
    localStorage.setItem(this.storageKeys.products, JSON.stringify(products));

    return { success: true, product: newProduct };
  }

  async updateProduct(id, productData) {
    if (!this.isAdmin()) {
      return { success: false, error: 'Unauthorized' };
    }

    const products = JSON.parse(localStorage.getItem(this.storageKeys.products) || '[]');
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) {
      return { success: false, error: 'Product not found' };
    }

    products[index] = { ...products[index], ...productData, updatedAt: new Date().toISOString() };
    localStorage.setItem(this.storageKeys.products, JSON.stringify(products));

    return { success: true, product: products[index] };
  }

  async deleteProduct(id) {
    if (!this.isAdmin()) {
      return { success: false, error: 'Unauthorized' };
    }

    const products = JSON.parse(localStorage.getItem(this.storageKeys.products) || '[]');
    const filtered = products.filter(p => p.id !== id);
    localStorage.setItem(this.storageKeys.products, JSON.stringify(filtered));

    return { success: true };
  }

  // Cart Methods
  async getCart() {
    if (!this.currentUser) return [];
    
    const cartKey = `${this.storageKeys.cart}_${this.currentUser.id}`;
    return JSON.parse(localStorage.getItem(cartKey) || '[]');
  }

  async addToCart(productId, quantity = 1, size = null) {
    if (!this.currentUser) {
      return { success: false, error: 'Please login to add items to cart' };
    }

    const product = await this.getProduct(productId);
    if (!product) {
      return { success: false, error: 'Product not found' };
    }

    const cartKey = `${this.storageKeys.cart}_${this.currentUser.id}`;
    const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');

    const existingItem = cart.find(item => item.productId === productId && item.size === size);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: 'cart-' + Date.now(),
        productId,
        product,
        quantity,
        size,
        addedAt: new Date().toISOString()
      });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
    return { success: true, cart };
  }

  async updateCartItem(cartItemId, quantity) {
    if (!this.currentUser) return { success: false, error: 'Not authenticated' };

    const cartKey = `${this.storageKeys.cart}_${this.currentUser.id}`;
    const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');

    const item = cart.find(i => i.id === cartItemId);
    if (item) {
      item.quantity = quantity;
      localStorage.setItem(cartKey, JSON.stringify(cart));
      return { success: true, cart };
    }

    return { success: false, error: 'Item not found' };
  }

  async removeFromCart(cartItemId) {
    if (!this.currentUser) return { success: false, error: 'Not authenticated' };

    const cartKey = `${this.storageKeys.cart}_${this.currentUser.id}`;
    const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    const filtered = cart.filter(item => item.id !== cartItemId);

    localStorage.setItem(cartKey, JSON.stringify(filtered));
    return { success: true, cart: filtered };
  }

  async clearCart() {
    if (!this.currentUser) return { success: false };

    const cartKey = `${this.storageKeys.cart}_${this.currentUser.id}`;
    localStorage.setItem(cartKey, JSON.stringify([]));
    return { success: true };
  }

  // Order Methods
  async createOrder(orderData) {
    if (!this.currentUser) {
      return { success: false, error: 'Not authenticated' };
    }

    const orders = JSON.parse(localStorage.getItem(this.storageKeys.orders) || '[]');
    const cart = await this.getCart();

    const newOrder = {
      id: 'order-' + Date.now(),
      userId: this.currentUser.id,
      items: cart,
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    orders.push(newOrder);
    localStorage.setItem(this.storageKeys.orders, JSON.stringify(orders));

    // Clear cart after order
    await this.clearCart();

    return { success: true, order: newOrder };
  }

  async getOrders(userId = null) {
    const orders = JSON.parse(localStorage.getItem(this.storageKeys.orders) || '[]');
    
    if (userId) {
      return orders.filter(o => o.userId === userId);
    }
    
    if (this.isAdmin()) {
      return orders;
    }
    
    if (this.currentUser) {
      return orders.filter(o => o.userId === this.currentUser.id);
    }
    
    return [];
  }

  async getOrder(orderId) {
    const orders = JSON.parse(localStorage.getItem(this.storageKeys.orders) || '[]');
    const order = orders.find(o => o.id === orderId);
    
    if (!order) return null;
    
    // Check permissions
    if (this.isAdmin() || (this.currentUser && order.userId === this.currentUser.id)) {
      return order;
    }
    
    return null;
  }

  async updateOrderStatus(orderId, status) {
    if (!this.isAdmin()) {
      return { success: false, error: 'Unauthorized' };
    }

    const orders = JSON.parse(localStorage.getItem(this.storageKeys.orders) || '[]');
    const order = orders.find(o => o.id === orderId);
    
    if (order) {
      order.status = status;
      order.updatedAt = new Date().toISOString();
      localStorage.setItem(this.storageKeys.orders, JSON.stringify(orders));
      return { success: true, order };
    }
    
    return { success: false, error: 'Order not found' };
  }

  // User Management (Admin)
  async getUsers() {
    if (!this.isAdmin()) {
      return { success: false, error: 'Unauthorized' };
    }

    const users = JSON.parse(localStorage.getItem(this.storageKeys.users) || '[]');
    return users.map(u => {
      const { password, ...userWithoutPassword } = u;
      return userWithoutPassword;
    });
  }

  async updateUser(userId, userData) {
    if (!this.isAdmin() && this.currentUser.id !== userId) {
      return { success: false, error: 'Unauthorized' };
    }

    const users = JSON.parse(localStorage.getItem(this.storageKeys.users) || '[]');
    const index = users.findIndex(u => u.id === userId);
    
    if (index === -1) {
      return { success: false, error: 'User not found' };
    }

    users[index] = { ...users[index], ...userData, updatedAt: new Date().toISOString() };
    localStorage.setItem(this.storageKeys.users, JSON.stringify(users));

    const { password, ...userWithoutPassword } = users[index];
    return { success: true, user: userWithoutPassword };
  }

  async deleteUser(userId) {
    if (!this.isAdmin()) {
      return { success: false, error: 'Unauthorized' };
    }

    const users = JSON.parse(localStorage.getItem(this.storageKeys.users) || '[]');
    const filtered = users.filter(u => u.id !== userId);
    localStorage.setItem(this.storageKeys.users, JSON.stringify(filtered));

    return { success: true };
  }

  // Content Management (Admin) - News, Matches, Players
  async getContent(type) {
    const key = this.storageKeys[type];
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  async addContent(type, data) {
    if (!this.isAdmin()) {
      return { success: false, error: 'Unauthorized' };
    }

    const key = this.storageKeys[type];
    const content = JSON.parse(localStorage.getItem(key) || '[]');
    
    const newItem = {
      id: `${type}-${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString()
    };

    content.push(newItem);
    localStorage.setItem(key, JSON.stringify(content));

    return { success: true, item: newItem };
  }

  async updateContent(type, id, data) {
    if (!this.isAdmin()) {
      return { success: false, error: 'Unauthorized' };
    }

    const key = this.storageKeys[type];
    const content = JSON.parse(localStorage.getItem(key) || '[]');
    const index = content.findIndex(item => item.id === id);
    
    if (index === -1) {
      return { success: false, error: 'Content not found' };
    }

    content[index] = { ...content[index], ...data, updatedAt: new Date().toISOString() };
    localStorage.setItem(key, JSON.stringify(content));

    return { success: true, item: content[index] };
  }

  async deleteContent(type, id) {
    if (!this.isAdmin()) {
      return { success: false, error: 'Unauthorized' };
    }

    const key = this.storageKeys[type];
    const content = JSON.parse(localStorage.getItem(key) || '[]');
    const filtered = content.filter(item => item.id !== id);
    localStorage.setItem(key, JSON.stringify(filtered));

    return { success: true };
  }
}

// Export singleton instance
const firebaseService = new FirebaseService();
export default firebaseService;
