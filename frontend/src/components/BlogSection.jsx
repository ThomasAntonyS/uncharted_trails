import React from 'react'

const BlogSection = () => {
    return (
        <section className="p-6 bg-white rounded-lg max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl text-gray-800 font-bold font-libreCaslon tracking-wider">Our Experience Stories</h2>
            <div className=' flex justify-center'><p className='w-[12vw] mt-1 mb-1 border-2 border-gray-700'></p></div>
            <p className="text-gray-600 font-poppins tracking-wider">You will find the incredible experience in the world</p>
          </div>
    
          {/* Content */}
          <div className="flex flex-col h-[80vh] w-[60vw] md:flex-row items-center md:items-start">
            <div className="h-[100%] w-[40%] md:w-1/2 mb-4 md:mb-0">
              <img 
                src="https://images.pexels.com/photos/3757139/pexels-photo-3757139.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Beautiful Italy" 
                className="rounded-lg w-full object-cover md:h-full" 
              />
            </div>
    
            <div className=" w-[60%] my-auto text-justify md:w-1/2 md:pl-8">
              <h3 className="text-xl font-semibold mb-4 font-agdasima tracking-wider">Beautiful Italy<br/>Let's travel</h3>
              <p className="text-gray-600 mb-6 font-poppins tracking-wider">
                But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.
                No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues.
              </p>
              <a href="#" className="text-orange-500 font-semibold hover:underline">
                Read More &rarr;
              </a>
            </div>
          </div>
        </section>
      );
}

export default BlogSection