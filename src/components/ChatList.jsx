import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ChatWrap = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ChatContainer = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  img {
    width: 35px;
    height: 35px;
    border-radius: 10px;
  }
`;

const ChatBox = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  span {
    font-size: 14px;
  }
  p {
    font-weight: bold;
    font-size: 14px;
  }
`;

const ChatTimeBox = styled.div`
  span {
    font-size: 14px;
  }
`;

function ChatList({ chatRoomId, lastChatTime, chatRoomName, lastContent }) {
  const navigate = useNavigate();
  console.log(chatRoomId);
  return (
    <>
      <ChatWrap>
        <ChatContainer
          onClick={() => {
            navigate(`/chatroom/${chatRoomId}`);
          }}
        >
          <img src="https://firebasestorage.googleapis.com/v0/b/test-12a64.appspot.com/o/images%2Fdefault.jpeg?alt=media&token=5fcde518-3706-4b4b-b2df-fe1efbc13049" />
          <ChatBox>
            <p>{chatRoomName}</p>
            <span>{lastContent}</span>
          </ChatBox>
        </ChatContainer>
        <ChatTimeBox>
          <span>{lastChatTime}</span>
        </ChatTimeBox>
      </ChatWrap>
    </>
  );
}

export default ChatList;
