import React from 'react'
import Logo from '../assets/Logo.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex fixed justify-between h-[8vh] w-[100vw] text-black '>
        <div className="Logo_">
            <img src={Logo} alt="Logo" height={200} width={200} className='' />
        </div>

        <div className="Nav_Links_ my-auto">
            <Link to={"/"}>Home</Link>
            <Link to={"/"}>Explore</Link>
            <Link to={"/"}>Travel</Link>
            <Link to={"/"}>Blog</Link>
            <Link to={"/"}>Pricing</Link>
        </div>

        <div className="Profile_SignIn my-auto font-poppins">
            <Link to={"/"}>Login</Link>
            <Link to={"/"}>Sign Up</Link>
        </div>
    </div>
  )
}

export default Navbar