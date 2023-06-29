import React, { useEffect, useState } from 'react'
import ComponentShelf from '../components/Content/HomeContent/ComponentShelf'
import { items, items2, items3 } from '../static/data/songs'
import { API_URL, doApiGet } from "../services/apiService";
import Search from './Search';

function Home() {
  const [itemsA, setItems] = useState([])
  // try{
  // let items = await getMostListner()
  const getMostListner = async () => {
    let url = `${API_URL}songs/mostSearch`;
    console.log(url);
    try {
      let resp = await doApiGet(url);
      console.log(resp.data);
      return resp.data;
    }
    catch (err) {
      console.log(err.response);
      alert("somthing went wrong try again");
    }
  }
  useEffect(async () => {
    const item = await getMostListner()
    setItems(item)

    // console.log("dsdsdsdsd", item)
  }, [])

  // console.log(items)
  return (
    <div className='grid gap-y-6 pt-6'>
      {items.length > 0 ? <ComponentShelf title={'Your daily music needs'} seeAll="/vfmkvgkbn" items={itemsA} /> : null}
      <ComponentShelf title={'focus'} seeAll="/vfmkvgkbn" items={items2} />
      <ComponentShelf title={'Bring music to your home'} seeAll="/vfmkvgkbn" items={items3} />
    </div>
  )
  // }catch (err) {
  //   console.log(err.response);
  //   alert(err.response);
  // }
}

export default Home