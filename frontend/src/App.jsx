import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/pages/Home';
import Explore from './components/pages/Explore';
import Blog from './components/pages/Blog';
import Pricing from './components/pages/Pricing';
import Signin from './components/pages/Signin';
import Login from './components/pages/Login';
import Confirmation from './components/pages/Confirmation';
import NotFound from './components/pages/NotFound';
import UserContextProvider, { UserContext } from './Context/UserContextProvider';
import Profile from './components/pages/Profile';
import SingleBlog from './components/SingleBlog';
import { useContext } from 'react';
import AlertBox from './components/AlertBox';

function App() {
    return (
        <UserContextProvider>
          <AlertBox/>
          <AppRoutes /> 
        </UserContextProvider>
    );
}

function AppRoutes() {
  const { loggedIn } = useContext(UserContext);
  return (
      <Routes>
          <Route
            element={<Home />}
            path='/'
          />
          <Route
            element={<Explore />}
            path='/explore'
          />
          <Route
            element={<Pricing />}
            path='/pricing'
          />
          <Route
            element={<Blog />}
            path='/blog'
          />
          <Route
            path='/log-in'
            element={loggedIn ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path='/sign-up'
            element={loggedIn ? <Navigate to="/" replace /> : <Signin />}
          />
          <Route
            element={<Confirmation />}
            path='/sign-up-confirmation'
          />
          <Route
            element={loggedIn? <Profile /> : <Navigate to="/" replace/>}
            path='/profile'
          />
          <Route
            element={<SingleBlog />}
            path='/blog/:id'
          />
          <Route path="*"
            element={<NotFound />}
          />
      </Routes>
  );
}

export default App;