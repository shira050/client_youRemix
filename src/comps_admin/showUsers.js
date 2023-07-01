
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MDBBtn } from 'mdb-react-ui-kit';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { API_URL } from '../services/apiService';
import { doApiGet, doApiMethod } from '../services/apiService';
import { Icon } from '../icons/Icons';
// import { getUnV } from '../Redax/Users/UserThank';

export default function ShowUsers() {


    const [userList, setUserList] = useState([])
    const nav = useNavigate();

    const doApiInfo = async () => {
        let url = API_URL + "users/";
        try {
            let resp = await doApiGet(url);

            setUserList(resp.data);
            console.log(resp.data);
        } catch (err) {
            console.log(err.response);
            alert("you have to be admin, or service down");
        }
    };
    const doDeleteUser = async (_id) => {
        debugger

        let url = API_URL + "users/" + _id;
        try {
            // bodyData.password=currentUser.password;
            let resp = await doApiMethod(url, "PATCH");
            alert("נמחק בהצלחה");
            doApiInfo();
            console.log(resp.data);
        } catch (err) {
            console.log(err.response);
            alert("something worng, or service down");
        }

    };
    const doChangeRole = async (_id, role) => {
        debugger
        let newRole;
        role == 'user' ? newRole = 'admin' : newRole = 'user';
        let url = API_URL + "users/" + _id + "/" + newRole;
        try {
            // bodyData.password=currentUser.password;
            let resp = await doApiMethod(url, "PATCH");
            alert("סטטוס משתמש עודכן");
            doApiInfo();
            console.log(resp.data);
        } catch (err) {
            console.log(err.response);
            alert("something worng, or service down");
        }

    };



    useEffect(async () => {

        doApiInfo();

    }, [])

    return <>
        <div className='text-center'>
            <table class="table" style={{ margin: "40px 0", background: 'lightgray' }}>
                <thead class="black white-text">
                    <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Role</th>
                        <th scope="col">Delete </th>
                    </tr>
                </thead>

                <tbody>
                    {userList.map((x) =>
                        <tr>
                            <td>{x.firstName}</td>
                            <td>{x.lastName}</td>
                            <td onClick={() => { doChangeRole(x._id, x.role.toLowerCase()) }}><MDBBtn style={{ minWidth:"30%" }} className='btn btn-success' rounded > {x.role.toUpperCase()} </MDBBtn></td>
                            <td onClick={() => { doDeleteUser(x._id) }}>

                                <span className='w-9 h-9 flex items-center justify-center bg-danger bg-opacity-60 text-black rounded-sm group-hover:bg-opacity-100'>
                                    <Icon name="delete" size={20} />
                                </span>
                                {/* <MDBBtn style={{ background: "red" }} rounded > <i class="fas fa-trash-alt"></i> </MDBBtn> */}


                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>


    </>
}


