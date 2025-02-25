import './App.css'
import {Routes,Route} from 'react-router-dom'
import Home from './components/Pages/Home'
import Explore from './components/Pages/Explore'
import Blog from './components/Pages/Blog'
import Pricing from './components/Pages/Pricing'
import Signin from './components/Pages/Signin'
import Login from './components/Pages/Login'
import Confirmation from './components/Pages/Confirmation'
import NotFound from './components/Pages/NotFound'
import UserContextProvider from './Context/UserContextProvider'
import Profile from './components/Pages/Profile'

function App() {

  return (
    <> 

      <UserContextProvider>

       <Routes>

          <Route 
          element={<Home/>}
          path='/'
          />

          <Route
          element={<Explore/>}
          path='/explore'
          />

          <Route
          element={<Pricing/>}
          path='/pricing'
          />

          <Route
          element={<Blog/>}
          path='/blog'
          />

          <Route
          element={<Login/>}
          path='/log-in'
          />

          <Route
          element={<Signin/>}
          path='/sign-up'
          />

          <Route
          element={<Confirmation/>}
          path='/sign-up-confirmation'
          />

          <Route
          element={<Profile/>}
          path='/profile'
          />

          <Route path="*" 
          element={<NotFound/>} 
          />

        </Routes>
      </UserContextProvider>
    </>
  )
}

export default App
