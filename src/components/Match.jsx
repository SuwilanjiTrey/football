import React from 'react';

// Matches + League Table Section
const Match = () => {
  const matches = [
    {
      id: 1,
      home: 'Green Eagles FC',
      opponent: 'Zanaco FC',
      location: 'Home',
      date: 'March 12, 2025',
      time: '15:00'
    },
    {
      id: 2,
      home: 'Kansanshi Dynamos',
      opponent: 'Nkana FC',
      location: 'Away',
      date: 'March 19, 2025',
      time: '16:30'
    },
    {
      id: 3,
      home: 'NAPSA Stars',
      opponent: 'Power Dynamos',
      location: 'Home',
      date: 'March 26, 2025',
      time: '15:00'
    }
  ];

const leagueTable = [
  {
    pos: 1,
    team: 'Power Dynamos',
    logo: '/football/teams/pdfc.png',
    p: 22,
    pts: 48,
    form: ['W', 'W', 'D', 'W', 'W']
  },
  {
    pos: 2,
    team: 'Red Arrows',
    logo: '/football/teams/RAFC.jpeg',
    p: 22,
    pts: 45,
    form: ['W', 'L', 'W', 'W', 'D']
  },
  {
    pos: 3,
    team: 'Zanaco FC',
    logo: '/football/teams/zanaco2.png',
    p: 22,
    pts: 42,
    form: ['D', 'W', 'W', 'L', 'W']
  },
  {
    pos: 4,
    team: 'Nkana FC',
    logo: '/football/teams/nkana.png',
    p: 22,
    pts: 40,
    form: ['L', 'W', 'D', 'W', 'W']
  },
  {
    pos: 5,
    team: 'Green Eagles',
    logo: '/football/teams/GEFC.jpeg',
    p: 22,
    pts: 38,
    form: ['W', 'D', 'L', 'W', 'D']
  }
];

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">

        {/* Section Title */}
        <h2 className="text-2xl md:text-3xl font-bold mb-10 flex items-center">
          <span className="w-8 h-8 bg-gradient-to-r from-green-600 to-orange-600 rounded-full mr-3 flex items-center justify-center border border-red-600">
            <img src="/football/ZPL.png" alt="ZPL" className="w-full h-full rounded-full" />
          </span>
          ZPL MATCHES & STANDINGS
        </h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Upcoming Matches */}
          <div className="lg:col-span-2 space-y-4">
            {matches.map((match) => (
              <div
                key={match.id}
                className="bg-gray-800 rounded-lg p-4 border border-green-600/20 hover:border-green-600/50 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center text-lg font-bold mr-4 border-2 border-green-600">
                      {match.date.split(' ')[1].replace(',', '')}
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">
                        {match.date} • {match.time}
                      </div>
                      <div className="text-lg font-bold mt-1">
                        <span className="text-green-400">{match.home}</span>
                        <span className="mx-2 text-orange-400">VS</span>
                        <span>{match.opponent}</span>
                      </div>
                      <div className="text-sm mt-1 text-gray-300">
                        {match.location === 'Home'
                          ? 'Heroes Stadium, Lusaka'
                          : `${match.opponent} Stadium`}
                      </div>
                    </div>
                  </div>

                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-sm font-bold">
                    BUY TICKETS
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* League Table */}

		<div className="bg-gray-800 rounded-lg p-5 border border-orange-500/30">
		  <h3 className="text-xl font-bold mb-4 text-orange-400">
			LEAGUE TABLE
		  </h3>

		  <table className="w-full text-sm">
			<thead>
			  <tr className="text-gray-400 border-b border-gray-700">
				<th className="py-2 text-left">#</th>
				<th className="py-2 text-left">Team</th>
				<th className="py-2 text-center">P</th>
				<th className="py-2 text-center">Form</th>
				<th className="py-2 text-right">Pts</th>
			  </tr>
			</thead>

			<tbody>
			  {leagueTable.map((team) => (
				<tr
				  key={team.pos}
				  className="border-b border-gray-700 hover:bg-gray-700/40 transition"
				>
				  <td className="py-2">{team.pos}</td>

				  {/* Team + Logo */}
				  <td className="py-2">
				    <div className="flex items-center space-x-3">
				      <img
				        src={team.logo}
				        alt={team.team}
				        className="w-7 h-7 rounded-full object-contain bg-gray-900 p-1"
				      />
				      <span className="font-semibold">{team.team}</span>
				    </div>
				  </td>

				  <td className="py-2 text-center">{team.p}</td>

				  {/* Form Indicators */}
				  <td className="py-2">
				    <div className="flex justify-center space-x-1">
				      {team.form.map((result, i) => (
				        <span
				          key={i}
				          className={`w-2.5 h-2.5 rounded-full ${
				            result === 'W'
				              ? 'bg-green-500'
				              : result === 'D'
				              ? 'bg-yellow-400'
				              : 'bg-red-500'
				          }`}
				          title={result}
				        />
				      ))}
				    </div>
				  </td>

				  <td className="py-2 text-right text-green-400 font-bold">
				    {team.pts}
				  </td>
				</tr>
			  ))}
			</tbody>
		  </table>

		  <div className="mt-4 text-center">
			<button className="text-orange-400 font-bold hover:underline">
			  FULL TABLE →
			</button>
		  </div>
		</div>

        </div>
      </div>
    </section>
  );
};

export default Match;
