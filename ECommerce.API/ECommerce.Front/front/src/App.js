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
          <Route path="register" element={<Register/>} />
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
