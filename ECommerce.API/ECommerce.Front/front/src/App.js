import Login from "./components/login";
import { Routes, Route } from "react-router-dom";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import Navigation from "./components/navigation-comp/navigation";
import AddArticle from "./components/article-comp/addArticle";
import MainShop from "./components/mainShop";

function App() {
  return (
    <>
      <div className="main-container">
        <Navigation />
        <Routes>
          <Route path="" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="add-article" element={<AddArticle />} />
          <Route path="main-shop" element={<MainShop />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
