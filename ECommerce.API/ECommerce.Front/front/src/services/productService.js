import React from "react";
import axios from 'axios';
import ProductDataIn from '../models/product';
import { decodeToken, isExpired } from "react-jwt";
import { toast } from 'react-toastify';

const createProduct = async (productData) => {
  try {
    const response = await axios.post('https://localhost:63290/api/Product/save', productData);
    if (response.status === 200 || response.status === 'OK') {
      if (response.data.message !== '') {
        toast.success(response.data.message);
      }
    } else if (response.status === 402) {
      toast.error(response.data.message);
    } else {
      toast.error('An error occurred.');
    }
  } catch (error) {
    toast.error(error.message);
  }
};

const getAll = async (getData) => {
  try {
    const response = await axios.post(`https://localhost:63290/api/Product/getall`, getData);
    if (response.status >= 200 && response.status < 300) {
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

const productService = {
  createProduct,
  getAll
};


export default productService;