import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/authContext';

// Header Component with Scroll Functionality and Auth
const Header = ({ scrollToSection, onNavigate, currentPage }) => {
  const [activePage, setActivePage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { currentUser, logout, isAdmin } = useAuth();

  // Define which nav items are scrollable sections on the home page
  const scrollableSections = ['home', 'players', 'matches', 'news'];

  useEffect(() => {
    if (currentPage) {
      setActivePage(currentPage);
    }
  }, [currentPage]);

  const handlePageClick = (page) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
    if (scrollableSections.includes(page)) {
      scrollToSection(page);
    } else {
      onNavigate(page);
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    if (onNavigate) {
      onNavigate('home');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('header')) {
        setIsMobileMenuOpen(false);
      }
      if (showUserMenu && !event.target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen, showUserMenu]);

  return (
    <header className="fixed top-0 w-full z-50 bg-gray-900 bg-opacity-90 backdrop-blur-md border-b border-green-600/30">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl border-2 border-red-600">
            <img src="/football/ZPL.png" alt="ZPL" className="w-full h-full object-cover rounded-full" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-green-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            ZAMBIA PREMIER LEAGUE
          </span>
        </div>
        
        <nav className="hidden md:flex space-x-8 items-center">
          {['home', 'players', 'matches', 'news', 'shop'].map((page) => (
            <button 
              key={page}
              onClick={() => handlePageClick(page)}
              className={`uppercase font-semibold tracking-wider relative ${
                activePage === page ? 'text-green-400' : 'text-white hover:text-orange-300'
              } transition-colors duration-300`}
            >
              {page}
              {activePage === page && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-orange-400 animate-pulse"></span>
              )}
            </button>
          ))}

          {/* User Menu for Desktop */}
          {currentUser ? (
            <div className="relative user-menu-container">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-orange-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-white font-semibold">{currentUser.name.split(' ')[0]}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-green-600/30 overflow-hidden">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      handlePageClick('orders');
                    }}
                    className="block w-full text-left px-4 py-3 text-white hover:bg-gray-700 transition-colors"
                  >
                    My Orders
                  </button>
                  {isAdmin() && (
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        handlePageClick('admin');
                      }}
                      className="block w-full text-left px-4 py-3 text-orange-400 hover:bg-gray-700 transition-colors font-semibold"
                    >
                      Admin Dashboard
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 text-red-400 hover:bg-gray-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => handlePageClick('login')}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-orange-600 rounded-lg font-bold text-white hover:from-green-700 hover:to-orange-700 transition-all duration-300"
            >
              LOGIN
            </button>
          )}
        </nav>
        
        <button 
          className="md:hidden text-white p-2 hover:bg-gray-800 rounded-md transition-colors duration-200"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-6 w-6 transform transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      <div className={`md:hidden bg-gray-900 bg-opacity-95 backdrop-blur-md border-t border-green-600/30 transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <nav className="container mx-auto px-4 py-4 space-y-4">
          {['home', 'players', 'matches', 'news', 'shop'].map((page) => (
            <button 
              key={page}
              onClick={() => handlePageClick(page)}
              className={`block w-full text-left uppercase font-semibold tracking-wider py-2 px-4 rounded-md transition-all duration-300 ${
                activePage === page 
                  ? 'text-green-400 bg-green-600/20 border-l-4 border-green-400' 
                  : 'text-white hover:text-orange-300 hover:bg-gray-800/50'
              }`}
            >
              {page}
            </button>
          ))}

          {/* Mobile User Menu */}
          {currentUser ? (
            <>
              <button
                onClick={() => handlePageClick('orders')}
                className="block w-full text-left uppercase font-semibold tracking-wider py-2 px-4 rounded-md text-white hover:text-orange-300 hover:bg-gray-800/50 transition-all duration-300"
              >
                My Orders
              </button>
              {isAdmin() && (
                <button
                  onClick={() => handlePageClick('admin')}
                  className="block w-full text-left uppercase font-semibold tracking-wider py-2 px-4 rounded-md text-orange-400 hover:bg-gray-800/50 transition-all duration-300"
                >
                  Admin Dashboard
                </button>
              )}
              <button
                onClick={handleLogout}
                className="block w-full text-left uppercase font-semibold tracking-wider py-2 px-4 rounded-md text-red-400 hover:bg-gray-800/50 transition-all duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => handlePageClick('login')}
              className="block w-full text-left uppercase font-semibold tracking-wider py-2 px-4 rounded-md bg-gradient-to-r from-green-600 to-orange-600 text-white"
            >
              Login
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
