import React, { useContext, useState } from "react";
import { Link,useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo.webp';
import { FaHome } from "react-icons/fa";
import axios from 'axios';
import {UserContext} from '../../Context/UserContextProvider'

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: "", 
        password: ""
    });
    const [showPassword, setShowPassword] = useState('password')
    const navigate = useNavigate()
    const {setLoggedIn,setUserEmail} = useContext(UserContext)

    document.title = "Uncharted Trails | Login"

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/log-in`, loginData)
            .then((res) => {
                if (res.data === "success") {
                    setLoggedIn(true)
                    setUserEmail(loginData.email)
                    navigate('/')
                } else {
                    alert('Login failed!');
                }
            })
            .catch(err => alert(err));
    };

    const handleShowPassword = ()=>{
        if(showPassword=="text")
            setShowPassword("password")
        else 
            setShowPassword("text")
    }

    return (
        <div className="flex h-screen">
            <div className="flex fixed top-0 justify-between items-center h-[8vh] w-[100vw] bg-black bg-opacity-50 z-[20] px-4 sm:px-8">
                <Link to={"/"} className="Logo_">
                    <img src={Logo} alt="Logo" height={100} width={160} />
                </Link>
                <div className="flex text-white align-middle sm:text-lg font-libreCaslon font-bold bg-black px-2 py-1 rounded-sm bg-opacity-65">
                    <Link to="/" className="flex"><FaHome className="mx-1 my-auto"/>Home</Link>
                </div>
            </div>

            {/* Left Section */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
                <h1 className="text-3xl font-bold mb-2 font-libreCaslon">Welcome back</h1>
                <p className="text-gray-500 mb-6 font-poppins">Login to your account</p>

                <form className="w-full max-w-md" onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <input
                            type="email"
                            placeholder="Email address"
                            onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                            className="w-full font-poppins p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div className="mb-6">
                        <input
                            type={showPassword}
                            placeholder="Password"
                            onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                            className="w-full p-3 font-poppins border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <div className=" flex align-middle w-full mt-1 gap-x-2 font-poppins">
                            <input type="checkbox" onChange={handleShowPassword}/> <p>Show password</p>
                        </div>
                    </div>

                    <button className="w-full font-poppins tracking-wider bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition" type="submit">
                        Log in
                    </button>
                </form>

                <p className="mt-4 text-gray-600 font-poppins">
                    Already have an account ? <Link to='/sign-up' className="text-purple-600 font-poppins tracking-wider underline">Sign in</Link>
                </p>
            </div>

            {/* Right Section */}
            <div className="hidden md:flex w-1/2 bg-purple-200 justify-center items-center">
                <div className=" w-full h-full">
                    <img src="https://images.pexels.com/photos/3621344/pexels-photo-3621344.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Illustration"
                        className="w-full object-cover h-full" />
                </div>
            </div>
        </div>
    );
};

export default Login;
