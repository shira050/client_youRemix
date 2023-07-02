import React from "react";
import Navbar from "./Navbar";
import Login from "./client_comps/login";
import { Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import Search from "../views/Search";
import Collection from "../views/Collection";
import SubSection from "./Content/CollectionContent/SubSection";
import SignUp from "./client_comps/signUp";
import Profile from "./client_comps/profile";
import EditProfile from "./client_comps/editProfile";
import AddSong from "./client_comps/addSong";
import UsersList from "../comps_admin/showUsers";
import ShowCategories from "../comps_admin/showCategories";
import CategoriesList from "../comps_admin/showCategories";
import SongsList from "../comps_admin/showSongs";
import CategorySongs from "../views/CategorySongs";
import AddCategory from "../comps_admin/addCategory";
import { USER } from "../services/apiService";

function Content() {
  let role='user';
  if(localStorage[USER]){
   role =JSON.parse(localStorage[USER]).role.toLowerCase();
  }
  return (
    <main className="flex-auto overflow-auto">
      <Navbar />
      <div className="px-8 py-5">
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/" element={<Home />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/users/signUp" element={<SignUp />} />

          {role == 'admin' && (
            <>
              <Route path="/admin/users" element={<UsersList />} />
              <Route path="/admin/categories" element={<CategoriesList />} />
              <Route path="/admin/songs" element={<SongsList />} />
              <Route path="/admin/addCategory" element={<AddCategory />} />
            </>
          )}

          {role == 'admin' ||
            (role == 'user' && (
              <>
                <Route path="/users/editProfile" element={<EditProfile />} />
                <Route path="/users/profile" element={<Profile />} />
                <Route path="/songs/addSong" element={<AddSong />} />
              </>
            ))}
          <Route
            path="/songs/CategorySongs/:_id/:name"
            element={<CategorySongs />}
          />

          <Route path="/*" element={<h2>Page 404</h2>} />
        </Routes>
      </div>
    </main>
  );
}

export default Content;
