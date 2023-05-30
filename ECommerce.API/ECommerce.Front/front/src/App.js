import logo from './logo.svg';
import './App.css';
import Dashboard from "./components/dashboard";
import { Routes, Route, useNavigate } from "react-router-dom";
import Menu from "./components/menu-component/menu";
import Register from "./components/register";
import Login from "./components/login";
import userServices from "./services/userServices";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <div className="main-container">
        <Menu />
        <Routes>
        {userServices.isLoggedIn ? (
          <>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="login" element={<Login />} />
          </>
        ) : (
          <Route path="register" element={<Register />} />
          
          )}
          {}
        </Routes>
      </div>
    </>
  );
}

export default App;
