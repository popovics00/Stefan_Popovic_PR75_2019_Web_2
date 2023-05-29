import styles from "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import MyInput from "./input-comp/myInput";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/dashboard");
  };

  return (
    <>
      <div className="login-container">
        <h1 className="header">Log in</h1>
        <div className="login-form-wrapper">
          <form method="post" className="login-form" onSubmit={handleSubmit}>
            <MyInput text={"E-mail"} type={"text"} name={"e-mail"} />
            <MyInput text={"Password"} type={"password"} name={"password"} />
            <div className="submit-wrapper">
              <button className="submit-btn">Log in</button>
            </div>
          </form>
          <div className="register-wrapper">
            <Link to="/register">Not registered?</Link>
          </div>
        </div>
      </div>
      <img className="login-photo" src={require("../images/lotrRing.png")} />
    </>
  );
}

export default Login;
