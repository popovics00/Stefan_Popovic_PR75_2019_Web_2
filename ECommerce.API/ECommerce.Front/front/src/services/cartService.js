import React from "react";
import baseUrl from '../components/endpoints';
import User from '../models/user';
import { toast } from 'react-toastify';
import axiosInstance from '../helpers/interceptor';
import { Product } from "../models/product";

function addToCart(product) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const existingItemIndex = cartItems.findIndex((item) => item.id == product.id);
  
  if (existingItemIndex !== -1) {
    cartItems[existingItemIndex].count++;
  } else {
    product.count = 1;
    cartItems.push(product);
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  toast.success('Product added to cart!');
}

function truncateCart() {
  localStorage.removeItem("token");
}

const updateCart = async () => {
  try {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var productIds = cartItems.map(function(product) {
      return product.id;
    });
    const response = await axiosInstance.post(`/product/updateCart`, productIds);
    if (response.status >= 200 && response.status < 300) {
      cartItems.forEach(element1 => {
        const matchingElement = response.data.transferObject.find(element2 => element2.id === element1.id);
        if (matchingElement && element1.price != matchingElement.price) {
          element1.price = matchingElement.price
          toast.warn(element1.name + "is updated in the meantime.")
          return false;
        }
      });
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return true;
    } 
    else {
      toast.error("Error with updating cart.");
      return false;
    }
  } catch (error) {
    toast.error(error.message);
  }
};

export default {
  addToCart,
  truncateCart,
  updateCart
};
