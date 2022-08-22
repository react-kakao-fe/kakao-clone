import React from "react";
import styled from "styled-components";
import { ChatHeader } from "../components/header/ChatHeader";

const ChatContainer = styled.div`
  width: 100%;
`;

const ChatHeaderContainer = styled.div`
  padding: 15px;
`;

const ChatInlineWrapperr = styled.div``;

const Chat = () => {
  return (
    <>
      <ChatContainer>
        <ChatHeader />
        <ChatHeaderContainer>
          <ChatInlineWrapperr>ss</ChatInlineWrapperr>
        </ChatHeaderContainer>
      </ChatContainer>
    </>
  );
};

export default Chat;
