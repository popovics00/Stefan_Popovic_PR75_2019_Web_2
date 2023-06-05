import React from 'react';
import { Style } from '../../styles/cart.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function CartSidebar({ onClose }) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== productId);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handleCartClose = () => {
    onClose();
  };

  return (
    <div className="sidebar">
      <div className="row">
        <div className="col-md-6">
          <h2 className="sidebar-title">CART ({cartItems.length})</h2>
        </div>
        <div className="col-md-6 text-right">
          <span className="close-button" onClick={handleCartClose}>
            CLOSE
          </span>
        </div>
      </div>
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Vaša korpa je prazna.</p>
      ) : (
        <ul className="cart-items-list">
          {cartItems.map((item) => (
            <li className="cart-item row" key={item?.id}>
              <div className="col-md-2 col1">
                <img className="cart-item-image" src={item?.images} alt="Product" />
              </div>
              <div className="col-md-8 col2">
                <div className="item-details">
                  <h3 className="item-name">{item?.name}</h3>
                  <p className="item-price">{item?.price} RSD x {item?.count}</p>
                </div>
              </div>
              <div className="col-md-2 text-right">
                <button className="remove-button" onClick={() => removeFromCart(item?.id)}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  
  
  
}

export default CartSidebar;
