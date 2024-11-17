import React from 'react';

const DestinationGallery = () => {
  const destinations = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/1546366/pexels-photo-1546366.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/29151366/pexels-photo-29151366/free-photo-of-person-exploring-rocky-river-landscape-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 4,
      image: 'https://images.pexels.com/photos/29153567/pexels-photo-29153567/free-photo-of-enchanting-autumn-path-with-tall-trees.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
  ];

  return (
    <div className="flex flex-col justify-center h-auto w-full mx-auto p-4">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl text-gray-800 font-libreCaslon font-semibold tracking-wide">Destination Gallery</h1>
        <div className="w-20 mx-auto border-2 border-gray-700 mt-1 mb-1"></div>
        <p className="text-gray-600 font-poppins">Our photo gallery of trips around the globe.</p>
      </div>

      {/* Gallery Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto w-[90%]">
        {destinations.map((destination, index) => (
          <div
            key={destination.id}
            className={`h-auto w-full transform transition duration-300 hover:scale-105 ${
              index % 2 === 1 ? 'sm:mt-4 lg:mt-0' : ''
            }`}
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src={destination.image}
                alt={`Destination ${destination.id}`}
                className="w-full h-[40vh] sm:h-[50vh] lg:h-[60vh] object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationGallery;
