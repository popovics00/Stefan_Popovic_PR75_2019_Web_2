import logo from './logo.svg';
import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import Menu from "./components/menu-component/menu";
import Register from "./components/register";
import Login from "./components/login";
import userServices from "./services/userServices";
import ProductTable from './components/product-comp/product-table';
import HomePage from './components/home';
import Checkout from './components/cart/checkout'
import EditProfile from './components/user/edit-profile';
import UserTable from './components/user/user-table';
import OrderTable from './components/order/order-table';

function App() {

  const currentUser = userServices.getCurrentUser();

  if(currentUser == null) // NE ULOGOVANI KORISNIK
  {
    return (
    <>
     <div className="main-container">
        <Menu />
        <Routes>
          <Route path="" element={<Login/>} />
          <Route path="login" element={<Login/>} />
          <Route path="register" element={<EditProfile/>} />
        </Routes>
      </div>
    </>
    );
  }
  else if(currentUser.role=='Customer')
  {
    return (
    <>
     <div className="main-container">
        <Menu />
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="checkout" element={<Checkout/>} />
          <Route path="edit-profile" element={<Register/>} />
          <Route path="products" element={<ProductTable/>} />
          <Route path="users" element={<UserTable/>} />
          <Route path="orders" element={<OrderTable/>} />
        </Routes>
      </div>
    </>
    );
  }
  else if(currentUser.role=='Saler')
  {
    return (
    <>
     <div className="main-container">
        <Menu />
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="products" element={<ProductTable/>} />
          <Route path="checkout" element={<Checkout/>} />
        </Routes>
      </div>
    </>
    );
  }
  else if(currentUser.role=='Admin')
  {
    return (
    <>
     <div className="main-container">
        <Menu />
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="products" element={<ProductTable/>} />
          <Route path="checkout" element={<Checkout/>} />
        </Routes>
      </div>
    </>
    );
  }
}

export default App;
