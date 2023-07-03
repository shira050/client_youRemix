// import React, { useState } from 'react';
// import RowSection from '../client_comps/rowSection';
// import HeaderTitle from '../Content/HeaderTitle';

// function ComponentList({ title, items, rate }) {
//   const [shuffledItems, setShuffledItems] = useState(items);

//   const shuffleItems = () => {
//     const shuffled = [...shuffledItems];
//     for (let i = shuffled.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//     }
//     setShuffledItems(shuffled);
//   };

//   return (
//     <section className='mb-4 min-w-full'>
//       <HeaderTitle title={title} font={'semibold'} />
//       <div className='grid gap-x-6'>
//         {shuffledItems.map((item) => (
//           <RowSection item={item} key={item._id} />
//         ))}
//       </div>
//       <button onClick={shuffleItems}>Shuffle Items</button>
//     </section>
//   );
// }

// export default ComponentList;

import React, { useEffect, useState } from "react";
import ComponentList from "../client_comps/componentList";
import { USER } from "../../services/apiService";

function Playlist() {
  const [userSearch, setUserSearch] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (localStorage[USER]) {
        //  const songs1Data = await getSongList("songs/mostSearch");
        // setUserSearch(songs1Data);
        setUserSearch(JSON.parse(localStorage[USER]).lastSearch);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <ComponentList title={"Your last search"} items={userSearch} />
    </>
  );
}

export default Playlist;



