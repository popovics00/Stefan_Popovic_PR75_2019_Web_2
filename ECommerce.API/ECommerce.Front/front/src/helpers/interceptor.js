import axios from 'axios';
import { toast } from 'react-toastify';

// Create an instance of Axios with custom configuration
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Replace with your API base URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage["token"];
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
