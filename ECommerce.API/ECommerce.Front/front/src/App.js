import logo from './logo.svg';
import './App.css';
import Dashboard from "./components/dashboard";
import { Routes, Route, useNavigate } from "react-router-dom";
import Menu from "./components/menu-component/menu";
import Register from "./components/register";
import Login from "./components/login";
import userServices from "./services/userServices";

function App() {
  const currentUser = userServices.getCurrentUser();
  if(currentUser == null)
  {
    return (
    <>
     <div className="main-container">
        <Menu />
        <Routes>
          <Route path="" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </div>
    </>
    );
  }
  else if(currentUser.role=='1')
  {
    return (
    <>
     <div className="main-container">
        <Menu />
        <Routes>
          <Route path="" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </div>
    </>
    );
  }
  else if(currentUser.role=='2')
  {
    return (
    <>
     <div className="main-container">
        <Menu />
        <Routes>
          <Route path="" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </div>
    </>
    );
  }
  else if(currentUser.role=='3')
  {
    return (
    <>
     <div className="main-container">
        <Menu />
        <Routes>
          <Route path="" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </div>
    </>
    );
  }
}

export default App;
