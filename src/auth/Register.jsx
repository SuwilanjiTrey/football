import React, { useState } from 'react';
import { useAuth } from './authContext';

const Register = ({ onNavigate, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

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

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone
    });

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
            CREATE YOUR ACCOUNT
          </h2>

          {error && (
            <div className="mb-4 p-4 bg-red-600/20 border border-red-600 rounded-lg text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-900 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="John Doe"
              />
            </div>

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
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="+260 XXX XXX XXX"
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

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
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
              {loading ? 'CREATING ACCOUNT...' : 'REGISTER'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <button
                onClick={() => onNavigate('login')}
                className="text-green-400 font-semibold hover:text-green-300"
              >
                Login here
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;