import React, { useRef, useState } from 'react';
import { AuthProvider } from './auth/authContext';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Match from './components/Match.jsx';
import Hero from './components/HeroSection.jsx';
import News from './components/News.jsx';
import Players from './components/players.jsx';
import Shop from './components/shop/shop.jsx';
import Login from './auth/Login.jsx';
import Register from './auth/Register.jsx';
import Cart from './components/shop/Cart.jsx';
import Checkout from './components/shop/Checkout.jsx';
import Orders from './components/shop/Orders.jsx';
import AdminDashboard from './components/Admin/dashboard.jsx';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  
  const homeRef = useRef(null);
  const playersRef = useRef(null);
  const matchesRef = useRef(null);
  const newsRef = useRef(null);
  const shopRef = useRef(null);

  const scrollToSection = (section) => {
    // If we're on a different page, first navigate to home
    if (currentPage !== 'home' && ['home', 'players', 'matches', 'news', 'shop'].includes(section)) {
      setCurrentPage('home');
      // Wait for the page to render before scrolling
      setTimeout(() => {
        scrollToSectionRef(section);
      }, 100);
    } else {
      scrollToSectionRef(section);
    }
  };

  const scrollToSectionRef = (section) => {
    const refs = {
      home: homeRef,
      players: playersRef,
      matches: matchesRef,
      news: newsRef,
      shop: shopRef
    };

    const targetRef = refs[section];
    if (targetRef && targetRef.current) {
      const yOffset = -80; // Offset for fixed header
      const element = targetRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <div ref={homeRef}>
              <Hero />
            </div>
            
            <div ref={playersRef}>
              <Players />
            </div>
            
            <div ref={newsRef}>
              <News />
            </div>
            
            <div ref={matchesRef}>
              <Match />
            </div>
            
            <div ref={shopRef}>
              <section className="py-16 bg-gray-800 relative">
                <div className="container mx-auto px-4 text-center">
                  <h2 className="text-3xl font-bold mb-8 flex items-center justify-center">
                    <span className="w-8 h-8 bg-gradient-to-r from-green-600 to-orange-600 rounded-full flex items-center justify-center text-white text-xs mr-3 border border-red-600">
                      🛍️
                    </span>
                    OFFICIAL SHOP
                  </h2>
                  <p className="text-xl text-gray-400 mb-8">Get your official ZPL merchandise!</p>
                  <button 
                    onClick={() => handleNavigate('shop')}
                    className="px-8 py-3 bg-green-600 hover:bg-green-700 rounded-md font-bold transition-colors duration-300"
                  >
                    SHOP NOW
                  </button>
                </div>
              </section>
            </div>
          </>
        );
      case 'login':
        return <Login onNavigate={handleNavigate} />;
      case 'register':
        return <Register onNavigate={handleNavigate} />;
      case 'shop':
        return <Shop onNavigate={handleNavigate} />;
      case 'cart':
        return <Cart onNavigate={handleNavigate} />;
      case 'checkout':
        return <Checkout onNavigate={handleNavigate} />;
      case 'orders':
        return <Orders onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminDashboard onNavigate={handleNavigate} />;
      default:
        return (
          <div ref={homeRef}>
            <Hero />
          </div>
        );
    }
  };

  return (
    <AuthProvider>
      <div className="bg-gray-900 text-white min-h-screen">
        <div className="fixed inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-gray-900 to-orange-900"></div>
        </div>
        
        <Header 
          scrollToSection={scrollToSection} 
          onNavigate={handleNavigate}
          currentPage={currentPage}
        />
        
        <div className="relative z-10">
          {renderPage()}
        </div>
        
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;