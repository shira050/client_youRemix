
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { MDBBtn } from "mdb-react-ui-kit";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../services/apiService";
import { doApiGet, doApiMethod } from "../services/apiService";
import { Icon } from "../icons/Icons";
import FeedbackStar from "./feedbek";

export default function SongsList() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const nav = useNavigate();

  const doApiInfo = async () => {
    let url = API_URL + "songs/";
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

    let url = API_URL + "songs/" + _id;
    try {
      let resp = await doApiMethod(url, "PATCH", { active: false });
      alert("נמחק בהצלחה");
      doApiInfo();
      console.log(resp.data);
    } catch (err) {
      console.log(err.response);
      alert("something worng, or service down");
    }
  };

  useEffect( () => {
    doApiInfo();
  }, []);

  // Logic for displaying current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categoriesList.slice(indexOfFirstItem, indexOfLastItem);

  // Logic for pagination
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(categoriesList.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <Link to="/songs/addSong">
        <MDBBtn class="rounded btn btn-success">New Song</MDBBtn>
      </Link>
      <div>
          {/* Pagination */}
          <nav>
            <ul className="pagination">
              {pageNumbers.map((number) => (
                <li key={number} className="page-item mt-3">
                  <a onClick={() => paginate(number)} className="page-link  cursor-pointer">
                    {number}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      <div className="text-center">
        <table
          class="table"
          style={{ margin: "40px 0", background: "lightgray" }}
        >
          <thead class="black white-text">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              {/* <th scope="col">Category</th> */}
              <th scope="col">Imge </th>
              <th scope="col">Rate </th>
              <th scope="col">The Remix </th>
              <th scope="col">Delete </th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((x) => (
              <tr>
                <td>{x.title}</td>
                <td>{x.subtitle}</td>
                {/* <td>{x.category_id}</td> */}
                <td>
                  <img className="w-20" src={x.image} />
                </td>
                <td>
                  <FeedbackStar rating={x.rate} />
                </td>
                <td>
                  {" "}
                  <Link
                    target="_blank"
                    style={{ textDecoration: "underline" }}
                    to={x.src}
                  >
                    click to the song
                  </Link>
                </td>
                <td
                  onClick={() => {
                    doDeleteCategory(x._id);
                  }}
                >
                  <span className="w-9 h-9 flex items-center justify-center bg-danger bg-opacity-60 text-black rounded-sm group-hover:bg-opacity-100">
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
