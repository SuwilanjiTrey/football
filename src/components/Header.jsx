import React, { useState, useEffect } from 'react';

const Header = () => {
  const [activePage, setActivePage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when clicking on a page
  const handlePageClick = (page) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('header')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed top-0 w-full z-50 bg-gray-900 bg-opacity-90 backdrop-blur-md border-b border-green-600/30">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo - Updated with Zambian colors */}
        <div className="flex items-center space-x-2">
          <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl border-2 border-red-600">
            <img src="/chipologo.png" alt="CFC" className="w-full h-full object-cover rounded-full" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-green-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            CHIPOLOPOLO FC
          </span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {['home', 'players', 'matches', 'news', 'shop'].map((page) => (
            <button 
              key={page}
              onClick={() => setActivePage(page)}
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
        </nav>
        
        {/* Mobile menu button */}
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
      
      {/* Mobile Navigation Menu */}
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
        </nav>
      </div>
    </header>
  );
};

export default Header;
