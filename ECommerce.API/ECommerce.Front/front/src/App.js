import logo from './logo.svg';
import './App.css';
import Dashboard from "./components/dashboard";
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
  console.log(currentUser)
  // if(currentUser == null)
  // {
  //   return (
  //   <>
  //    <div className="main-container">
  //       <Menu />
  //       <Routes>
  //         <Route path="" element={<Login/>} />
  //         <Route path="login" element={<Login/>} />
  //         <Route path="register" element={<Register/>} />
  //           <Route path="add-product" element={<AddProduct/>} />
  //           <Route path="products" element={<ProductTable/>} />
  //           <Route path="Home" element={<Home/>} />

  //       </Routes>
  //     </div>
  //   </>
  //   );
  // }
  // else if(currentUser.role=='Customer')
  // {
  //   return (
  //   <>
  //    <div className="main-container">
  //       <Menu />
  //       <Routes>
  //         <Route path="" element={<Dashboard />} />
  //         <Route path="login" element={<Login />} />
  //         <Route path="register" element={<Register />} />
  //           <Route path="add-product" element={<AddProduct/>} />
  //           <Route path="products" element={<ProductTable/>} />
  //           <Route path="Home" element={<Home/>} />

  //       </Routes>
  //     </div>
  //   </>
  //   );
  // }
  // else if(currentUser.role=='Saler')
  // {
  //   return (
  //   <>
  //    <div className="main-container">
  //       <Menu />
  //       <Routes>
  //         <Route path="" element={<Dashboard />} />
  //         <Route path="login" element={<Login />} />
  //         <Route path="register" element={<Register />} />
  //           <Route path="add-product" element={<AddProduct/>} />
  //           <Route path="products" element={<ProductTable/>} />
  //           <Route path="Home" element={<Home/>} />

  //       </Routes>
  //     </div>
  //   </>
  //   );
  // }
  // else if(currentUser.role=='Admin')
  // {
  //   return (
  //   <>
  //    <div className="main-container">
  //       <Menu />
  //       <Routes>
  //         <Route path="" element={<Dashboard />} />
  //         <Route path="login" element={<Login />} />
  //         <Route path="register" element={<Register />} />
  //           <Route path="add-product" element={<AddProduct/>} />
  //           <Route path="products" element={<ProductTable/>} />
  //           <Route path="Home" element={<Home/>} />

  //       </Routes>
  //     </div>
  //   </>
  //   );
  // }
  return (
    <>
     <div className="main-container">
        <Menu />
        <Routes>
          <Route path="" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
            <Route path="products" element={<ProductTable/>} />
            <Route path="home" element={<HomePage/>} />
            <Route path="checkout" element={<Checkout/>} />

        </Routes>
      </div>
    </>
    );}

export default App;
