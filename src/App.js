import { BrowserRouter, Routes, Route } from "react-router-dom";
// בשביל הודעות טוסט צריך קונטיינר שיהיה באפ ואת
// הסי אס אס שלו
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
// import { adminRoutes } from "./comps_admin/adminRoutes";
import Login from "./components/client_comps/login";
import Home from "./views/Home";
import SideBar from "./components/SideBar";
import Content from "./components/Content";
import BottomBar from "./components/BottomBar";
import Search from "./views/Search";

function App() {
  return (
    <BrowserRouter>
      <div className="main-container">
       {/* התפריט צד משמאל */}
        <SideBar />
        {/* לתוכן שישהיה מימין ניתובים וראוטים */}
        <Content />
      </div>
      <ToastContainer position="top-left" theme="colored" />
      
      <BottomBar />

    </BrowserRouter>
  );
}

export default App;
