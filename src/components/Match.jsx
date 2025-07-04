import React from 'react';

const Match = () => {
  
  // Upcoming matches - Updated with Zambian teams
  const matches = [
    {
      id: 1,
      opponent: 'Zanaco FC',
      location: 'Home',
      date: 'March 12, 2025',
      time: '15:00'
    },
    {
      id: 2,
      opponent: 'Nkana FC',
      location: 'Away',
      date: 'March 19, 2025',
      time: '16:30'
    },
    {
      id: 3,
      opponent: 'Power Dynamos',
      location: 'Home',
      date: 'March 26, 2025',
      time: '15:00'
    }
  ];

  return (
    <section className="py-16 bg-gray-900 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 flex items-center">
          <span className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-green-600 to-orange-600 rounded-full flex items-center justify-center text-white text-xs mr-2 md:mr-3 border border-red-600">
           <img src="/football/chipologo.png" alt="CFC" className="w-full h-full object-cover rounded-full" />
          </span>
          UPCOMING MATCHES
        </h2>
        
        <div className="space-y-4 md:space-y-4">
          {matches.map((match) => (
            <div 
              key={match.id}
              className="bg-gray-800 rounded-lg p-3 md:p-4 hover:bg-gray-700 transition-colors duration-300 border border-green-600/20 hover:border-green-600/50"
            >
              {/* Mobile Layout */}
              <div className="block md:hidden">
                {/* Date and Time Header */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-700">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-lg font-bold mr-3 border-2 border-green-600 text-green-400">
                      {match.date.split(' ')[1].replace(',', '')}
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">{match.date}</div>
                      <div className="text-sm font-semibold text-white">{match.time}</div>
                    </div>
                  </div>
                </div>
                
                {/* Teams */}
                <div className="mb-4">
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-green-400 font-bold text-lg">CHIPOLOPOLO FC</span>
                  </div>
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-orange-400 font-bold text-sm">VS</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{match.opponent}</span>
                  </div>
                </div>
                
                {/* Location */}
                <div className="text-center mb-4">
                  <div className="text-sm text-gray-400">
                    {match.location === 'Home' ? 'Heroes Stadium, Lusaka' : `${match.opponent} Stadium, Away`}
                  </div>
                </div>
                
                {/* Buttons */}
                <div className="flex flex-col space-y-2">
                  <button className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 rounded text-sm font-bold transition-colors duration-300">
                    BUY TICKETS
                  </button>
                  <button className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded text-sm font-bold flex items-center justify-center transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    ADD TO CALENDAR
                  </button>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:flex md:items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center text-xl font-bold mr-4 border-2 border-green-600">
                    {match.date.split(' ')[1].replace(',', '')}
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">{match.date} • {match.time}</div>
                    <div className="text-xl font-bold mt-1 flex items-center">
                      <span className="text-green-400">CHIPOLOPOLO FC</span>
                      <span className="mx-3 text-orange-400">VS</span>
                      <span className="text-white">{match.opponent}</span>
                    </div>
                    <div className="text-sm mt-1">
                      {match.location === 'Home' ? 'Heroes Stadium, Lusaka' : `${match.opponent} Stadium, Away`}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button className="py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded text-sm font-bold flex items-center transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    ADD TO CALENDAR
                  </button>
                  <button className="py-2 px-4 bg-green-600 hover:bg-green-700 rounded text-sm font-bold transition-colors duration-300">
                    BUY TICKETS
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 md:mt-12 text-center">
          <button className="px-6 md:px-8 py-3 bg-transparent border-2 border-orange-400 text-orange-400 rounded-md font-bold hover:bg-orange-400 hover:text-gray-900 transition-colors duration-300 text-sm md:text-base">
            FULL SCHEDULE
          </button>
        </div>
      </div>
      
      {/* Dynamic background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-green-900/10 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Match;
