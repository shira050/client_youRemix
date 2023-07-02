import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  doApiMethod,
  API_URL,
  USER,
  doApiGet,
} from "../../services/apiService";
import UploadTest from "../uploadTest";

export default function AddSong() {
  const [categories, setCategories] = useState([]);

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
  let catRef = register("category_id", {
    required: true,
    pattern: /^[a-z ,.'-]+$/i,
  });
  let srcRef = register("src", {
    required: true,
  });
  let imageRef = register("image", {
    required: true,
    pattern: /\.(jpe?g|png|gif|bmp)$/i,
  });

  const nav = useNavigate();

  const onSubForm = (bodyData) => {
    debugger;
    console.log(bodyData);

    doAddSongForm(bodyData);
  };

  const doAddSongForm = async (bodyData) => {
    let url = API_URL + "songs";
    try {
      debugger;
      console.log("tryyyyyyyy");
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
    let url = API_URL + "categories";
    try {
      let resp = await doApiGet(url);
      setCategories(resp.data);
      console.log(categories);
    } catch (err) {
      console.log(err.response);
      alert("Categories wrong or service down");
    }
  };

  useEffect(() => {
    doApiCategories();
  }, []);
  return (
    <div className="container">
      <h1 className="text-center">Add Song</h1>
      <form
        onSubmit={handleSubmit(onSubForm)}
        className="col-md-6 p-3 shadow mx-auto"
      >
        <input
          {...titleRef}
          type="text"
          className="form-control m-3"
          placeholder="enter the name of the song"
        />
        {errors.title && <div className="text-danger">Enter a valid title</div>}
        <input
          {...subtitleRef}
          type="text"
          className="form-control m-3"
          placeholder="enter a short description"
        />
        {errors.subtitle && (
          <div className="text-danger">Enter a valid subtitle</div>
        )}
        <select {...catRef} type="text" className="form-control m-3">
          <option value="" disabled selected>
            Choose Category:
          </option>
          {categories.map((item) => (
            <option value={item._id}>{item.title}</option>
          ))}
        </select>
        <input
          {...srcRef}
          type="text"
          className="form-control m-3"
          placeholder="enter the source song's route"
        />
        {errors.src && <div className="text-danger">Enter a valid src</div>}
        {/* <input
          {...imageRef}
          type="text"
          className="form-control"
          placeholder="enter a source for an iamge"
        />
        {errors.image && <div className="text-danger">Enter a valid image</div>} */}
        <UploadTest  {...imageRef} ></UploadTest>

        <button  type="submit" className=" mt-3 className='rounded btn btn-success'">
          Add
        </button>
      </form>
    </div>
  );
}
