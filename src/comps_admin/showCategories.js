
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
 

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
    let url = API_URL + "categories/" + _id;
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

  useEffect(() => {
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
      <Link to="/admin/addCategory">
        <MDBBtn className="rounded btn btn-success">New Category</MDBBtn>
      </Link>
      <div>
          {/* Pagination */}
          <nav>
            <ul className="pagination">
              {pageNumbers.map((number) => (
                <li key={number} className="page-item mt-3">
                  <a
                    onClick={() => paginate(number)}
                    className="page-link cursor-pointer"
                   
                  >
                    {number}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      <div className="text-center align-items-center justify-center">
        <table
          className="table"
          style={{ margin: "40px 0", background: "lightgray" }}
        >
          <thead className="black white-text">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((x) => (
              <tr key={x._id}>
                <td>{x.title}</td>
                <td>
                  <img className="h-20" src={x.cover} alt={x.title} />
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