import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { doApiMethod, API_URL, USER, doApiGet } from "../services/apiService";

export default function AddCategory() {
  const colors = [
    { name: "BLUE", num: "#0074D9" },
    { name: "AQUA", num: "#7FDBFF" },
    { name: "TEAL", num: "#39CCCC" },
    { name: "PURPLE", num: "#B10DC9" },
    { name: "FUCHSIA", num: "#F012BE" },
    { name: "MAROON", num: "#85144b" },
  ];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let titleRef = register("title", {
    required: true,
    pattern: /^[a-z ,.'-]+$/i,
  });

  let coverRef = register("cover", {
    required: true,
    pattern: /\.(jpe?g|png|gif|bmp)$/i,
  });

  let backgroundColorRef = register("backgroundColor", {
    required: true,
  });

  const nav = useNavigate();

  const onSubForm = (bodyData) => {
    console.log(bodyData);

    doAddCategoryForm(bodyData);
  };

  const doAddCategoryForm = async (bodyData) => {
    let url = API_URL + "categories";
    try {
      debugger;
      console.log("tryyyyyyyy");
      let resp = await doApiMethod(url, "POST", bodyData);
      alert("Category add success");
      console.log(resp.data);
      nav("/");
    } catch (err) {
      console.log(err.response);
      alert("have a problem");
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Add Category</h1>
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
          {...coverRef}
          type="text"
          className="form-control"
          placeholder="enter a source for an imge"
        />
        {errors.cover && <div className="text-danger">Enter a valid image</div>}
        <select
          {...backgroundColorRef}
          type="text"
          className="form-control m-3"
        >
          <option value="" disabled selected>
            Choose background color:
          </option>
          {colors.map((item) => (
            <option value={item.num}>{item.name}</option>
          ))}
        </select>
        <button type="submit" className="btn btn-dark mt-3">
          Add
        </button>
      </form>
    </div>
  );
}
