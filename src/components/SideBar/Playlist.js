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
