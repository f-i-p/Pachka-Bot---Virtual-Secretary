import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Root from './Root';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SigninPage from './pages/SigninPage/SigninPage';
import SignupPage from './pages/SignupPage/SignupPage';
import Proverka from './pages/proverka';
import MainPage from './pages/MainPage/MainPage'
import { useState } from 'react';
import { useEffect } from 'react';
import axiosInstance, { setAccessToken } from './axiosInstance';

function App() {
  const [user, setUser] = useState({});
  const [apiToken, setApiToken] = useState('');

  useEffect(() => {
    axiosInstance.get(`/token/refresh`).then((res) => {
      setUser(res.data.user);
      setAccessToken(res.data.accessToken);
    });
  }, []);

  // useEffect(() => {
  //   axiosInstance.get(`/`).then((res) => {
  //     setApiToken(res.data.onlyToken)
  //     console.log('botToken:', res.data.onlyToken)
  //   });
  // }, []);

  useEffect(() => {
    const fetchBotToken = async () => {
      try {
        const response = await axiosInstance.get('/'); 
        setApiToken(response.data.onlyToken);
      } catch (error) {
        console.error('Ошибка при получении токена:', error);
      }
    };
    fetchBotToken();
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root user={user} setUser={setUser} />,
      children: [
         {
          path: '/dashboard',
          element: <MainPage user={user}/>,
        },
        {
          path: '/signin',
          element: <SigninPage setUser={setUser} />,
        },
        {
          path: '/proverka',
          element: <Proverka/>,
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
