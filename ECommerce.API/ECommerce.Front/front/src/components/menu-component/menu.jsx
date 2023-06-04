import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/menu.css";
import MenuItem from "./menuItem";
import userServices from "../../services/userServices";
import { toast } from "react-toastify";

function useLogout() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    window.sessionStorage.clear();
    navigate("/login");
  }
  return logout;
}


function ShowLogOut (){
  const logout = useLogout();
  const user = userServices.getCurrentUser();
    return(
      <>
        {user != null ? (
        <div className="item-wrapper" onClick={logout}>
          <span className="item">Log out</span>
        </div>
      ) : null}
      </>
    )
}


function Menu() {
  const logout = useLogout();
  const user = userServices.getCurrentUser();
  return (
    <>
      {user != null ? (
        <div className="menu-wrapper">
          <div className="menu-right">
            <MenuItem item="Profile" path="profile" role={["Customer","Saler","Admin"]}/>
            <MenuItem item="Profile" path="profile" role={["Customer","Saler","Admin"]}/>
            <ShowLogOut/>
          </div>
          <div className="menu-header">
            <img className="login-photo" src={require("../../images/logo.png")}/>
          </div>
          <div className="menu-left">
            <MenuItem item="Shop" path="main-shop" role={["Customer","Saler","Admin"]}/>
            <MenuItem item="Shop" path="main-shop" role={["Customer","Saler","Admin"]}/>
            <MenuItem item="Shop" path="main-shop" role={["Customer","Saler","Admin"]}/>
            
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Menu;
