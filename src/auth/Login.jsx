import React, { useState } from 'react';
import { useAuth } from './authContext';

const Login = ({ onNavigate, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.email, formData.password);
    
    setLoading(false);

    if (result.success) {
      if (onClose) onClose();
      onNavigate('home');
    } else {
      setError(result.error);
    }
  };

  return (
    <section className="py-16 bg-gray-900 relative min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-md">
        <div className="bg-gray-800 rounded-lg p-8 border border-green-600/30">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-orange-400 bg-clip-text text-transparent">
            LOGIN TO YOUR ACCOUNT
          </h2>

          {error && (
            <div className="mb-4 p-4 bg-red-600/20 border border-red-600 rounded-lg text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-900 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-900 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-green-600 to-orange-600 rounded-lg font-bold text-white hover:from-green-700 hover:to-orange-700 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'LOGGING IN...' : 'LOGIN'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <button
                onClick={() => onNavigate('register')}
                className="text-green-400 font-semibold hover:text-green-300"
              >
                Register here
              </button>
            </p>
          </div>

          <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
            <p className="text-xs text-gray-500 mb-2">Demo Credentials:</p>
            <p className="text-xs text-gray-400">Admin: admin@zpl.zm / admin123</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;