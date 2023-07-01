import { API_URL,doApiGet } from "./apiService";

export const getSongList = async (route) => {
    let url = `${API_URL}${route}`;
    console.log(url);
    try {
      let resp = await doApiGet(url);
      console.log("yyyyy");
      console.log(resp.data);
      return resp.data;
    } 
    catch (err) {
      console.log(err.response);
      alert("something went wrong, please try again");
    }
  }  