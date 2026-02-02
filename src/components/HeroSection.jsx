import React, { useEffect, useState } from 'react';

const HeroSection = () => {
  const [animateHero, setAnimateHero] = useState(false);
  
  useEffect(() => {
    setAnimateHero(true);
  }, []);
  
  return (
    <section className="relative h-screen pt-16 md:pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-green-900/30 md:via-green-900/20 to-transparent z-10"></div>
        <img src="/football/soccer.png" alt="Stadium" className="w-full h-full object-cover" />
      </div>
      
      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-10">
        <div className={`text-center transform transition-all duration-1000 ${animateHero ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            UNITY. WORK. PROGRESS.
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-2xl mx-auto text-gray-200">
            Experience the pride of Zambian football with Zambian Premier League - where the stars forge legends on the pitch.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 rounded-md font-bold text-lg hover:from-green-700 hover:to-green-800 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-green-600/50">
              BUY TICKETS
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-orange-400 text-orange-400 rounded-md font-bold text-lg hover:bg-orange-400 hover:text-gray-900 transform hover:-translate-y-1 transition-all duration-300">
              JOIN SUPPORTERS
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-4 right-4 md:bottom-10 md:right-10 md:left-auto md:w-100 bg-gray-800 bg-opacity-95 backdrop-blur-md rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300 border-2 border-green-600/50 z-20">
        <div className="p-3 md:p-4">
          <div className="text-xs text-green-400 font-semibold mb-2">NEXT MATCH</div>
          
          {/* Mobile Card Layout */}
          <div className="md:hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-orange-600 rounded-full flex items-center justify-center text-xs font-bold border border-red-600 mr-2">
                  <img src="/football/GEFC.jpeg" alt="Green Eagles FC" className="w-full h-full object-cover rounded-full" />
                </div>
                <span className="font-bold text-xs">Green Eagles FC</span>
              </div>
              <span className="text-sm font-bold text-orange-400">VS</span>
              <div className="flex items-center">
                <span className="font-bold text-xs mr-2">ZANACO FC</span>
                <img src="/football/zanaco.png" alt="Zanaco FC" className="w-8 h-8 object-cover rounded-full" />
              </div>
            </div>
            <div className="text-center text-xs mb-3">
              <div className="font-semibold">March 12, 2025 • 15:00</div>
              <div className="text-gray-400">Heroes Stadium, Lusaka</div>
            </div>
            <button className="w-full py-2 bg-green-600 hover:bg-green-700 rounded text-xs font-bold transition-colors duration-300">
              GET TICKETS
            </button>
          </div>

          {/* Desktop Card Layout */}
          <div className="hidden md:block">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-orange-600 rounded-full flex items-center justify-center text-xs font-bold border border-red-600">
                  <img src="/football/GEFC.jpeg" alt="Green Eagles FC" className="w-12 h-8 object-cover rounded-full" />
                </div>
                <span className="ml-2 font-bold text-sm">Green Eagles FC</span>
              </div>
              <span className="text-xl font-bold text-orange-400">VS</span>
              <div className="flex items-center">
                <span className="mr-2 font-bold text-sm">ZANACO FC</span>
                <img src="/football/zanaco.png" alt="Zanaco FC" className="w-12 h-12 object-cover rounded-full" />
              </div>
            </div>
            <div className="mt-3 text-center text-sm">
              <div className="font-semibold">March 12, 2025 • 15:00</div>
              <div className="text-gray-400">Heroes Stadium, Lusaka</div>
            </div>
            <button className="mt-3 w-full py-2 bg-green-600 hover:bg-green-700 rounded text-sm font-bold transition-colors duration-300">
              GET TICKETS
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

