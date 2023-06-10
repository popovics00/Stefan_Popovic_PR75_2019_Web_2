import React, { useState, useEffect } from 'react';
import { Style } from '../../styles/checkout.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import orderService from '../../services/orderService'
import cartService from '../../services/cartService';
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import userServices from '../../services/userServices';

function Checkout() {
  const currentUser = userServices.getCurrentUser();
  const [firstName, setFirstName] = useState(currentUser.name || '');
  const [lastName, setLastName] = useState(currentUser.lastName || '');
  const [address, setAddress] = useState(currentUser.address || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState({});
  cartService.updateCart();
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const navigate = useNavigate();



  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.count;
    });
    return total;
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    if(!cartService.updateCart())
    {
      toast.error('Please check again product list.');
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      navigate('/checkout')
      return null;
    }

    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const order = {
      firstName,
      lastName,
      address,
      phoneNumber,
      paymentMethod,
      deliveryMethod,
      cartItems,
      comment,
    };

    try{
      const ret = await orderService.makeOrder(order);
      if(ret.status == 200){
        toast.success(ret.message)
        navigate('/')
      }
      else if(ret.status==400){
        toast.warn(ret.message)
        cartService.updateCart();
      }
      else{
        toast.warn(ret.message)
      }
    } catch (error) {
      toast.error('Error ocurred: ' + error)
    }    

    //reset
    setFirstName('');
    setLastName('');
    setAddress('');
    setPhoneNumber('');
    setPaymentMethod('');
    setDeliveryMethod('');
    setErrors({});
  };

  const validateForm = () => {
    const errors = {};

    if (firstName.trim() === '') {
      errors.firstName = 'First Name is required';
    }

    if (lastName.trim() === '') {
      errors.lastName = 'Last Name is required';
    }

    if (address.trim() === '') {
      errors.address = 'Address is required';
    }

    if (phoneNumber.trim() === '') {
      errors.phoneNumber = 'Phone Number is required';
    }

    return errors;
  };

  return (
    <div class="checkout">
      <div class="container-fluid pt-5">
        <div class="row">
          <div class="col-md-6 leftSide">
            <div class="mb-4">
              <h4 class="shippingDetailsTitle">SHIPPING DETAILS</h4>
              <div class="row">
                <div class="col-md-6 form-group">
                  <label>First Name</label>
                  <input
                    class="form-control"
                    type="text"
                    placeholder=""
                    onChange={handleFirstNameChange}
                    value={firstName}
                  />
                  {errors.firstName && (
                    <p className="error">{errors.firstName}</p>
                  )}
                </div>
                <div class="col-md-6 form-group">
                  <label>Last Name</label>
                  <input
                    class="form-control"
                    type="text"
                    placeholder=""
                    onChange={handleLastNameChange}
                    value={lastName}
                  />
                  {errors.lastName && <p className="error">{errors.lastName}</p>}
                </div>
                <div class="col-md-6 form-group">
                  <label>Mobile No</label>
                  <input
                    class="form-control"
                    type="text"
                    placeholder=""
                    onChange={handlePhoneNumberChange}
                    value={phoneNumber}
                  />
                  {errors.phoneNumber && (
                    <p className="error">{errors.phoneNumber}</p>
                  )}
                </div>
                <div class="col-md-6 form-group">
                  <label>Address</label>
                  <input
                    class="form-control"
                    type="text"
                    placeholder=""
                    onChange={handleAddressChange}
                    value={address}
                  />
                  {errors.address && <p className="error">{errors.address}</p>}
                </div>
              </div>
              <div class="row">
                <label>Comment</label>
                <textarea name="comment" onChange={handleCommentChange}></textarea>
                <button className="submitOrderButton" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-6 rightSide">
            <div class="card border-secondary mb-5">
              <div class="card-header bg-secondary border-0">
                <h4 class="orderDetailsTitle">ORDER DETAILS</h4>
              </div>
              <div class="card-body">
                {cartItems.map((item) => (
                  <div class="d-flex justify-content-between">
                    <p>{item?.name}</p>
                    <p>
                      <span>{item?.count} x</span> <b>{item?.price} RSD</b>
                    </p>
                  </div>
                ))}
              </div>

              <div class="card-footer border-secondary bg-transparent">
                <div class="d-flex justify-content-between mt-2">
                  <h5 class="font-weight-bold">Total</h5>
                  <h5 class="font-weight-bold">{calculateTotal()} RSD</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
