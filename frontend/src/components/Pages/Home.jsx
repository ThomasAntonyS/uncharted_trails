import React from 'react'
import Navbar from '../Navbar'
import Hero from '../Hero'
import Popular_Dest from '../Popular_Dest'
import SpecialOffer from '../SpecialOffer'
import BlogSection from '../BlogSection'
import DestinationGallery from '../DestinationGallery'
import Footer from '../Footer'

const Home = () => {

  return (

    <>
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