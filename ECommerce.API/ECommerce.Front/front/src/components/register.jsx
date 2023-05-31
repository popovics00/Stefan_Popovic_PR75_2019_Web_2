import styles from "../styles/register.css";
import { Link, useNavigate } from "react-router-dom";
import MyInput from "./input-comp/myInput";
import { useForm, Controller } from 'react-hook-form';
import userServices from "../services/userServices";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Register() {
  const navigate = useNavigate();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     navigate("/dashboard");
  //};

  const { register, handleSubmit, formState: { errors }, control } = useForm();
  const [birthDate, setBirthDate] = useState(new Date());

  const onSubmit = async (registerData) => {
    console.log(registerData)
    //const resp = await userServices.getUsers();
    const resp = await userServices.createUser(registerData);
    console.log(resp+"rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
    navigate("/");
  };

//   useEffect(() =>
//   {
//     const fetch = async()=>
//     {
//         const resp = await createUser();
//         console.log(resp);
//     }
//     fetch();
//   })

  return (
    <>
      <div className="register-container">
        <h1 className="header">Register</h1>
        <div className="register-form-wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="divider">
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
            Address <span>*</span>
            <div className='input-wrapper'>
              <input type="text" {...register("address", { required: true })} />
            </div>
          </label>
        {errors.address && <span>This field is required</span>}
        </div>
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
        <label className='input-label'>
        Birth Date <span>*</span>
        <div className='input-wrapper'>
        <input type="date" {...register("birthDate", { required: true, minLength: 8, maxLength: 20 })} />
                </div>
      </label>

        {errors.password?.type === 'required' && <span>This field is required</span>}
        {errors.password?.type === 'minLength' && <span>Password must be at least 8 characters long</span>}
        {errors.password?.type === 'maxLength' && <span>Password must be at most 20 characters long</span>}
        <button type="submit">REGISTER</button>
      </form>
          {/* <form method="post" onSubmit={handleSubmit}>
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
          </form> */}
          <div className="login-link-wrapper">
            <Link to="dashboard">Log in</Link>
          </div>
        </div>
      </div>
    {/* <img className="login-photo" src={require("../images/lotrRing.png")} /> */}
    </>
  );
}

export default Register;
