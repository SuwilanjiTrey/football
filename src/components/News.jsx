const News = () => {
  // News items - Updated with Zambian context
  const news = [
    {
      id: 1,
      title: 'Chipolopolo Warriors Win CAF Championship',
      date: 'March 3, 2025',
      preview: 'The Copper Bullets secure victory in a thrilling final at Heroes Stadium.',
      image: '/football/victory.jpg'
    },
    {
      id: 2,
      title: 'New Training Ground Opens in Lusaka',
      date: 'February 20, 2025',
      preview: 'State-of-the-art facilities to develop the next generation of Zambian talent.',
      image: '/football/training.jpg'
    },
    {
      id: 3,
      title: 'Youth Academy Star Joins Senior Team',
      date: 'February 10, 2025',
      preview: '18-year-old sensation from Kitwe academy earns professional contract.',
      image: '/football/youth.jpg'
    }
  ];

return (

      <section className="py-16 bg-gray-800 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 flex items-center">
            <span className="w-8 h-8 bg-gradient-to-r from-green-600 to-orange-600 rounded-full flex items-center justify-center text-white text-xs mr-3 border border-red-600">
              <img src="/football/chipologo.png" alt="CFC" className="w-full h-full object-cover rounded-full" />
            </span>
            LATEST NEWS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <div 
                key={item.id} 
                className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group cursor-pointer shadow-lg border border-green-600/20 hover:border-green-600/50"
              >
                <div className="h-48 bg-gray-700 relative overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-green-900/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-sm bg-green-600 px-2 py-1 rounded">{item.date}</div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-green-400 transition-colors duration-300">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.preview}</p>
                  <div className="mt-4 flex justify-end">
                    <span className="text-sm text-green-400 font-semibold flex items-center">
                      READ MORE
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button className="px-8 py-3 bg-transparent border-2 border-green-600 text-green-400 rounded-md font-bold hover:bg-green-600 hover:text-white transition-colors duration-300">
              VIEW ALL NEWS
            </button>
          </div>
        </div>
      </section>
);

};

export default News;
