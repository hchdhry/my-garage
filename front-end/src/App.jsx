import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Homepage';
import LoginForm from './pages/LoginForm';
import CarService from './pages/CarService';
import RegisterForm from './pages/RegisterForm';
import NotFound from './pages/NotFound';
import Garage from './pages/Garage';
import CommentsPage from './pages/CommentsPage';
import ChatRoom from './pages/ChatRoom';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {path:"/chat/:make",
      element:<ChatRoom/>
    },
    {
      path: '/login',
      element: <LoginForm />,
    },
    {
      path: '/Cars',
      element: <CarService />,
    },
    {
      path: '/register',
      element: <RegisterForm />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/garage",
      element: <Garage />,
    },
    {
      path: "/CommentsPage/:carId",
      element: <CommentsPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;