import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/menu.css";
import MenuItem from "./menuItem";
import userServices from "../../services/userServices";
import { toast } from "react-toastify";
import { FaShoppingCart } from 'react-icons/fa';
import cartService from '../../services/cartService'
import CartSidebar from '../../components/cart/cart-sidebar'
import React, { useState } from "react";

function useLogout() {
  const navigate = useNavigate();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const openCartModal = () => {
    setIsCartModalOpen(true);
  };

  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.sessionStorage.clear();
    navigate("/login");
  }

  return { logout, openCartModal, closeCartModal, isCartModalOpen };
}

function ShowLogOut() {
  const { logout } = useLogout();
  const user = userServices.getCurrentUser();
  
  return (
    <>
      {user != null ? (
        <div className="item-wrapper" onClick={logout}>
          <span className="item">Odjavi se</span>
        </div>
      ) : null}
    </>
  );
}

function Menu() {
  const { logout, openCartModal, closeCartModal, isCartModalOpen } = useLogout();
  const user = userServices.getCurrentUser();
  
  return (
    <>
      {user != null ? (
        <div className="menu-wrapper">
          <div className="menu-right">
            <MenuItem item="Profil" path="profil" role={["Customer","Saler","Admin"]}/>
            <MenuItem item="Profil" path="profil" role={["Customer","Saler","Admin"]}/>
            <ShowLogOut/>
          </div>
          <div className="menu-header">
            <img className="login-photo" src={require("../../images/logo.png")}/>
          </div>
          <div className="menu-left">
            <MenuItem item="Prodavnica" path="glavna-prodavnica" role={["Customer","Saler","Admin"]}/>
            <MenuItem item="Prodavnica" path="glavna-prodavnica" role={["Customer","Saler","Admin"]}/>
            <MenuItem item="Prodavnica" path="glavna-prodavnica" role={["Customer","Saler","Admin"]}/>
            <div className="cart-icon">
              <FaShoppingCart onClick={openCartModal}/>
            </div>
            <ShowLogOut />
          </div>
          {isCartModalOpen && <CartSidebar onClose={closeCartModal} />}
        </div>
      ) : null}
    </>
  );
}

export default Menu;
