import React from "react";
import styled from "styled-components";

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

function Chatlists() {
  return (
    <>
      <ChatWrap>
        <ChatContainer>
          <img src="https://firebasestorage.googleapis.com/v0/b/test-12a64.appspot.com/o/images%2Fdefault.jpeg?alt=media&token=5fcde518-3706-4b4b-b2df-fe1efbc13049" />
          <ChatBox>
            <p>참여자 이름</p>
            <span>마지막 채팅내용</span>
          </ChatBox>
        </ChatContainer>
        <ChatTimeBox>
          <span>채팅시간</span>
        </ChatTimeBox>
      </ChatWrap>
      <ChatWrap>
        <ChatContainer>
          <img src="https://firebasestorage.googleapis.com/v0/b/test-12a64.appspot.com/o/images%2Fdefault.jpeg?alt=media&token=5fcde518-3706-4b4b-b2df-fe1efbc13049" />
          <ChatBox>
            <p>참여자 이름</p>
            <span>마지막 채팅내용</span>
          </ChatBox>
        </ChatContainer>
        <ChatTimeBox>
          <span>채팅시간</span>
        </ChatTimeBox>
      </ChatWrap>
    </>
  );
}

export default Chatlists;
