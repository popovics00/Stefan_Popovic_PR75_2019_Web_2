import styles from "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import MyInput from "./input-comp/myInput";
import { useForm } from 'react-hook-form';
import userServices from "../services/userServices";


function Login() {
    const navigate = useNavigate();
   // const location = useLocation();
  
    //const { login } = useUser();
    const { register, handleSubmit, formState: { errors } } = useForm();
  
    const onSubmit = async (loginData) => {
        console.log(loginData)
      //const user = await login(loginData);
      const resp = await userServices.login(loginData);
      //if (user && location.pathname === '/authentication') {
        navigate('/');
      //}
    };
//   const navigate = useNavigate();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const resp = await userServices.createUser(registerData);
//     navigate("/");
//   };

  return (
    <>
     <div className='login'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className='input-label'>
          Email
          <div className='input-wrapper'>
            {/* <FontAwesomeIcon icon={icons.email}></FontAwesomeIcon> */}
            <input type="text" {...register("email", { required: true })} />
          </div>
        </label>
        {errors.email && <span>This field is required</span>}
        <label className='input-label'>
          Password
          <div className='input-wrapper'>
            {/* <FontAwesomeIcon icon={icons.lock}></FontAwesomeIcon> */}
            <input type="password" {...register("password", { required: true })} />
          </div>
        </label>
        {errors.password && <span>This field is required</span>}
        <button type="submit">LOGIN</button>
      </form>
    </div>
      {/* <img className="login-photo" src={require("../images/lotrRing.png")} /> */}
    </>
  );
}

export default Login;
