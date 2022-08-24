import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getChatRoom } from "../_redux/modules/chat";

function Chatlists(searchVal) {
  const dispatch = useDispatch();
  const chatRoomList = useSelector((state) => state.chat.chat);

  console.log(chatRoomList);

  const searchChatName =
    chatRoomList &&
    chatRoomList.filter((chat) => {
      return chat.chatRoomName.toLowerCase().includes(searchVal.toLowerCase());
    });

  useEffect(() => {
    dispatch(__getChatRoom());
  }, []);

  return (
    <>
      <ChatWrap>
        {searchChatName &&
          searchChatName.map((list) => {
            return (
              <div key={list.id}>
                <ChatContainer>
                  <img
                    alt=""
                    src="https://firebasestorage.googleapis.com/v0/b/test-12a64.appspot.com/o/images%2Fdefault.jpeg?alt=media&token=5fcde518-3706-4b4b-b2df-fe1efbc13049"
                  />
                  <ChatBox>
                    <span>{list.chatRoomName}</span>
                    {/* <span>마지막 채팅내용</span> */}
                  </ChatBox>
                </ChatContainer>
                <ChatTimeBox>{/* <span>채팅시간</span> */}</ChatTimeBox>
              </div>
            );
          })}
      </ChatWrap>
    </>
  );
}

const ChatWrap = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ChatContainer = styled.div`
  width: 100%;
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
  /* flex-direction: column; */
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

export default Chatlists;
