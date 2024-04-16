import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/Homepage';
import LoginForm from './components/LoginForm';
import CarService from './components/CarService';

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
  ]);

  return <RouterProvider router={router} />;
}

export default App;