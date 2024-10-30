import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_API}`, //! http://localhost:3000/api/v1
  withCredentials: true 
});

let accessToken = '';

function setAccessToken(newToken) {
  accessToken = newToken;
}

//! interceptor - перехватчик

axiosInstance.interceptors.request.use((config) => {
  config.withCredentials = true;
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export { setAccessToken };

export default axiosInstance;
