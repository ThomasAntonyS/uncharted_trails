import { Link } from "react-router-dom";

const NotFound = () => {

  document.title = "404_Not Found"

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.pexels.com/photos/38136/pexels-photo-38136.jpeg?auto=compress&cs=tinysrgb&w=1200')" }}
    >

      {/* Error Content Box */}
      <div className="relative h-screen w-screen z-10 flex flex-col items-center justify-center backdrop-blur-md shadow-lg rounded-lg text-center tracking-wide text-white">
        
        <h2 className=" text-2xl sm:text-[2rem] font-semibold tracking-wide uppercase font-libreCaslon">FOG ERROR</h2>
        <h1 className=" text-7xl sm:text-[6rem] font-bold mt-2 font-agdasima">404</h1>
        <p className=" text-2xl sm:text-[3rem] mt-2 font-poppins">Page not found</p>
        <p className=" text-1xl w-[90%] sm:text-[1.5rem] mt-1 font-poppins">I tried to catch some fog, but I missed it</p>

        {/* Back to Home Button */}
        <Link to="/" className="mt-6 sm:text-[1.2rem] px-6 py-2 font-agdasima border border-white text-white rounded-lg hover:bg-white hover:text-black transition">
          Back to Home
        </Link>

        {/* Footer */}
        <p className="mt-6 sm:text-[1.1rem] text-white font-libreCaslon tracking-wide">
          © 2025 Uncharted Trails. All rights reserved
        </p>
      </div>
    </div>
  );
};

export default NotFound;
