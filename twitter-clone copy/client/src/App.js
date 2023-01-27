import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Explore from './pages/Explore/Explore.jsx';
import Signin from './pages/Signin/Signin.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Error from './pages/Error/Error.jsx';

import './App.css';

//creating layout for every page
const Layout = () => {
  return (
    <div className='md:w-8/12 mx-auto'>
      <Navbar />
      <Outlet></Outlet>
    </div>
  )
}

//building routers
const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <Error />,
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/profile/:id',
        element: <Profile />
      },
      {
        path: '/explore',
        element: <Explore />
      },
      {
        path: '/signin',
        element: <Signin />
      },
      {
        path: '/signout',
        element: <Signin />
      }
    ]
  }
])

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
