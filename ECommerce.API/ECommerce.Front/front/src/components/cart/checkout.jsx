import React, { useState, useEffect } from 'react';
import { Style } from '../../styles/checkout.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import orderService from '../../services/orderService'
import cartService from '../../services/cartService';
function Checkout() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [comment, setComment] = useState('');
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Kreiraj objekat sa podacima porudžbine
    const order = {
      firstName,
      lastName,
      address,
      phoneNumber,
      paymentMethod,
      deliveryMethod,
      cartItems,
      comment
    };
    orderService.makeOrder(order)
    orderService.makeOrder(order)

    setFirstName('');
    setLastName('');
    setAddress('');
    setPhoneNumber('');
    setPaymentMethod('');
    setDeliveryMethod('');
  };
  

  return (
    <div class="checkout">
    <div class="container-fluid pt-5">
        <div class="row">
            <div class="col-md-6">
                <div class="mb-4">
                    <h4 class="font-weight-semi-bold mb-4">Billing Address</h4>
                    <div class="row">
                        <div class="col-md-6 form-group">
                            <label>First Name</label>
                            <input class="form-control" type="text" placeholder="John" value={firstName} onChange={handleFirstNameChange} />
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Last Name</label>
                            <input class="form-control" type="text" placeholder="Doe" value={lastName} onChange={handleLastNameChange}/>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Mobile No</label>
                            <input class="form-control" type="text" placeholder="+123 456 789" onChange={handlePhoneNumberChange}/>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Address Line 1</label>
                            <input class="form-control" type="text" placeholder="123 Street" onChange={handleAddressChange}/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card border-secondary mb-5">
                    <div class="card-header bg-secondary border-0">
                        <h4 class="font-weight-semi-bold m-0">Order Total</h4>
                    </div>
                    <div class="card-body">
                        <h5 class="font-weight-medium mb-3">Products</h5>
                        {cartItems.map((item) => (
                            <div class="d-flex justify-content-between">
                                <p>{item?.name}</p>
                                <p><span>{item?.count} x</span> <b>{item?.price} RSD</b></p>
                        </div>))}
                    </div>
                    
                    <div class="card-footer border-secondary bg-transparent">
                        <div class="d-flex justify-content-between mt-2">
                            <h5 class="font-weight-bold">Total</h5>
                            <h5 class="font-weight-bold">{calculateTotal()} RSD</h5>
                        </div>
                    </div>
                </div>
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
        </div>
    </div>
    </div>
  );
}

export default Checkout;
