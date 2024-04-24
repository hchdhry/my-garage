import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/Homepage';
import LoginForm from './components/LoginForm';
import CarService from './components/CarService';
import RegisterForm from './components/RegisterForm';
import NotFound from './components/NotFound';
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
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;