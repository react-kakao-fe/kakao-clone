import { React, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Chatfilled } from "../assets/chat-fill.svg";

//전체 가운데 정렬용
const MainContainer = styled.div`
  width: 50vw;
  height: 70vh;
  display: flex;
  flex-direction: column;
  flex-wrap: warp;
  align-items: center;
  justify-content: center;
  background-color: #fff323;
`;

const Chat = () => {
  return <MainContainer>chat</MainContainer>;
};

export default Chat;
