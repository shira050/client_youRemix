import axios from "axios";
export const makeSong = async (title) => {
    try {
      let resp = await axios.get('http://localhost:5000/'+title);
      return resp;
    } catch (err) {
      throw err;
    }
  };