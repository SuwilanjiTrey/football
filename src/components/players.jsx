import {useState, useEffect} from 'react';


// Players data - defined outside component to avoid dependency issues
const PLAYERS_DATA = [
  { 
    id: 1, 
    name: 'Isaac Shamujompa',
    position: 'Forward',
    number: 19,
    stats: { goals: 12, assists: 8, rating: 8.4 },
    image: '/football/isaac-shamujompa.png'
  },
  { 
    id: 2, 
    name: 'Boyd Musonda', 
    position: 'Midfield',
    number: 21,
    stats: { goals: 6, assists: 15, rating: 8.1 },
    image: '/football/boyd-musonda.png'
  },
  { 
    id: 3, 
    name: 'Lameck Siame', 
    position: 'Goal Keeper',
    number: 15,
    stats: { goals: 0, assists: 2, rating: 8.7 },
    image: '/football/lamek.png'
  }
];

// Players Section
const Players = () => {
  const [animatePlayer, setAnimatePlayer] = useState(false);
  const [playerIndex, setPlayerIndex] = useState(0);
  const carouselOffset = '55%'; // tweak: -8%, -12%, etc.

  
  useEffect(() => {
    const playerInterval = setInterval(() => {
      setAnimatePlayer(false);
      setTimeout(() => {
        setPlayerIndex(prev => (prev + 1) % PLAYERS_DATA.length);
        setAnimatePlayer(true);
      }, 500);
    }, 5000);
    
    return () => clearInterval(playerInterval);
  }, []);
  
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
  
const getPlayerAt = (offset) => {
  const total = PLAYERS_DATA.length;
  return PLAYERS_DATA[(playerIndex + offset + total) % total];
};

  
  
  return (
    <section className="py-16 bg-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row">
          {/* Mobile: Single column with background image */}
          <div className="w-full md:w-1/2 relative">
            {/* Mobile background image - only visible on mobile */}
            <div className="md:hidden absolute inset-0 z-0">
              <img
                src={PLAYERS_DATA[playerIndex].image}
                alt={PLAYERS_DATA[playerIndex].name}
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
                  <img src="/football/zanaco.png" alt="Zanaco FC" className="w-full h-full object-cover rounded-full" />
                </span>
                Zanaco FC Stars
              </h2>

              <div className={`mt-8 transition-all duration-500 ${animatePlayer ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <div className="text-5xl font-bold mb-1 bg-gradient-to-r from-green-400 to-orange-400 bg-clip-text text-transparent">
                  {PLAYERS_DATA[playerIndex].name}
                </div>
                <div className="text-xl text-green-400 mb-6">{PLAYERS_DATA[playerIndex].position} • #{PLAYERS_DATA[playerIndex].number}</div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-gray-800/90 backdrop-blur-sm p-4 rounded-lg text-center border border-green-600/30">
                    <div className="text-3xl font-bold text-green-400">{PLAYERS_DATA[playerIndex].stats.goals}</div>
                    <div className="text-sm text-gray-400">Goals</div>
                  </div>
                  <div className="bg-gray-800/90 backdrop-blur-sm p-4 rounded-lg text-center border border-orange-600/30">
                    <div className="text-3xl font-bold text-orange-400">{PLAYERS_DATA[playerIndex].stats.assists}</div>
                    <div className="text-sm text-gray-400">Assists</div>
                  </div>
                  <div className="bg-gray-800/90 backdrop-blur-sm p-4 rounded-lg text-center border border-red-600/30">
                    <div className="text-3xl font-bold text-red-400">{PLAYERS_DATA[playerIndex].stats.rating}</div>
                    <div className="text-sm text-gray-400">Rating</div>
                  </div>
                </div>

                <button className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-md font-bold text-sm transition-colors duration-300 shadow-lg">
                  PLAYER PROFILE
                </button>
              </div>

              <div className="flex mt-8">
                {PLAYERS_DATA.map((player, index) => (
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
		<div className="hidden md:block md:w-1/2 mt-10 md:mt-0 relative h-[28rem] overflow-hidden">

		  {/* Bottom fade */}
		  <div className="absolute bottom-0 left-0 right-0 h-40 
				          bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent 
				          z-30 pointer-events-none" />

		  {/* Side fade */}
		  <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-gray-900 z-20 pointer-events-none" />

		  {/* PREVIOUS PLAYER */}
		  <img
			  src={getPlayerAt(-1).image}
			  alt={getPlayerAt(-1).name}
			  className="absolute bottom-0
						 max-h-[85%] object-contain
						 opacity-30 blur-sm scale-90
						 transition-all duration-700"
			  style={{ left: carouselOffset, transform: 'translateX(-120%)' }}
			/>

		  


		  {/* ACTIVE PLAYER */}
			<img
			  src={getPlayerAt(0).image}
			  alt={getPlayerAt(0).name}
			  className={`absolute bottom-0
						  max-h-full object-contain z-20
						  transition-all duration-700
						  ${animatePlayer ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
			  style={{ left: carouselOffset, transform: 'translateX(-50%)' }}
			/>


		  {/* NEXT PLAYER */}
		<img
		  src={getPlayerAt(1).image}
		  alt={getPlayerAt(1).name}
		  className="absolute bottom-0
				     max-h-[85%] object-contain
				     opacity-30 blur-sm scale-90
				     transition-all duration-700"
		  style={{ left: carouselOffset, transform: 'translateX(20%)' }}
		/>



          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-green-600 opacity-5 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-orange-600 opacity-5 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-red-600 opacity-5 animate-pulse"></div>
      </div>
    </section>
  );
};

export default Players;
