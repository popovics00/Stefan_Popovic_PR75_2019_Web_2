import React, { useState } from 'react';
import { Style } from '../../styles/cart.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function CartSidebar({ onClose }) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  const [cartQuantity, setCartQuantity] = useState(
    cartItems.reduce((total, item) => total + item.count, 0)
  );

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== productId);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    setCartQuantity(prevQuantity => prevQuantity - 1);
  };

  const increaseQuantity = (productId) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === productId) {
        return { ...item, count: item.count + 1 };
      }
      return item;
    });
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    setCartQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = (productId) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === productId && item.count > 1) {
        return { ...item, count: item.count - 1 };
      }
      return item;
    });
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    setCartQuantity(prevQuantity => prevQuantity - 1);
  };

  const handleCartClose = () => {
    onClose();
  };

  return (
    <div className="sidebar">
      <div className="row">
        <div className="col-md-6">
          <h2 className="sidebar-title">CART ({cartQuantity})</h2>
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
              <div className="col-md-6 col2">
                <div className="item-details">
                  <h3 className="item-name">{item?.name}</h3>
                  <div className="quantity-controls">
                    <button className="quantity-button decrease" onClick={() => decreaseQuantity(item?.id)}>-</button>
                    <span className="item-quantity">{item?.count}</span>
                    <button className="quantity-button increase" onClick={() => increaseQuantity(item?.id)}>+</button>
                  </div>
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
