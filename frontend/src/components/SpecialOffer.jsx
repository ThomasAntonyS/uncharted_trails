import React from 'react';

const SpecialOffer = () => {

  const cardData = [
    {
      title: 'Lisbon, Portugal',
      price: '€500',
      description: '5 nights and 6 days in a 5-star hotel, breakfast and lunch included. Enjoy popular dining spots and historical tours.',
      imageUrl: 'https://images.pexels.com/photos/2867883/pexels-photo-2867883.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      title: 'Athens, Greece',
      price: '€800',
      description: '5 nights and 6 days in a 5-star hotel, breakfast and lunch included. Visit famous landmarks and museums.',
      imageUrl: 'https://images.pexels.com/photos/3449662/pexels-photo-3449662.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      title: 'Rome, Italy',
      price: '€750',
      description: '5 nights and 6 days in a 5-star hotel, breakfast and lunch included. Explore ancient ruins and authentic cuisine.',
      imageUrl: 'https://images.pexels.com/photos/2928058/pexels-photo-2928058.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        title: 'Rome, Italy',
        price: '€750',
        description: '5 nights and 6 days in a 5-star hotel, breakfast and lunch included. Explore ancient ruins and authentic cuisine.',
        imageUrl: 'https://images.pexels.com/photos/2928058/pexels-photo-2928058.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ];

  return (
    <section className="w-[100vw] h-[85vh] flex flex-col justify-center bg-white">
      {/* Header */}
      <div className=" mb-6 mr-20">
        <h2 className="text-2xl text-right font-libreCaslon tracking-wider md:text-3xl font-semibold text-gray-800 mb-2">Special Offer</h2>
        <div className=' flex justify-end'><p className='w-[8vw] border-2 border-gray-700 text-right'></p></div>
        <p className="text-gray-600 mb-8 mt-3 font-poppins text-right">Check out our special offer and discount</p>
      </div>

      {/* Carousel */}
      <div className="relative w-[80%] mx-auto">

        {/* Cards */}
        <div className="flex overflow-x-auto space-x-4 px-6">
          {cardData.map((card, index) => (
            <div key={index} className="w-72 bg-white rounded-lg overflow-hidden">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${card.imageUrl})` }}></div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{card.title}</h3>
                <p className="text-gray-500 text-sm">{card.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-orange-500 font-semibold text-lg">{card.price}</span>
                  <button className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600">
                    DETAILS
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;