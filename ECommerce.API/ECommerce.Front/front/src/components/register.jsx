import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form';
import userServices from "../services/userServices";
import React, { useState } from "react";
import { toast } from 'react-toastify';
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer } from 'react-toastify';
import styles from "../styles/register.css";

function Register() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, control } = useForm();
  const [birthDate, setBirthDate] = useState(new Date());

  const onSubmit = async (registerData) => {
    console.log(registerData)
    await userServices.createUser(registerData);
  };

  return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
        />
        <div className="register-container">
          <h1 className="header">Register</h1>
          <div className="register-form-wrapper">
            <div className="row">
              <div className="col-md-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <label className='input-label'>
                    First Name <span>*</span>
                    <div className='input-wrapper'>
                      <input type="text" {...register("firstName", { required: true })} />
                    </div>
                  </label>
                  {errors.firstName && <span>This field is required</span>}
                  <label className='input-label'>
                    Last Name <span>*</span>
                    <div className='input-wrapper'>
                      <input type="text" {...register("lastName", { required: true })} />
                    </div>
                  </label>
                  {errors.lastName && <span>This field is required</span>}
                  <label className='input-label'>
                    UserName <span>*</span>
                    <div className='input-wrapper'>
                      <input type="text" {...register("username", { required: true })} />
                    </div>
                  </label>
                  {errors.userName && <span>This field is required</span>}
                  <label className='input-label'>
                    Birth Date <span>*</span>
                    <div className='input-wrapper'>
                      <input type="date" {...register("birthDate", { required: true })} />
                    </div>
                  </label>
                  {errors.birthDate && <span>This field is required</span>}
                </form>
              </div>
              <div className="col-md-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <label className='input-label'>
                    Address <span>*</span>
                    <div className='input-wrapper'>
                      <input type="text" {...register("address", { required: true })} />
                    </div>
                  </label>
                  {errors.address && <span>This field is required</span>}
                  <label className='input-label'>
                    Email <span>*</span>
                    <div className='input-wrapper'>
                      <input type="email" {...register("email", { required: true })} />
                    </div>
                  </label>
                  {errors.email && <span>This field is required</span>}
                  <label className='input-label'>
                    RoleId <span>*</span>
                    <div className='input-wrapper'>
                      <input type="number" {...register("roleId", { required: true })} />
                    </div>
                  </label>
                  {errors.roleId && <span>This field is required</span>}
                  <label className='input-label'>
                    Password <span>*</span>
                    <div className='input-wrapper'>
                      <input type="password" {...register("password", { required: true, minLength: 8, maxLength: 20 })} />
                    </div>
                  </label>
                  {errors.password?.type === 'required' && <span>This field is required</span>}
                  {errors.password?.type === 'minLength' && <span>Password must be at least 8 characters long</span>}
                  {errors.password?.type === 'maxLength' && <span>Password must be at most 20 characters long</span>}
                  <button type="submit">REGISTER</button>
                </form>
              </div>
            </div>
            <div className="login-link-wrapper">
              <Link to="/">Log in</Link>
            </div>
          </div>
        </div>
      </>
  );
}

export default Register;
