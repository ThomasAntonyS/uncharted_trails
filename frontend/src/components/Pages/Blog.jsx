import React from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";

const Blog = () => {
  const blogs = [
    {
      id: 1,
      title: "Unwind in Bali's Tropical Paradise",
      description:
        "Escape to Bali, where lush landscapes meet serene beaches and vibrant culture.",
      imageUrl: "https://images.pexels.com/photos/2587004/pexels-photo-2587004.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "November 10, 2024",
    },
    {
      id: 2,
      title: "Paris: Romance and Elegance",
      description:
        "Experience the timeless charm of Paris, from iconic landmarks to quaint streets.",
      imageUrl: "https://images.pexels.com/photos/5101155/pexels-photo-5101155.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "November 12, 2024",
    },
    {
      id: 3,
      title: "Patagonia's Wilderness Wonders",
      description:
        "Embark on an adventure through Patagonia's breathtaking glaciers and mountains.",
      imageUrl: "https://images.pexels.com/photos/23886059/pexels-photo-23886059/free-photo-of-clouds-covering-snowcapped-mountain-peaks-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "November 15, 2024",
    },
    {
      id: 4,
      title: "Safari Magic in Kenya",
      description:
        "Get up close with wildlife and explore the savannahs of Kenya.",
      imageUrl: "https://images.pexels.com/photos/1109896/pexels-photo-1109896.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "November 17, 2024",
    },
    {
      id: 5,
      title: "Japan's Seasonal Splendor",
      description:
        "Discover the harmony of nature and culture in Japan, from cherry blossoms to Mt. Fuji.",
      imageUrl: "https://images.pexels.com/photos/5503656/pexels-photo-5503656.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "November 19, 2024",
    },
    {
      id: 6,
      title: "The Swiss Alps Adventure",
      description:
        "Immerse yourself in the majestic beauty of the Swiss Alps, a haven for hikers.",
      imageUrl: "https://images.pexels.com/photos/14963419/pexels-photo-14963419/free-photo-of-trees-around-village-in-valley-in-mountains.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "November 21, 2024",
    },
    {
      id: 7,
      title: "Tropical Bliss in the Maldives",
      description:
        "Relax on pristine beaches and dive into crystal-clear waters in the Maldives.",
      imageUrl: "https://images.pexels.com/photos/12858509/pexels-photo-12858509.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "November 23, 2024",
    },
  ];

  return (
    <>
        <Navbar/>

        <section className="mb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
              {/* Heading */}
              <div className="text-center mb-12 ">
                <h2 className="text-[3rem] font-bold text-gray-800 font-libreCaslon tracking-wide">
                  Latest News and Blogs
                </h2>
                <p className="text-gray-600 mt-2 font-poppins">
                  You can rely on our amazing features list and customer services to
                  have the best experience.
                </p>
              </div>

              {/* Blogs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog, index) => (
                  <Link to={"/"}
                    key={blog.id}
                    className={`rounded-lg overflow-hidden shadow-lg ${
                      index === 0 ? "md:col-span-2 lg:col-span-2 h-auto" : ""
                    }`}
                  >
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className={`w-full ${
                        index === 0 ? "h-96 object-cover" : "h-56 object-cover"
                      }`}
                    />
                    <div className="p-6 bg-white">
                      <p className="text-sm text-gray-500">
                        {blog.author} • {blog.date}
                      </p>
                      <h3 className="text-lg font-semibold text-gray-800 mt-2">
                        {blog.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
        </section>

        <Footer/>
    </>
  );
};

export default Blog;
