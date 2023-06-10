import React from "react";
import baseUrl from '../components/endpoints';
import User from '../models/user';
import { toast } from 'react-toastify';
import axiosInstance from '../helpers/interceptor';
import { Product } from "../models/product";

function addToCart(product) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const existingItemIndex = cartItems.findIndex((item) => item.productId === product.productId);

  if (existingItemIndex !== -1) {
    cartItems[existingItemIndex].count++;
  } else 
  {
    product.count = 1;
    cartItems.push(product);
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  toast.success('Product added to cart!');
}

export default {
  addToCart,
};
