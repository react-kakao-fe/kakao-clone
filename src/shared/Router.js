import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Chat from "../pages/Chat";
import Login from "../pages/Login";
import Main from "../pages/Main";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 회원가입 */}
        <Route path="#" element={<Register />} />
        {/* 로그인 */}
        <Route path="#" element={<Login />} />
        {/* 메인 */}
        <Route path="/" element={<Main />} />
        {/* 채팅 */}
        <Route path="#" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
