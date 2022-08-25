import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../_redux/modules/chat";
import { getMessage } from "../_redux/modules/chat";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import styled from "styled-components";
import { __getUserInfo } from "../_redux/modules/user_info";

function ChatRoom() {
  //기본설정---헤더, 토큰, 주소설정
  const dispatch = useDispatch();
  const [message, setMessage] = useState();
  const headers = {
    Authorization: window.localStorage.getItem("authorization"),
  };
  const myId = useSelector((state) => state.myinfo.user.data.id);
  const chatList = useSelector((state) => state.chat.chat.payload);
  const chat = useSelector((state) => state.chat.chat);

  console.log(chat);

  const socket = new SockJS("http://54.180.79.105/socket");
  const client = Stomp.over(socket);

  //렌더되면 소켓 연결실행
  useEffect(() => {
    onConneted();
    return () => {
      onConneted();
    };
  }, []);

  //렌더되면 이전 채팅 데이터 불러오기
  useEffect(() => {
    dispatch(getMessage());
  }, []);

  useEffect(() => {
    dispatch(__getUserInfo());
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    setMessage("");
  };

  const handleEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey == false) {
      sendMessage();
    }
  };

  //연결&구독
  function onConneted() {
    try {
      client.connect(headers, () => {
        client.subscribe(
          `/sub/channel/3`,
          (data) => {
            const newMessage = JSON.parse(data.body);
            dispatch(addMessage(newMessage));
          },
          headers
        );
      });
    } catch (error) {}
  }

  //메시지 보내기
  const sendMessage = () => {
    client.send(
      `/pub/message/3`,
      headers,
      JSON.stringify({
        content: message,
      })
    );
    setMessage("");
  };

  return (
    <MessageContainer>
      <MessageWrapper>
        {chatList &&
          chatList.map((chat) => {
            if (myId === chat.memberId) {
              console.log(chat.memberId, myId);
              return (
                <div
                  style={{
                    color: "red",
                    height: "15px",
                  }}
                >
                  <span style={{ color: "red" }}>{chat}</span>
                </div>
              );
            } else {
              return <div style={{ color: "black" }}>{chat.content}</div>;
            }
          })}
      </MessageWrapper>
      <MessageFormContainer>
        <MessageForm type="submit" onSubmit={handleForm}>
          <textarea
            type="button"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleEnterPress}
          />
          <ButtonContainer>
            <button onClick={sendMessage}>전송</button>
          </ButtonContainer>
        </MessageForm>
      </MessageFormContainer>
    </MessageContainer>
  );
}

const MessageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MessageWrapper = styled.div`
  flex: 4;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

const MessageFormContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  background-color: white;
  border: 1px solid black;
`;

const MessageForm = styled.form`
  display: flex;
  width: 100%;
  height: 100%;
  textarea {
    resize: none;
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const ButtonContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex: 3;
  padding-top: 20px;
  justify-content: center;
  button {
    width: 50px;
    height: 30px;
  }
`;

export default ChatRoom;
