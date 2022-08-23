import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Chat from "../pages/Chat";
import Login from "../pages/Login";
import Main from "../pages/Main";
import OpenChat from "../pages/OpenChat";
import MoreDetail from "../pages/MoreDetail";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";

const Router = () => {
  const access = localStorage.getItem("authorization");
  const refresh = localStorage.getItem("refresh-token");

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />}>
          {/* 메인 */}
          <Route
            path="/"
            element={
              <PrivateRoute
                access={access}
                refresh={refresh}
                component={<Main />}
              />
            }
          />
          {/* 채팅 */}
          <Route
            path="chat"
            element={
              <PrivateRoute
                access={access}
                refresh={refresh}
                component={<Chat />}
              />
            }
          />
          {/* 오픈채팅 */}
          <Route
            path="openchat"
            element={
              <PrivateRoute
                access={access}
                refresh={refresh}
                component={<OpenChat />}
              />
            }
          />
          {/* 더보기 */}
          <Route
            path="detail"
            element={
              <PrivateRoute
                access={access}
                refresh={refresh}
                component={<MoreDetail />}
              />
            }
          />
        </Route>
        {/* 회원가입 */}
        <Route path="/register" element={<Register />} />
        {/* 로그인 */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
