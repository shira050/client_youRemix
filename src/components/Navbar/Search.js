import React, { useRef } from "react";
import { Icon } from "../../icons/Icons";
import { API_URL, USER, doApiGet } from "../../services/apiService";
import { useNavigate } from "react-router-dom";

function Search() {
  const searchRef = useRef();

  const nav = useNavigate();

  const doApiGetSong = async () => {
    //console.log(searchRef.current.value);
    let url = `${API_URL}songs/search/?s=${searchRef.current.value}`;
    console.log(url);
    try {
      let resp = await doApiGet(url);
      console.log(resp.data);
      if (resp.data.length > 0) {
        alert("good");
        localStorage.setItem(USER, JSON.stringify(resp.data));
      } else nav("songs/addSong");
    } catch (err) {
      console.log(err.response);
      alert("User or password worng, or service down");
    }
  };

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
        type={"text"}
        id="search-input"
        autoFocus={true}
        className={
          "h-10 max-w-full w-[22.75rem] py-1.5 px-12 bg-white rounded-full text-ellipsis placeholder-black/50 text-black text-sm font-semibold outline-none"
        }
        placeholder={"search RemixSong"}
      />
      {/* {errors.search && <div className="text-danger">Enter valid search</div>} */}
    </div>
  );
}

export default Search;