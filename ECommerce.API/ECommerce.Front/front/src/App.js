import logo from './logo.svg';
import './App.css';
import Dashboard from "./components/dashboard";
import { Routes, Route, useNavigate } from "react-router-dom";
import Menu from "./components/menu-component/menu";
import Register from "./components/register";
import Login from "./components/login";
import AddProduct from "./components/product-comp/add-product";
import userServices from "./services/userServices";

function App() {
  const currentUser = userServices.getCurrentUser();
  console.log(currentUser)
  if(currentUser == null)
  {
    return (
    <>
     <div className="main-container">
        <Menu />
        <Routes>
          <Route path="" element={<Login/>} />
          <Route path="login" element={<Login/>} />
          <Route path="register" element={<Register/>} />
            <Route path="add-product" element={<AddProduct/>} />

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
          <Route path="" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
            <Route path="add-product" element={<AddProduct/>} />

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
          <Route path="" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
            <Route path="add-product" element={<AddProduct/>} />

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
          <Route path="" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
            <Route path="add-product" element={<AddProduct/>} />

        </Routes>
      </div>
    </>
    );
  }
  <Routes>
  <Route path="" element={<Dashboard />} />
  <Route path="login" element={<Login />} />
  <Route path="register" element={<Register />} />
  <Route path="add-product" element={<AddProduct/>} />
  </Routes>}

export default App;
