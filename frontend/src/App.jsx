import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Pages/Home'

function App() {

  return (
    <>
      <BrowserRouter>

        <Routes>

          <Route 
          element={<Home/>}
          path='/'
          />

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
