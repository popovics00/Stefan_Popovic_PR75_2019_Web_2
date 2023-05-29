import { Link } from "react-router-dom";
import styles from "../../styles/menu.css";
import MenuItem from "./menuItem";

function Menu() {
  return (
    <>
      <div className="menu-wrapper">
        <div className="menu-left">
          <MenuItem item={"Profile"} path={"profile"} />
          <MenuItem item={"Log in"} path={"login"} />
          <MenuItem item={"Register"} path={"register"} />
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
      </div>
    </>
  );
}

export default Menu;
