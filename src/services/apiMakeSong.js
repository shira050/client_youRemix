import axios from "axios";
export const makeSong = async (title) => {
    try {
      debugger

      const url = 'http://localhost:5000/separate';
      const data = { song_name: title };
      const response = await axios.post(url,data);

      return response.data;
    } catch (err) {
      throw err;
    }
  };