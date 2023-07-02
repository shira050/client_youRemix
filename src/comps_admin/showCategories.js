import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { MDBBtn } from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../services/apiService";
import { doApiGet, doApiMethod } from "../services/apiService";
import { Icon } from "../icons/Icons";
import { Link } from "react-router-dom/dist";

export default function CategoriesList() {
  const [categoriesList, setCategoriesList] = useState([]);
  const nav = useNavigate();

  const doApiInfo = async () => {
    let url = API_URL + "categories/";
    try {
      let resp = await doApiGet(url);

      setCategoriesList(resp.data);
      console.log(resp.data);
    } catch (err) {
      console.log(err.response);
      alert("you have to be admin, or service down");
    }
  };
  const doDeleteCategory = async (_id) => {
    debugger;

    let url = API_URL + "categories/" + _id;
    try {
      let resp = await doApiMethod(url, "PATCH",{active:false});
      alert("נמחק בהצלחה");
      doApiInfo();
      console.log(resp.data);
    } catch (err) {
      console.log(err.response);
      alert("something worng, or service down");
    }
  };
  // const doChangeRole = async (_id, role) => {
  //     debugger
  //     let newRole;
  //     role == 'user' ? newRole = 'admin' : newRole = 'user';
  //     let url = API_URL + "users/" + _id + "/" + newRole;
  //     try {
  //         // bodyData.password=currentUser.password;
  //         let resp = await doApiMethod(url, "PATCH");
  //         alert("סטטוס משתמש עודכן");
  //         console.log(resp.data);
  //     } catch (err) {
  //         console.log(err.response);
  //         alert("something worng, or service down");
  //     }

  // };

  useEffect(async () => {
    doApiInfo();
  }, []);

  return (
    <>
    <Link to='/admin/addCategory'>
        <MDBBtn class='rounded btn btn-success'>New Category</MDBBtn>
    </Link>
      <div className="text-center align-items-center justify-center">
        <table
          class="table"
          style={{ margin: "40px 0", background: "lightgray" }}
        >
          <thead class="black white-text">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Imge </th>
              <th scope="col">Delete </th>
            </tr>
          </thead>

          <tbody>
            {categoriesList.map((x) => (
              <tr className="">
                <td>{x.title}</td>
                <td>
                  <img className="h-20" src={x.cover} />
                </td>
                <td
                  onClick={() => {
                    doDeleteCategory(x._id);
                  }}
                >
                  <span className="w-9 h-9 flex bg-danger bg-opacity-60 text-black rounded-sm group-hover:bg-opacity-100">
                    <Icon name="delete" size={20} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
