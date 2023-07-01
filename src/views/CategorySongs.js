import React, { useEffect, useState } from 'react'
import ComponentShelf from '../components/Content/HomeContent/ComponentShelf'
import { getSongList } from '../services/songMetod';
import { useParams } from 'react-router-dom';
import { MDBCardText } from 'mdb-react-ui-kit';


 function CategorySongs() {
    const { _id,name } = useParams();
    console.log(_id);
  const [categorySongs, setCategorySongs] = useState([])

  useEffect(async() => {
    const songs = await getSongList(`songs/${_id}`);
    setCategorySongs(songs)
  },[])

    return (
      <div className='grid gap-y-6 pt-6'>
        {categorySongs.length>0?
        <ComponentShelf title={`songs by -${name} `} items={categorySongs}/>
    :
    <i className="display-6">
    <p>there are no any songs in this category....</p>
  </i>
    }
      </div>
    )
}

export default CategorySongs