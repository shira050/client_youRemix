import axios from "axios";
import React, { useRef } from "react";
import { API_URL, TOKEN_NAME } from "../services/apiService";

export default function UploadTest({url}) {
  debugger
  const fileRef = useRef();

  const onSub = (e) => {
    debugger;
    e.preventDefault();
    console.log("upload file form");

    doApiFileUpload();
  };



  const doApiFileUpload = async () => {debugger
    let file= fileRef.current.files[0];
    if (file == "" || file == null || file == undefined) {
      return false;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "songImages");

    const resp = await axios.post(
      "https://api.cloudinary.com/v1_1/diallwuuh/image/upload",
      formData
    );
    console.log(resp.data.url);
    url=resp.data.url;
    alert("תמונה הועלתה בהצלחה לענן")
   
  

  };


  
 

  return (
    <div>
      <form onSubmit={onSub} className="m-3 w-100">
        <label>Upload file</label>
        <input className="form-control" ref={fileRef} type="file" />
        <br />
        <button className="rounded btn btn-success">Upload</button>
      </form>
    </div>
  );
}
