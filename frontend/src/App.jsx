import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Pages/Home'
import Explore from './components/Pages/Explore'
import Blog from './components/Pages/Blog'
import Pricing from './components/Pages/Pricing'

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

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
