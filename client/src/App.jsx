import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Root from './Root';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SigninPage from './pages/SigninPage/SigninPage';
import SignupPage from './pages/SignupPage/SignupPage';
import MainPage from './pages/MainPage/MainPage'
import { useState } from 'react';
import { useEffect } from 'react';
import axiosInstance, { setAccessToken } from './axiosInstance';

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    axiosInstance.get(`/token/refresh`).then((res) => {
      setUser(res.data.user);
      setAccessToken(res.data.accessToken);
    });
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root user={user} setUser={setUser} />,
      children: [
         {
          path: '/',
          element: <MainPage user={user}/>,
        },
        {
          path: '/signin',
          element: <SigninPage setUser={setUser} />,
        },
        {
          path: '/signup',
          element: <SignupPage setUser={setUser} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
