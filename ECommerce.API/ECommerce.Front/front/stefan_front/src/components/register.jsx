import styles from "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import MyInput from "./input-comp/myInput";

function Register() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/dashboard");
  };

  return (
    <>
      <div className="register-container">
        <h1 className="header">Register</h1>
        <div className="register-form-wrapper">
          <form method="post" onSubmit={handleSubmit}>
            <MyInput text={"E-mail"} type={"text"} name={"e-mail"} />
            <div className="register-inputs">
              <div>
                <MyInput text={"Username"} type={"text"} name={"username"} />
                <MyInput text={"Name"} type={"text"} name={"name"} />
                <MyInput text={"Address"} type={"text"} name={"address"} />
              </div>
              <div>
                <MyInput
                  text={"Password"}
                  type={"password"}
                  name={"password"}
                />
                <MyInput text={"Last name"} type={"text"} name={"lastName"} />
                <MyInput text={"Date"} type={"date"} name={"date"} />
              </div>
            </div>
            <div className="submit-wrapper">
              <button className="submit-btn">Register</button>
            </div>
          </form>
          <div className="login-link-wrapper">
            <Link to="dashboard">Log in</Link>
          </div>
        </div>
      </div>
      <img className="login-photo" src={require("../images/lotrRing.png")} />
    </>
  );
}

export default Register;
