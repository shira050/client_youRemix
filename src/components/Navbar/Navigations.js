import React from 'react'
import { Icon } from '../../icons/Icons'
import { useNavigate } from "react-router-dom";
import Search from './Search';


function Navigations() {

  const history = useNavigate()

  return (
    <nav className='flex items-center gap-x-4'>

      <button onClick={() => history(-1)} className='w-8 h-8 flex items-center justify-center rounded-full bg-black bg-opacity-70'>
        <Icon name={"preview"} size={22} />
      </button>

      <button onClick={() => history(1)} className='w-8 h-8 flex items-center justify-center rounded-full bg-black bg-opacity-70'>
        <Icon name={"next"} size={22} />
      </button>

      <Search></Search>
    </nav>
  )
}

export default Navigations
