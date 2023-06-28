import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { doApiMethod, API_URL, USER } from "../../services/apiService";
import { doApiGet } from "../../services/apiService";
import { loginSuccess } from "../../store/redax/featchers.js/userSlice";
import { useSelector,useDispatch } from "react-redux";


export default function EditProfile() {
    const dispatch=useDispatch();

    const { currentUser } = useSelector((state) => state.user);


    // const currentUser = JSON.parse(localStorage.getItem(USER));
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
        doEditUserForm(bodyData);

    };


    const doEditUserForm = async (bodyData) => {
        debugger
        if (currentUser) {
            let url = API_URL + "users/" + (currentUser._id);
            try {
                // bodyData.password=currentUser.password;
                let resp = await doApiMethod(url, "PUT", bodyData);
                doApiInfo(); //TODO

                alert("wellcome "+currentUser.firstName);

               

                console.log(resp.data);

                nav("/users/profile");
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

            // localStorage.setItem(USER, JSON.stringify(resp.data));
            dispatch(loginSuccess(resp.data));



            console.log(resp.data);
        } catch (err) {
            console.log(err.response);
            alert("User info get worng, or service down");
        }
    };



    useEffect(() => {
        if (currentUser) {
            setValue("firstName", currentUser.firstName);
            setValue("lastName", currentUser.lastName);
            setValue("avatar", currentUser.avatar);
            setValue("email", currentUser.email);
        }
    }, [ setValue]);

    return (
        <div className="container">
            <h1 className="text-center text-success">Edit up</h1>
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
                    defaultValue={getValues("firstName")}
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
                    defaultValue={getValues("lastName")}
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
                    defaultValue={getValues("email")}
                />
                {errors.email && <div className="text-danger">Enter a valid email</div>}

                <label>Image:</label>
                <input
                    {...register("avatar")}
                    type="text"
                    className="form-control"
                    defaultValue={getValues("avatar")}
                />
                {errors.avatar && <div className="text-danger">Enter a valid image</div>}

               



                <button className="btn btn-dark mt-3">Edit up to system</button>
            </form>
        </div>
    );
}
