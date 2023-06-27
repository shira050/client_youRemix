import axios from "axios";
import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { doApiMethod, API_URL, USER } from "../../services/apiService";
import { doApiGet } from "../../services/apiService";


export default function Login() {
  const currentUser = JSON.parse(localStorage.getItem(USER));
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
    // data -> מכיל את כל המאפיינים שלה השמות של האינפוטים עם הערך שלהם
    console.log(bodyData);
    if (currentUser) {
      doEditUserForm(bodyData);
    } else{
      doSignUpForm(bodyData);
    }
  };

  const doSignUpForm = async (bodyData) => {
    debugger
    let url = API_URL + "users";
    try {
      let resp = await doApiMethod(url, "POST", bodyData);
      alert("wellcome" + resp.data.firstName);

      localStorage.setItem(USER, JSON.stringify(resp.data));

      console.log(resp.data);

      nav("/");
    } catch (err) {
      console.log(err.response);
      alert("User or password worng, or service down");
    }
  };
  const doEditUserForm = async (bodyData) => {
    debugger
    if (currentUser) {
    let url = API_URL + "users/"+(currentUser._id);
    try {
      // bodyData.password=currentUser.password;
      let resp = await doApiMethod(url, "PUT", bodyData);
      alert("wellcome" + resp.data.firstName);

      doApiInfo(); //TODO

      console.log(resp.data);

      nav("/");
    } catch (err) {
      console.log(err.response);
      alert("something worng, or service down");
    }
  }
  };
  
  const doApiInfo = async () => {
    let url = API_URL + "users/userInfo";
    try {
      let resp = await doApiGet(url);

    localStorage.setItem(USER, JSON.stringify(resp.data));

      console.log(resp.data);
    } catch (err) {
      console.log(err.response);
      alert("User info get worng, or service down");
    }
  };

 

  // let firstNameRef = register("firstName", {
  //   required: true,
  //   minLength: 2,
  //   pattern: /^[a-z ,.'-]+$/i,
  // });
  // let lastNameRef = register("lastName", {
  //   required: true,
  //   minLength: 2,
  //   pattern: /^[a-z ,.'-]+$/i,
  // });
  // let imageRef = register("avatar");
  // let emailRef = register("email", {
  //   required: true,
  //   pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  // });

  // let passwordRef = register("password", { required: true, minLength: 6 });


  // const [user,setUser]=useState({
  //   firstName: '',
  //   lastName: '',
  //   avatar: '',
  //   email: '',
  //   password: ''
  // });



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
  // onChange={(e) => setValue("firstName", e.target.value)}
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
  // onChange={(e) => setValue("lastName", e.target.value)}
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
  // onChange={(e) => setValue("email", e.target.value)}
/>
{errors.email && <div className="text-danger">Enter a valid email</div>}

<label>Image:</label>
<input
  {...register("avatar")}
  type="text"
  className="form-control"
  value={getValues("avatar")}
  // onChange={(e) => setValue("avatar", e.target.value)}
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
  // onChange={(e) => setValue("password", e.target.value)}
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
