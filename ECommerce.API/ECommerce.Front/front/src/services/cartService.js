import React from "react";
import axios from 'axios';
import baseUrl from '../components/endpoints';
import User from '../models/user';
import { decodeToken, isExpired } from "react-jwt";
import { toast } from 'react-toastify';

const API_URL = `${baseUrl}` + "user/"; // process.env.API_URL


function addToCart(product) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems.push(product);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  toast.success('Product added to cart!');
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
    if (response.status == 200 || response.status === "OK") {
      toast.success(response.data.message);
      localStorage.setItem('token', JSON.stringify(response.data.transferObject));
    } 
    else if (response.status === 402) 
      toast.error(response.data.message);
    else
      toast.error("Error ocurred.");
  } catch (error) {
    toast.success(error);
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
  addToCart,
};
