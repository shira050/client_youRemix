import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { doApiMethod, API_URL, USER,doApiGet } from "../../services/apiService";

export default function AddSong() {


    const [categories,setCategories]=useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    let titleRef = register("title", {
        required: true,
        pattern: /^[a-z ,.'-]+$/i,
    });
    let subtitleRef = register("subtitle", {
        required: true,
        minLength: 2,
        pattern: /^[a-z ,.'-]+$/i,
    });
    let catRef = register("title", {
        required: true,
        pattern: /^[a-z ,.'-]+$/i,
    });
    let srcRef = register("src", {
        required: true,
    });
    // let imageRef = register("image", {
    //     required: true,
    // });
   

    const nav = useNavigate();

    const onSubForm = (bodyData) => {
        console.log(bodyData);

        doAddSongForm(bodyData);
    };

    const doAddSongForm = async (bodyData) => {
        let url = API_URL + "songs";
        try {
            let resp = await doApiMethod(url, "POST", bodyData);
            alert("Song add success");
            console.log(resp.data);
            nav("/");
        } catch (err) {
            console.log(err.response);
            alert("have a problem");
        }
    };


    const doApiCategories = async () => {
        debugger
        let url = API_URL + "categories";
        try {
          let resp = await doApiGet(url);
          console.log(resp.data);
        //   setCategories(resp.data);TODO!!!!!!
        } catch (err) {
          console.log(err.response);
          alert("Categories wrong or service down");
        }
      };
     
      useEffect(() => {
        doApiCategories();
      },[]);
    return (
        <div className="container">
            <h1 className="text-center">Add Song</h1>
            <form
                onSubmit={handleSubmit(onSubForm)}
                className="col-md-6 p-3 shadow mx-auto"
            >
                <label>Title:</label>
                <input {...titleRef} type="text" className="form-control" placeholder="enter the name of the song"/>
                {errors.title && <div className="text-danger">Enter a valid title</div>}
                <label>Subtitle:</label>
                <input {...subtitleRef} type="text" className="form-control" placeholder="enter a short description"/>
                {errors.subtitle && (
                    <div className="text-danger">Enter a valid subtitle</div>
                )}
                <br />
                <select {...catRef} type="text" className="form-control" placeholder="Choose Category">
                    <option value="" disabled selected>Choose Category:</option>
                    {categories.map((item) => (
                        <option value={item}>{item}</option>
                    ))}
                </select>
                <label>SRC:</label>
                <input {...srcRef} type="text" className="form-control" placeholder="enter the source song's route"/>
                {errors.src && <div className="text-danger">Enter a valid src</div>}
                <label>Image:</label>
                {/* <input {...imageRef} type="text" className="form-control" placeholder="enter a source for an imge"/>
                {errors.image && <div className="text-danger">Enter a valid image</div>}
                 */}
                <button className="btn btn-dark mt-3">Add</button>
            </form>
        </div>
    );
}