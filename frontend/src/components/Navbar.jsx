import React from 'react'
import Logo from '../assets/Logo.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex fixed justify-between h-[8vh] w-[100vw] bg-black bg-opacity-25 z-[2]'>
        <div className="Logo_ my-auto">
          <img src={Logo} alt="Logo" height={200} width={200} className='ml-[75%]' />
        </div>

        <div className="Nav_Links_ my-auto font-poppins text-[1.1rem] text-white">
            <Link to={"/"} className=' mx-6'>Home</Link>
            <Link to={"/"} className=' mx-6'>Explore</Link>
            <Link to={"/"} className=' mx-6'>Travel</Link>
            <Link to={"/"} className=' mx-6'>Blog</Link>
            <Link to={"/"} className=' mx-6'>Pricing</Link>
        </div>

        <div className="Profile_SignIn my-auto font-poppins text-[1.1rem] text-white mr-[20px]">
            <Link to={"/"} className=' mx-4'>Login</Link>
            <Link to={"/"} className=' mx-4 bg-white text-black px-2 py-1 rounded'>Sign Up</Link>
        </div>
    </div>
  )
}

export default Navbar