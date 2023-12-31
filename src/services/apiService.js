import axios from "axios";
import { _ } from "lodash";
export const API_URL = "https://youremix.onrender.com/";
export const TOKEN_NAME = "RemixSecret";
export const USER = "user";


export const doApiGet = async (_url) => {
  try {
    let resp = await axios.get(_url, {
      headers: {
        "x-api-key": localStorage[TOKEN_NAME],
      },
    });
    return resp;
  } catch (err) {
    // throw-> בבקשות של פרומיס מזהים את זה בתור החזרת שגיאה
    throw err;
  }
};

// For Post,delete, put, patch
export const doApiMethod = async (_url, _method, _body = {}) => {
  try {
    
    console.log(_body);
    let resp = await axios({
      url: _url,
      method: _method,
      data: _body,
      headers: {
        "x-api-key": localStorage[TOKEN_NAME],
      },
    });
    console.log(resp.data);
    return resp;
  } catch (err) {
    throw err;
  }
};
