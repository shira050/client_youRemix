import axios from "axios";
import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { doApiMethod, API_URL, USER } from "../../services/apiService";
import { doApiGet } from "../../services/apiService";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../store/redax/featchers.js/userSlice";


export default function Login() {
  const dispatch=useDispatch();
  // const currentUser = JSON.parse(localStorage.getItem(USER));
  const { currentUser } = useSelector((state) => state.user);


  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues
  } = useForm();

  const nav = useNavigate();

  const onSubForm = (bodyData) => {
    debugger
    console.log(bodyData);
   
      doSignUpForm(bodyData);
  };

  const doSignUpForm = async (bodyData) => {
    debugger
    let url = API_URL + "users";
    try {
      let resp = await doApiMethod(url, "POST", bodyData);
      alert("wellcome " + resp.data.firstName);

      // localStorage.setItem(USER, JSON.stringify(resp.data));
      dispatch(loginSuccess(resp.data));



      console.log(resp.data);

      nav("/");
    } catch (err) {
      console.log(err.response);
      alert("User or password worng, or service down");
    }
  };
  
  
  
 


  useEffect(() => {
    if (currentUser) {
      setValue("firstName", currentUser.firstName);
      setValue("lastName", currentUser.lastName);
      setValue("avatar", currentUser.avatar);
      setValue("email", currentUser.email);
      setValue("password", currentUser.password);
    }
  }, [currentUser, setValue]);
  
  return (
    <div className="container">
      <h1 className="text-center text-success">Sign up</h1>
      <form
        onSubmit={handleSubmit(onSubForm)}
        className="col-md-6 p-3 shadow mx-auto"
      >
        <label>First Name:</label>
<input
  {...register("firstName", {
    required: true,
    minLength: 2,
    pattern: /^[a-z ,.'-]+$/i
  })}
  type="text"
  className="form-control"
  value={getValues("firstName")}
/>
{errors.firstName && (
  <div className="text-danger">Enter a valid first name</div>
)}

<label>Last Name:</label>
<input
  {...register("lastName", {
    required: true,
    minLength: 2,
    pattern: /^[a-z ,.'-]+$/i
  })}
  type="text"
  className="form-control"
  value={getValues("lastName")}
/>
{errors.lastName && (
  <div className="text-danger">Enter a valid last name</div>
)}

<label>Email:</label>
<input
  {...register("email", {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  })}
  type="text"
  className="form-control"
  value={getValues("email")}
/>
{errors.email && <div className="text-danger">Enter a valid email</div>}

<label>Image:</label>
<input
  {...register("avatar")}
  type="text"
  className="form-control"
  value={getValues("avatar")}
/>
{errors.avatar && <div className="text-danger">Enter a valid image</div>}

{!currentUser&&
<>
<label>Password:</label>
<input
  {...register("password", { required: true, minLength: 6 })}
  type="password"
  className="form-control"
  value={getValues("password")}
/>
{errors.password && (
  <div className="text-danger">Enter at least 6 characters for the password</div>
)}
</>
}


        {/* <InputConfirmPassword
          getValues={getValues}
          label={"confirm Password"}
          register={register}
          errors={errors}
          className={classNames(
            errors.confirmPassword
              ? "relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              : "relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          )}
        /> */}

        <button className="btn btn-dark mt-3">Sign up to system</button>
      </form>
    </div>
  );
}
