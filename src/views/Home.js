import React, { useEffect, useState } from "react";
import ComponentShelf from "../components/Content/HomeContent/ComponentShelf";
import { getSongList } from "../services/songMetod";
import HeaderTitle from "../components/Content/HeaderTitle";
import Category from "../components/Content/SearchContent/Category";
import { USER } from "../services/apiService";
import FeedbackStar from "../comps_admin/feedbek";

function Home() {
  const [mostSearch, setMostSearch] = useState([]);
  const [highestRating, setHighestRating] = useState([]);
  const [userSearch, setUserSearch] = useState([]);
  const [categories, setCategories] = useState([]);
  const [allSong, setAllSong] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const mostSearchData = await getSongList("songs/mostSearch");
      setMostSearch(mostSearchData);
      if (localStorage[USER]) {
        //  const songs1Data = await getSongList("songs/mostSearch");
        // setUserSearch(songs1Data);
        setUserSearch(JSON.parse(localStorage[USER]).lastSearch);
      }

      const categoriesData = await getSongList("categories");
      setCategories(categoriesData);

      const songsData = await getSongList("songs");
      setAllSong(songsData);
      // const raitingRemix = await getSongList("songs/mostSearch");
      setHighestRating(mostSearchData);
    };

    fetchData();
  }, []);

  return (
    <div className="grid gap-y-6 pt-6">
      <section>
        <HeaderTitle
          title={"All categories"}
          seeAll={false}
          font={"bold"}
          textDecoration={"no-underline"}
        />
        <div className="grid grid-cols-6 gap-6">
          {categories.map((item) => (
            <Category key={item._id} category={item} />
          ))}
        </div>
      </section>

      {userSearch.length > 0 && 
        <ComponentShelf title={"Your last search"} items={userSearch} />
      }

      {mostSearch.length > 0 && (
        // <ComponentShelf title={"most listeners songs"} items={mostSearch} />
      //   <>
      //   <FeedbackStar rating={5}></FeedbackStar>
      //   <ComponentShelf title={"Remixes With Highest Rating" } items={highestRating} />
      //  </>
      <ComponentShelf
  title={<><FeedbackStar rating={5} /> Remixes With Highest Rating</>}
  items={highestRating}
  rate={true}
/>

      )}
      {/* <ComponentShelf title={'Bring music to your home'} seeAll ="/vfmkvgkbn" items={items3}/> */}

      <ComponentShelf title={"All Remixes"} items={allSong} />
    </div>
  );
}

export default Home;
