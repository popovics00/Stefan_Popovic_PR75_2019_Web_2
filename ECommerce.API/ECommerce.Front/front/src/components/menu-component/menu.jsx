import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/menu.css";
import MenuItem from "./menuItem";
import userServices from "../../services/userServices";

//const user = userServices.getUser()

// function logout(){
//   return(
//     <>
//           <div className="item-wrapper" onClick={userServices.useLogout}>
//             <span className="item">Log out</span>
//           </div>
//     </>
//   )
// }
function useLogout(){
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    window.sessionStorage.clear();
    navigate("/login");    
  }
  return logout;
}


function Menu() {
  const logout = useLogout();
  const user = userServices.isLoggedIn()
  return (
    <>
    {user != null ?
      <div className="menu-wrapper">
        <div className="menu-left">
          <MenuItem item={"Profile"} path={"profile"} />
          <div className="item-wrapper" onClick={logout}>
            <span className="item">Log out</span>
          </div>
        </div>
        <div className="menu-header">
          <Link to={""}>Jersey</Link>
        </div>
        <div className="menu-right">
          <MenuItem item={"Shop"} path={"main-shop"} />
          {/* <MenuItem item={"New Orders"} />
          <MenuItem item={"My Orders"} />
          <MenuItem item={"All Orders"} /> */}
        </div>
        {/* <MenuItem item={"Add Article"} path={"add-article"} />
        <MenuItem item={"New Order"} />
        <MenuItem item={"Orders History"} /> */}
      </div> : null}
    </>
  );
}

export default Menu;