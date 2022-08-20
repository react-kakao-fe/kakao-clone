import React from "react";
import styled from "styled-components";
import { ChatHeader } from "../components/Header";
import { Navigation } from "../components/Navigation";

const ChatContainer = styled.div`
  width: 50vw;
  height: 70vh;
  display: flex;
  box-shadow: 2px 2px 2px 2px #cacaca;
`;

const ChatHeaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ChatInlineWrapperr = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px;
`;

const Chat = () => {
  return (
    <>
      <ChatContainer>
        <Navigation />
        <ChatHeaderContainer>
          <ChatHeader />
          <ChatInlineWrapperr>채팅목록</ChatInlineWrapperr>
        </ChatHeaderContainer>
      </ChatContainer>
    </>
  );
};

export default Chat;
