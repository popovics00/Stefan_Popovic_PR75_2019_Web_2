import axios from 'axios';
import baseUrl from '../components/endpoints';
import User from '../models/user'
import { decodeToken, useJwt } from "react-jwt";

const API_URL = `${baseUrl}`+ "user/";                   //process.env.API_URL 

const login = async (loginData) => {
    try {
      const response = await axios.post(`https://localhost:7218/api/User/login`, loginData);
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
        const token = response.data.token;
        const decodedToken = decodeToken(token);
        return decodedToken.nameid;
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
    const response = await axios.get(`https://localhost:7218/api/User`);
    return response.data;
  }

const createUser = async (user) => {
  console.log(API_URL + "DADADAADADDADADAAD")
  console.log("dddddddddddddddddddddddddddddddddddddddddddd")
  console.log(JSON.stringify(user)+"prviiiiiii")
  const response = await axios.post(`https://localhost:7218/api/User/save`, user);
  return response.data;
}
export default {
  login,
  createUser,
  getUsers
};