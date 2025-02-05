import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Pages/Home'
import Explore from './components/Pages/Explore'
import Blog from './components/Pages/Blog'
import Pricing from './components/Pages/Pricing'
import Signin from './components/Pages/Signin'
import Login from './components/Pages/Login'

function App() {

  return (
    <>
      <BrowserRouter>

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

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
