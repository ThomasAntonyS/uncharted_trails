import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const blogPost = {
  title: "Exploring Kota Lama, Semarang",
  author: "Aliko Sunuwang",
  date: "August 25, 2025",
  image: "https://source.unsplash.com/1000x500/?heritage",
  content: `Jatuh cinta pada pandangan pertama mungkin adalah kata yang paling tepat untuk menggambarkan perasaan saya kepada Kota Lama di Semarang. Walau panasnya bukan main, kunjungan pertama saya ke Kota Lama mampu menimbulkan kesan yang tak terlupakan. 

Kota Lama ini unik. Berkunjung ke sana, kita akan selalu dipaksa untuk hidup ke masa lalu melalui bangunan-bangunan tua peninggalan pemerintah Hindia Belanda yang masih indah berdiri dengan kokoh. Salah satunya adalah Gereja Blendug. Gereja ini sekaligus menjadi landmark utama di Kota Lama.

Gereja Blendug dan sekitarnya merupakan kawasan paling ramai di Kota Lama. Sisi lain Kota Lama juga menawarkan banyak objek-objek menarik untuk wisatawan.`,
  tags: ["demo", "travel", "heritage"],
};

const relatedPosts = [
  { id: 1, title: "Discovering Old Town Jakarta", image: "https://images.pexels.com/photos/2587004/pexels-photo-2587004.jpeg?auto=compress&cs=tinysrgb&w=600",date:"November 10, 2024" },
  { id: 2, title: "A Walk Through Yogyakarta's History", image: "https://images.pexels.com/photos/5101155/pexels-photo-5101155.jpeg?auto=compress&cs=tinysrgb&w=600",date:"March 13, 2023" },
  { id: 3, title: "Surabaya's Hidden Gems", image: "https://images.pexels.com/photos/1109896/pexels-photo-1109896.jpeg?auto=compress&cs=tinysrgb&w=600",date:"June 20, 2003" },
];

const SingleBlog = () => {
  return (
    <>
        <Navbar/>

        <div className="w-screen mx-auto bg-white">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuub1qqprhrAi5nC5Yol6grcv1y4xblegZKA&s" alt={blogPost.title} className="w-full h-[60vh] object-cover" />
          <div className="mt-16 w-[90vw] mx-auto sm:w-[70vw]">
            <h1 className="text-4xl font-bold text-black font-libreCaslon">{blogPost.title}</h1>
            <div className="flex items-center mt-4 text-black text-md">
              <span className="font-semibold font-agdasima">{blogPost.author}</span>
              <span className="mx-2">•</span>
              <span className=" font-agdasima">{blogPost.date}</span>
            </div>
            <p className="mt-6 text-black whitespace-pre-line font-poppins text-justify">{blogPost.content}</p>
            <div className="mt-4">
              <strong className=" font-agdasima">Tags: </strong>
              {blogPost.tags.map((tag, index) => (
                <span key={index} className="bg-gray-200 font-poppins text-black px-2 py-1 text-sm rounded mr-2">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-10 w-[90vw] sm:w-[70vw] mx-auto">
            <h2 className="text-2xl font-semibold font-libreCaslon">Related posts</h2>
            <Link className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              {relatedPosts.map((post) => (
                <div key={post.id} className="bg-white shadow-md">
                  <img src={post.image} alt={post.title} className="w-full h-52 object-cover" />
                  <p className="my-2 font-semibold text-md text-black px-4 font-libreCaslon">{post.title}</p>
                  <p className="my-2 font-semibold text-md text-gray-800 px-4 font-libreCaslon">{post.date}</p>
                </div>
              ))}
            </Link>
          </div>
        </div>

        <Footer/>
    </>
  );
};

export default SingleBlog;
