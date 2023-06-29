import React from 'react';
import Navbar from './Navbar';
import Login from './client_comps/login';
import {
  Routes,
  Route,
} from "react-router-dom";
import Home from '../views/Home';
import Search from '../views/Search';
import Collection from '../views/Collection';
import SubSection from './Content/CollectionContent/SubSection';
import SignUp from './client_comps/signUp';
import Profile from './client_comps/profile';
import EditProfile from './client_comps/editProfile';
import AddSong from './client_comps/addSong';
import UsersList from '../comps_admin/showUsers';

function Content() {
  return (
    <main className='flex-auto overflow-auto'>
      <Navbar />
      <div className='px-8 py-5'>


        <Routes>
          <Route path='/' exact={true} element={<Home />} />
          <Route path='/search' element={<Search />} />

          <Route path="/admin/users" element={<UsersList />} />

          <Route path="/" element={<Home />} />
          <Route path="/*" element={<h2>Page 404</h2>} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/users/signUp" element={<SignUp />} />
          <Route path="/users/editProfile" element={<EditProfile />} />
          <Route path='/users/profile' element={<Profile />} />
          <Route path='/songs/addSong' element={<AddSong />} />


        </Routes>
      </div>
    </main>
  )
}

export default Content