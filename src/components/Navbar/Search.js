import { Icon } from "../../icons/Icons";
import { API_URL, USER, doApiGet } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../store/redax/featchers.js/userSlice";
import { useDispatch } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

function Search() {
  const dispatch = useDispatch();
  const searchRef = useRef(null);
  const nav = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const doApiGetSong = async () => {
    // console.log(searchRef.current.value);
    let url = `${API_URL}songs/search/?s=${searchRef.current.value}`;
    console.log(url);
    try {
      let resp = await doApiGet(url);
      console.log(resp.data);
      if (resp.data.length > 0) {
        alert("good");

        localStorage.setItem(USER, JSON.stringify(resp.data));
        // dispatch(loginSuccess(resp.data));
      } else nav("songs/addSong");
    } catch (err) {
      console.log(err.response);
      alert("User or password wrong, or service down");
    }
  };

  const handleInputChange = async () => {
    const inputValue = searchRef.current.value;
    if (inputValue.trim() === "") {
      setSearchResults([]);
      return;
    }

    const options = {
      method: "GET",
      url: "https://spotify23.p.rapidapi.com/search/",
      params: {
        q: inputValue,
        type: "genres",
        offset: "0",
        limit: "10",
        numberOfTopResults: "5",
      },
      headers: {
        "X-RapidAPI-Key": "5de34e95a4mshb1f3a9b13bd7f20p1f736fjsn25057c5e3ed1",
        "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
        "access-control-allow-credentials": "true",
        "access-control-allow-origin": "*",
        connection: "keep-alive",
        "content-length": "46898",
        "content-type": "application/json",
        date: "Mon, 07 Mar 2022 09:39:05 GMT",
        server: "RapidAPI-1.2.8",
        "x-powered-by": "PHP/8.0.15, PleskLin",
        "x-rapidapi-region": "AWS - eu-central-1",
        "x-rapidapi-version": "1.2.8",
      },
    };

    try {
      const response = await axios.request(options);
      debugger;
      console.log(response.data);
      setSearchResults(response.data.genres.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const delayTimer = setTimeout(handleInputChange, 500);
    return () => {
      clearTimeout(delayTimer);
    };
  }, []);

  return (
    <div className="mr-auto ml-4 relative">
      <label
        onClick={doApiGetSong}
        htmlFor="search-input"
        className="w-10 h-10 flex items-center justify-center absolute top-0 left-1 right-3 text-[#121212]"
      >
        <Icon size={24} name={"search"} />
      </label>
      <input
        ref={searchRef}
        type="text"
        id="search-input"
        autoFocus={true}
        className="h-10 max-w-full w-[22.75rem] py-1.5 px-12 bg-white rounded-full text-ellipsis placeholder-black/50 text-black text-sm font-semibold outline-none"
        placeholder="Search RemixSong"
        onChange={handleInputChange}
      />
      {/* Display search results */}
      {searchResults.length > 0 && (
        <ul className="absolute left-0 right-0 bg-dark rounded-b-lg shadow-md overflow-hidden mt-2">
          {searchResults.map((result) => (
            <li
              key={result.id}
              className="py-2 px-4 hover:bg-gray-100 hover:text-black cursor-pointer"
              onClick={()=>{searchRef.current.value=result.data.name}}
            >
              {result.data.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default Search;
