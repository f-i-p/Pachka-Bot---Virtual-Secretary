import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Root from './Root';
import { createBrowserRouter, RouterProvider, Navigate  } from 'react-router-dom';
import SigninPage from './pages/SigninPage/SigninPage';
import SignupPage from './pages/SignupPage/SignupPage';
import MainPage from './pages/MainPage/MainPage'
import { useState } from 'react';
import { useEffect } from 'react';
import axiosInstance, { setAccessToken } from './axiosInstance';
import ProtectedRoute from './components/HOC/ProtectedRoute';

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axiosInstance.get(`/token/refresh`)
      .then((res) => {
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false); 
      });
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root user={user} setUser={setUser} />,
      children: [
        {
          path: '/',
          element: user ? <Navigate to="/main" /> : <SigninPage setUser={setUser} />,
        },
        {
          path: '/signin',
          element: <SigninPage setUser={setUser} />,
        },
        {
          path: '/signup',
          element: <SignupPage setUser={setUser} />,
        },
        {
          path: '/main',
          element: (
            <ProtectedRoute isAllowed={user !== null}>
              <MainPage user={user} />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  if (loading) return <div>Loading...</div>; 

  return <RouterProvider router={router} />;
}

export default App;
