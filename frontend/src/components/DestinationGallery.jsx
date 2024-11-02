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
    <div className="flex flex-col justify-center max-w-7xl h-[90vh] mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-4xl text-gray-800 font-libreCaslon font-semibold tracking-wide">Destination Gallery</h1>
        <div className="w-[30vh] border-2 border-gray-700 mt-1 mb-1"></div>
        <p className="text-gray-600 font-poppins">Our photo gallery on trip.</p>
      </div>
      <div className="flex flex-wrap w-[80vw] h-[70%] justify-center">
        {destinations.map((destination, index) => (
          <div
            key={destination.id}
            className={`h-full sm:w-1/2 lg:w-1/4 ${
              index % 2 === 1 ? '-mt-4' : ''
            }`}
          >
            <div className="bg-white w-[90%] h-full rounded-lg overflow-hidden">
              <img src={destination.image} alt={`Destination ${destination.id}`} className="w-full h-full object-cover" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationGallery;
