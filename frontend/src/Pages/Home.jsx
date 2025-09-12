import React from 'react'
import Hero from '../components/Hero'
import Popular_Dest from '../components/Popular_Dest'
import SpecialOffer from '../components/SpecialOffer'
import BlogSection from '../components/BlogSection'
import DestinationGallery from '../components/DestinationGallery'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import AlertBox from '../components/AlertBox'

const Home = () => {

  document.title = "Uncharted Trails | Home"

  return (

    <>
      <AlertBox/>
      <Navbar/>
      <Hero/>
      <Popular_Dest/>
      <SpecialOffer/>
      <BlogSection/>
      <DestinationGallery/>
      <Footer/>
    </>

  )

}

export default Home