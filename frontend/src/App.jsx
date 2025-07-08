import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Pages/Home';
import Explore from './components/Pages/Explore';
import Blog from './components/Pages/Blog';
import Pricing from './components/Pages/Pricing';
import Signin from './components/Pages/Signin';
import Login from './components/Pages/Login';
import Confirmation from './components/Pages/Confirmation';
import NotFound from './components/Pages/NotFound';
import UserContextProvider from './Context/UserContextProvider';
import Profile from './components/Pages/Profile';
import SingleBlog from './components/SingleBlog';
import AlertBox from './components/AlertBox';
import ResetPassword from './components/Pages/ResetPassword';

function App() {
    return (
        <UserContextProvider>
          <AlertBox/>
          <AppRoutes /> 
        </UserContextProvider>
    );
}

function AppRoutes() {
  const authToken = sessionStorage.getItem("authToken")
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
            element={authToken ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path='/sign-up'
            element={authToken ? <Navigate to="/" replace /> : <Signin />}
          />
          <Route
            element={<Confirmation />}
            path='/sign-up-confirmation'
          />
          <Route
            element={authToken ? <Profile /> : <Navigate to="/" replace/>}
            path='/profile'
          />
          <Route
            element={<SingleBlog />}
            path='/blog/:id'
          />
          <Route
            element={<ResetPassword/>}
            path='/reset-password'
          />
          <Route path="*"
            element={<NotFound />}
          />
      </Routes>
  );
}

export default App;