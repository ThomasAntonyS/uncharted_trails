import React from 'react'
import Hero from '../Hero'
import Popular_Dest from '../Popular_Dest'
import SpecialOffer from '../SpecialOffer'
import BlogSection from '../BlogSection'
import DestinationGallery from '../DestinationGallery'
import Footer from '../Footer'
import Navbar from '../Navbar'
import AlertBox from '../AlertBox'

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