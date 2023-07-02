import React, { useEffect, useRef, useState } from "react";
import HeaderTitle from "../components/Content/HeaderTitle";
import Category from "../components/Content/SearchContent/Category";
import ListenedCategory from "../components/Content/SearchContent/ListenedCategory";
import ScrollContainer from "react-indiana-drag-scroll";
import { Icon } from "../icons/Icons";
import { doApiMethod, API_URL, USER, doApiGet } from "../services/apiService";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";

function Search() {
  // const { currentUser } = useSelector((state) => state.user);
  const favRef = useRef();
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(false);
  const [mostListened, setMostListened] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const doApiCategories = async () => {
    let url = API_URL + "categories";
    try {
      let resp = await doApiGet(url);
      setCategories(resp.data);
      setLoading(false);
    } catch (err) {
      console.log(err.response);
      alert("Categories wrong or service down");
      setLoading(false);
    }
  };
  useEffect(() => {
   
    doApiCategories();
    const userLocalStorage = localStorage.getItem(USER);

    if (userLocalStorage) {
      const parsedUser = JSON.parse(userLocalStorage);
      setMostListened(parsedUser.lastSearch);
    }    if (favRef.current) {

      const scrollHandle = () => {
        const isEnd = favRef.current.scrollLeft + favRef.current.offsetWidth + 0.20001220703125 === favRef.current.scrollWidth
        // 688+ 1136 === 1824

        const isFirst = favRef.current.scrollLeft === 0

        setPrev(!isFirst)
        setNext(!isEnd)
      }
      scrollHandle()
      favRef.current.addEventListener('scroll', scrollHandle)

      return () => {
        favRef?.current?.removeEventListener('scroll', scrollHandle)
      }

    }
  }, [])
  // useEffect(() => {
  //   doApiCategories();

  //   if (currentUser) {
  //     setMostListened(currentUser.lastSearch);
  //   }
  
  //   const scrollHandle = () => {
  //     const isEnd =
  //       favRef.current.scrollLeft +
  //         favRef.current.offsetWidth +
  //         0.20001220703125 ===
  //       favRef.current.scrollWidth;
  //     const isFirst = favRef.current.scrollLeft === 0;

  //     setPrev(!isFirst);
  //     setNext(!isEnd);
  //   };

  //   if (favRef.current) {
  //     favRef.current.addEventListener("scroll", scrollHandle);
  //   }

  //   return () => {
  //     if (favRef.current) {
  //       favRef.current.removeEventListener("scroll", scrollHandle);
  //     }
  //   };
  // }, [currentUser]);

  const scrollForward = () => {
    favRef.current.scrollLeft += favRef.current.offsetWidth - 300;
  };

  const scrollBackward = () => {
    favRef.current.scrollLeft -= favRef.current.offsetWidth - 300;
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while fetching the data
  }

  return (
    <>
      <section className="mb-8">
        <HeaderTitle
          title={"Favorite Genres"}
          seeAll={false}
          font={"bold"}
          textDecoration={"no-underline"}
        />
        {/* currentUser */}
        {localStorage[USER] != null ? (
          <div className="relative">
            {prev && (
              <button
                onClick={scrollBackward}
                className="w-12 h-12 bg-white text-black flex items-center justify-center rounded-full absolute -left-6 z-10 top-1/2 -translate-y-1/2 hover:scale-[1.06]"
              >
                <Icon name={"preview"} size={16} />
              </button>
            )}
            {next && (
              <button
                onClick={scrollForward}
                className="w-12 h-12 bg-white text-black flex items-center justify-center rounded-full absolute -right-6 z-10 top-1/2 -translate-y-1/2 hover:scale-[1.06]"
              >
                <Icon name={"next"} size={16} />
              </button>
            )}
            <ScrollContainer
              innerRef={favRef}
              className="flex overflow-x-auto gap-x-6 scroll-smooth"
            >
              {mostListened.map((item) => (
                <ListenedCategory key={item._id} category={item} />
              ))}
            </ScrollContainer>
         
            {JSON.parse(localStorage[USER]).lastSearch.length==0 && 
                  <i className="display-6">
                  <p>you have not any favorite yet...</p>
                </i>
                }
          </div>
               

        
        ) 
        :
         (
          <i className="display-6">
            <p>you have not any favorite here</p>
            <p>you have to login</p>
            <Link to='/users/login'> <MDBBtn className="rounded btn-success"> Login</MDBBtn></Link>
          </i>
        )}
      </section>

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
    </>
  );
}

export default Search;
