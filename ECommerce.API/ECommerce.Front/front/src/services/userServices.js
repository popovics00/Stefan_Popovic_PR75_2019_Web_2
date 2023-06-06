import axios from 'axios';
import { decodeToken, isExpired } from "react-jwt";
import { toast } from 'react-toastify';

function isLoggedIn() {
  let token = localStorage.getItem('token');
  if (!token || isExpired(token)) {
    return false;
  }
}

function logOut() {
  localStorage.removeItem("token");
  // toast.warn('Success logout!');
  // window.location.reload(true);
  window.location.href = "/";
  toast.warn('Success logout!');
}

function getCurrentUser() {
  let token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  return decodeToken(token);
}

const login = async (loginData) => {
  try {
    const response = await axios.post(`https://localhost:63290/api/User/login`, loginData);
    if ((response.status == 200 || response.status === "OK") && response.data.status == 200) {
      localStorage.setItem('token', JSON.stringify(response.data.transferObject));
      // window.location.reload(true);
      window.location.href = "/";
      toast.success(response.data.message);
    } else {
      toast.warn("Error ocurred.");
    }
  } catch (error) {
    toast.error(error);
  }
};

const createUser = async (user) => {
  try {
    const response = await axios.post(`https://localhost:63290/api/User/register`, user);
    if ((response.status == 200 || response.status === "OK") && response.data.result.status == 200) {
      window.location.reload(true);
      window.location.href = "/";
      toast.success(response.data.result.message);
    } else {
      toast.warn(response.data.result.message);
    }
  } catch (error) {
    toast.success(error);
  }
};

const userServices = {
  login,
  createUser,
  logOut,
  getCurrentUser,
  isLoggedIn
};

export default userServices;
