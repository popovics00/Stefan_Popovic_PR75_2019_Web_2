import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/navigation.css";

function NavigationItem({ item, path }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    navigate("../" + path);
  };

  return (
    <>
      <div className="item-wrapper" onClick={handleClick}>
        <span className="item">{item}</span>
      </div>
    </>
  );
}

export default NavigationItem;
