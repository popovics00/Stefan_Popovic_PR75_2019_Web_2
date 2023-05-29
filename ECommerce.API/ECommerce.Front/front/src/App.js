import logo from './logo.svg';
import './App.css';
import Dashboard from "./components/dashboard";
import { Routes, Route } from "react-router-dom";
import Menu from "./components/menu-component/menu";
import Register from "./components/register";
import Login from "./components/login";

function App() {
  return (
    <>
      <div className="main-container">
        <Menu />
        <Routes>
          <Route path="" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          {/* <Route path="add-article" element={<AddArticle />} />
          <Route path="main-shop" element={<MainShop />} />  */}
        </Routes>
      </div>
    </>
  );
}

export default App;
