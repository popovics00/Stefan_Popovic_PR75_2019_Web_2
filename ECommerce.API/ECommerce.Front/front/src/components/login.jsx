import React, { useEffect } from "react";
import styles from "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import userServices from "../services/userServices"
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (loginData) => {
    try {
      await userServices.login(loginData);
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (userServices.isLoggedIn()) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <div className='login'>
        <div className="frame">
          <h1>LOGIN</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className='input-label'>
              Email
              <div className='input-wrapper'>
                <input type="text" {...register("email", { required: true })} />
              </div>
            </label>
            {errors.email && <span>This field is required</span>}
            <label className='input-label'>
              Password
              <div className='input-wrapper'>
                <input type="password" {...register("password", { required: true })} />
              </div>
            </label>
            {errors.password && <span>This field is required</span>}
            <button type="submit">LOGIN</button><br/>
          </form>
          <div className="login-link-wrapper">
            <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
