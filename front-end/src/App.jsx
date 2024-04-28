import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/Homepage';
import LoginForm from './components/LoginForm';
import CarService from './components/CarService';
import RegisterForm from './components/RegisterForm';
import NotFound from './components/NotFound';
import Garage from './components/Garage';
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/login',
      element: <LoginForm />,
    },
    {path:'/Cars',
    element:<CarService/>},
    {
      path:'/register',
      element:<RegisterForm/>
    },
    {path:"*",
     element:<NotFound/>
    },
    {
      path:"/garage",
      element:<Garage/>
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;