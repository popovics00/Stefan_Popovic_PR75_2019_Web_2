import React from "react";
import axios from 'axios';
import baseUrl from '../components/endpoints';
import User from '../models/user';
import { decodeToken, isExpired } from "react-jwt";


const API_URL = `${baseUrl}` + "user/"; // process.env.API_URL


function isLoggedIn() {
  let token = localStorage.getItem('token');
  if (!token)
  return false;
  return isExpired(token);
}

function logOut() {
  console.log(localStorage.getItem('token'))
  localStorage.removeItem("token");
  window.location.href = "/login";
  };

function getCurrentUser () {
  let token = localStorage.getItem('token');
  if (!token)
    return null;
  return decodeToken(token);
}

const login = async (loginData) => {
  try {
    const response = await axios.post(`https://localhost:63290/api/User/login`, loginData);
    if (response.data.status === 200 || response.data.status ==="OK") {
      localStorage.setItem('token', JSON.stringify(response.data.transferObject));
      return alert("Successfully login");                           //decodedToken.nameid
    }
    return { token: null };
  } catch (error) {
    if (error.response && error.response.status === 401) {
      alert('Invalid email or password');
    } else {
      alert('An error occurred');
    }
    return { token: null };
  }
  
};



const getUsers = async () => {
  try {
    const response = await axios.get(`https://localhost:63290/api/User`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createUser = async (user) => {
  console.log(API_URL + "DADADAADADDADADAAD");
  console.log(JSON.stringify(user) + "prviiiiiii");
  
  try {
    const response = await axios.post(`https://localhost:63290/api/User/register`, user);
    console.log('radi');
    return response.data;
  } catch (error) {
    console.log(error);
    // return null;
  }
};

export default {
  login,
  createUser,
  getUsers,
  logOut,
  getCurrentUser,
  isLoggedIn,
};
