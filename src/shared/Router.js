import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Chat from "../pages/Chat";
import Login from "../pages/Login";
import Main from "../pages/Main";
import OpenChat from "../pages/OpenChat";
import MoreDetail from "../pages/MoreDetail";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 회원가입 */}
        <Route path="/register" element={<Register />} />
        {/* 로그인 */}
        <Route path="/login" element={<Login />} />
        {/* 메인 */}
        <Route path="/" element={<Main />} />
        {/* 채팅 */}
        <Route path="/chat" element={<Chat />} />
        {/* 오픈채팅 */}
        <Route path="/openchat" element={<OpenChat />} />
        {/* 더보기 */}
        <Route path="/detail" element={<MoreDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
