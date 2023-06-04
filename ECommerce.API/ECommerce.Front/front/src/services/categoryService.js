import React from "react";
import axios from 'axios';
import baseUrl from '../components/endpoints';
import ProductDataIn from '../models/product';
import { decodeToken, isExpired } from "react-jwt";
import { toast } from 'react-toastify';

const API_URL = `${baseUrl}` + "user/"; // process.env.API_URL


const createProduct = async (productData) => {
  try {
    const response = await axios.post(`https://localhost:63290/api/Product/save`, productData);
    if (response.status == 200 || response.status === "OK") {
      if(response.data.message != "")
        toast.success(response.data.message);
    } 
    else if (response.status === 402) 
      toast.error(response.data.message);
    else
      toast.error("Error ocurred.");
  } catch (error) {
    toast.error(error);
  }
};

const getAllForOption = async () => {
  try {
    const response = await axios.get(`https://localhost:63290/api/Category/GetAllForOption`);
    if (response.status >= 200 && response.status < 300) {
      console.log(response)
      if(response.data.message != "")
        toast.success(response.data.message);

      return response.data.transferObject;
    } else if (response.status === 402) {
      toast.error(response.data.message);
    } else {
      toast.error("Error occurred.");
    }
  } catch (error) {
    toast.error(error.message);
  }
};


export default {
  createProduct,
  getAllForOption,
};