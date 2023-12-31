import React from 'react'
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { Icon } from '../icons/Icons';
import DownloadApp from './SideBar/DownloadApp';
import Menu from './SideBar/Menu';
import Playlist from './SideBar/Playlist';
import SidebarCover from './SideBar/SidebarCover';
import { USER } from '../services/apiService';


function SideBar() {

  const { sidebar } = useSelector((state) => state.player.sidebar);
  // const { currentUser } = useSelector((state) => state.user);
  let currentUser;
  if (localStorage[USER]) {
    currentUser = JSON.parse(localStorage[USER]);
  }
  
  console.log(currentUser,"cur");

  return (
    <aside className='w-60 pt-6 flex flex-shrink-0 flex-col bg-black'>
      <Link to={'/'}>
        {/* logo */}
        <img src={"https://cdn.pixabay.com/photo/2013/07/12/18/17/equalizer-153212_1280.png"} alt="RemixSpotify_logo" className="h-10 w-75 ml-5" />
      </Link>

      <Menu />

      <nav className='mt-6'>
        <ul>
          <li>
            <NavLink to='/songs/addSong' className='py-2 px-6 flex items-center group text-sm text-link font-semibold hover:text-white'>
              <span className='w-6 h-6 flex items-center justify-center mr-4 bg-white bg-opacity-60 text-black rounded-sm group-hover:bg-opacity-100'>
                <Icon name="plus" size={12} />
              </span>
              add new song to Playlist
            </NavLink>
          </li>
         
          {(currentUser&& currentUser.role.toLowerCase() == 'admin' )&&
            <>
            <li>
              <NavLink to='/admin/categories' className='py-2 px-6 flex items-center group text-sm text-link font-semibold hover:text-white'>
                <span className='w-6 h-6 flex items-center justify-center mr-4 bg-warning bg-gradient bg-opacity-60 text-black rounded-sm group-hover:bg-opacity-100'>
                  <Icon name="category" size={12} />
                </span>
                all categories
              </NavLink>
            </li>
            <li>
              <NavLink to='/admin/songs' className='py-2 px-6 flex items-center group text-sm text-link font-semibold hover:text-white'>
                <span className='w-6 h-6 flex items-center justify-center mr-4 bg-success bg-gradient bg-opacity-60 text-black rounded-sm group-hover:bg-opacity-100'>
                  <Icon name="song" size={12} />
                </span>
                all songs
              </NavLink>
            </li>
            <li>
              <NavLink to='/admin/users' className='py-2 px-6 flex items-center group text-sm text-link font-semibold hover:text-white'>
                <span className='w-6 h-6 flex items-center justify-center mr-4 bg-info bg-gradient bg-opacity-60 text-black rounded-sm group-hover:bg-opacity-100'>
                  <Icon name="user" size={12} />
                </span>
                all users
              </NavLink>
            </li>
            
            </>
          }
        </ul>

      </nav>


      <DownloadApp />

      {sidebar && <SidebarCover />}
    </aside>
  )
}

export default SideBar