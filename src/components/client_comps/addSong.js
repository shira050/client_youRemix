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
import { getSongList } from "../../services/songMetod";
import { makeSong } from "../../services/apiMakeSong";

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
    console.log("subform");
    console.log(bodyData);
    doAddSongForm(bodyData);
  };

  const doAddSongForm = async (bodyData) => {
    // זימון יצירת רמיקס
    srcRef.value = makeSong();

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

  const updateUpload = (url) => {
    debugger;
    imageRef.value = url;
    console.log("hii from update");
    console.log(imageRef.value);
  };

  const doApiCategories = async () => {
    const categories = await getSongList("categories");
    setCategories(categories);
  };

  useEffect(() => {
    doApiCategories();
  }, []);

  console.log(titleRef);
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

        {/* <input
          {...imageRef}
          type="text"
          className="form-control"
          placeholder="enter a source for an iamge"
        />
        {errors.image && <div className="text-danger">Enter a valid image</div>} */}
        <UploadTest update={updateUpload}></UploadTest>

        <button
          type="submit"
          className=" mt-3 className='rounded btn btn-success"
        >
          Add
        </button>
      </form>
    </div>
  );
}
