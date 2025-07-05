import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Match from './components/Match.jsx';
import Hero from './components/HeroSection.jsx';
import News from './components/News.jsx';


const ZambianSoccerClubWebsite = () => {
  const [activePage, setActivePage] = useState('home');
  const [animateHero, setAnimateHero] = useState(false);
  const [animatePlayer, setAnimatePlayer] = useState(false);
  const [playerIndex, setPlayerIndex] = useState(0);
  
  // Featured players data - Updated with Zambian context
  const players = [
    { 
      id: 1, 
      name: 'Isaac Shamujompa',
      position: 'Forward',
      number: 19,
      stats: { goals: 0, assists: 0, rating: 8.4 },
      image: '/football/isaac-shamujompa.png'
    },
    { 
      id: 2, 
      name: 'Boyd Musonda', 
      position: 'Midfield',
      number: 21,
      stats: { goals: 0, assists: 0, rating: 8.1 },
      image: '/football/boyd-musonda.png'
    },
    { 
      id: 3, 
      name: 'Lameck Siame', 
      position: 'Goal Keeper',
      number: 15,
      stats: { goals: 0, assists: 0, rating: 8.7 },
      image: '/football/lamek.png'
    }
  ];
  
  // Animation effects
  useEffect(() => {
    const playerInterval = setInterval(() => {
      setAnimatePlayer(false);
      setTimeout(() => {
        setPlayerIndex(prev => (prev + 1) % players.length);
        setAnimatePlayer(true);
      }, 500);
    }, 5000);
    
    return () => clearInterval(playerInterval);
  }, [players.length]);
  
  // Change player stats animation
  useEffect(() => {
    setAnimatePlayer(true);
  }, [playerIndex]);

  const changePlayer = (index) => {
    setAnimatePlayer(false);
    
    setTimeout(() => {
      setPlayerIndex(index);
      setAnimatePlayer(true);
    }, 300);
  };
  
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Dynamic Background with Zambian colors */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-gray-900 to-orange-900"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/soccer.png')] bg-cover opacity-30"></div>
      </div>
      
          {/* Header */}
     <Header />
      
      <Hero />
      
      
      {/* Featured Player Section */}
      <section className="py-16 bg-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row">
            {/* Mobile: Single column with background image */}
            <div className="w-full md:w-1/2 relative">
              {/* Mobile background image - only visible on mobile */}
              <div className="md:hidden absolute inset-0 z-0">
                <img
                  src={players[playerIndex].image}
                  alt={players[playerIndex].name}
                  className={`w-full h-full object-cover object-top opacity-20 transition-all duration-500 ${
                    animatePlayer ? 'opacity-80 scale-100' : 'opacity-0 scale-95'
                  }`}
                  onError={(e) => {
                    console.error('Error loading image:', e);
                    e.target.src = '/placeholder.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
              </div>

              {/* Content - positioned above background on mobile */}
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-4 flex items-center">
                  <span className="w-8 h-8 bg-gradient-to-r from-green-600 to-orange-600 rounded-full flex items-center justify-center text-white text-xs mr-3 border border-red-600">
                    <img src="/football/zanaco.png" alt="CFC" className="w-full h-full object-cover rounded-full" />
                  </span>
                  Zanaco FC stars
                </h2>

                <div className={`mt-8 transition-all duration-500 ${animatePlayer ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                  <div className="text-5xl font-bold mb-1 bg-gradient-to-r from-green-400 to-orange-400 bg-clip-text text-transparent">
                    {players[playerIndex].name}
                  </div>
                  <div className="text-xl text-green-400 mb-6">{players[playerIndex].position} • #{players[playerIndex].number}</div>

                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-gray-800/90 backdrop-blur-sm p-4 rounded-lg text-center border border-green-600/30">
                      <div className="text-3xl font-bold text-green-400">{players[playerIndex].stats.goals}</div>
                      <div className="text-sm text-gray-400">Goals</div>
                    </div>
                    <div className="bg-gray-800/90 backdrop-blur-sm p-4 rounded-lg text-center border border-orange-600/30">
                      <div className="text-3xl font-bold text-orange-400">{players[playerIndex].stats.assists}</div>
                      <div className="text-sm text-gray-400">Assists</div>
                    </div>
                    <div className="bg-gray-800/90 backdrop-blur-sm p-4 rounded-lg text-center border border-red-600/30">
                      <div className="text-3xl font-bold text-red-400">{players[playerIndex].stats.rating}</div>
                      <div className="text-sm text-gray-400">Rating</div>
                    </div>
                  </div>

                  <button className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-md font-bold text-sm transition-colors duration-300 shadow-lg">
                    PLAYER PROFILE
                  </button>
                </div>

                <div className="flex mt-8">
                  {players.map((player, index) => (
                    <button
                      key={player.id}
                      onClick={() => changePlayer(index)}
                      className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
                        playerIndex === index ? 'bg-green-400 w-6' : 'bg-gray-600 hover:bg-orange-400'
                      }`}
                      aria-label={`View ${player.name}`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop: Separate image column - only visible on desktop */}
            <div className="hidden md:block md:w-1/2 mt-10 md:mt-0 relative h-96 md:h-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-green-900/20 to-transparent z-10"></div>
              <img
                src={players[playerIndex].image}
                alt={players[playerIndex].name}
                className={`absolute inset-0 m-auto max-h-full max-w-full object-contain transition-all duration-500 ${
                  animatePlayer ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                onError={(e) => {
                  console.error('Error loading image:', e);
                  e.target.src = '/placeholder.png';
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Dynamic particles background - Updated with Zambian colors */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-green-600 opacity-5 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-orange-600 opacity-5 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-red-600 opacity-5 animate-pulse"></div>
        </div>
      </section>
      
      
     <News /> 
     <Match />
     <Footer /> 

      
      
    </div>
  );
};

export default ZambianSoccerClubWebsite;
