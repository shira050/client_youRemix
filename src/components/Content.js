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
          {/* <Route path='/collection' element={<Collection />} >
            <Route path='playlist' exact={true} element={<SubSection title={"Çalma Listeleri"} />} />
            <Route path='podcast' element={<SubSection title={"Podcast'ler"} />} />
            <Route path='artist' element={<SubSection title={"Sanatçılar"} />} />
            <Route path='albums' element={<SubSection title={"Albümler"} />} />
          </Route> */}
        </Routes>
        <Routes>
         <Route path="/admin/users" element={<UsersList />} />
         {/* <Route path="/admin/*" element={<HeaderAdmin />} /> */}
        {/*<Route path="/test/*" element={<HeaderTest />} />
        <Route path="/*" element={<ClientNav />} /> */}
      </Routes>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/search" element={<Search />} /> */}
        <Route path="/*" element={<h2>Page 404</h2>} />

        {/* ADMIN ROUTES */}
        {/* {adminRoutes()} */}

        {/* TEST ROUTES */}
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/signUp" element={<SignUp />} />
        <Route path="/users/editProfile" element={<EditProfile />} />
        <Route path='/users/profile' element={<Profile />} />
        <Route path='/songs/addSong' element={<AddSong />} />

        {/* <Route path="/test/ownHook" element={<MyHookComp />} />
        <Route path="/test/lazy1" element={<LazyLoading />} />
        <Route path="/test/lazyApi" element={<LazyApi />} /> */}
      </Routes>
      </div>
    </main>
  )
}

export default Content