import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import NotFound from '../Pages/NotFound'
import {blogData} from "../data/data";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const blogId = parseInt(id, 10);

    if (!isNaN(blogId)) {
      window.scrollTo({ top: 0, behavior: "smooth" });

      const foundBlog = blogData.find((b) => b.id === blogId);
      setBlog(foundBlog || null);

      const filteredBlogs = blogData.filter((b) => b.id !== blogId);

      const shuffledBlogs = filteredBlogs.sort(() => 0.5 - Math.random());
      setRelatedPosts(shuffledBlogs.slice(0, 3));
    }
  }, [id]);

  if (!blog) {
    return (
      <NotFound/>
    );
  }

  return (
    <>
      <Navbar />
      <div className="w-full mx-auto bg-white">
        <img 
          src={blog.imageUrl} 
          alt={blog.title} 
          className="h-[50vh] sm:h-[70vh] w-full object-cover mx-auto"
        />

        <div className="mt-10 w-[90vw] sm:w-[80vw] lg:w-[60vw] mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-black font-libreCaslon">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center mt-4 text-black text-sm sm:text-md">
            <span className="font-semibold font-agdasima">{blog.author}</span>
            <span className="mx-2">•</span>
            <span className="font-agdasima font-semibold">{blog.date}</span>
          </div>

          <div className="mt-6 text-black text-md sm:text-lg font-poppins text-justify leading-relaxed">
            {blog.content.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>


          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-6">
              <strong className="font-agdasima">Tags: </strong>
              {blog.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-gray-200 font-poppins text-black px-3 py-1 text-sm rounded mr-2 mt-2 inline-block"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 w-[90vw] sm:w-[80vw] lg:w-[60vw] mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold font-libreCaslon">
            Related posts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {relatedPosts.map((post) => (
              <Link to={`/blog/${post.id}`} key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-48 sm:h-52 object-cover"
                />
                <div className="p-4">
                  <p className="font-semibold text-md sm:text-lg text-black font-libreCaslon">{post.title}</p>
                  <p className="text-sm sm:text-md text-gray-700">{post.description}</p>
                  <p className="text-sm sm:text-md font-semibold text-gray-800 mt-2 font-libreCaslon">{post.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleBlog;
