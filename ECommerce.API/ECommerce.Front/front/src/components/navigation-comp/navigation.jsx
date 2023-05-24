import { Link } from "react-router-dom";
import styles from "../../styles/navigation.css";
import NavigationItem from "./navigationItem";

function Navigation() {
  return (
    <>
      <div className="navigation-wrapper">
        <div className="navigation-left">
          <NavigationItem item={"Profile"} path={"profile"} />
          <NavigationItem item={"Log in"} path={"login"} />
          <NavigationItem item={"Register"} path={"register"} />
        </div>
        <div className="navigation-header">
          <Link to={""}>Movie Props</Link>
        </div>
        <div className="navigation-right">
          <NavigationItem item={"Shop"} path={"main-shop"} />
          {/* <NavigationItem item={"New Orders"} />
          <NavigationItem item={"My Orders"} />
          <NavigationItem item={"All Orders"} /> */}
        </div>
        {/* <NavigationItem item={"Add Article"} path={"add-article"} />
        <NavigationItem item={"New Order"} />
        <NavigationItem item={"Orders History"} /> */}
      </div>
    </>
  );
}

export default Navigation;
