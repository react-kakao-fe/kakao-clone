import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadMessage } from "../_redux/modules/chat_sever";
import { addMessage } from "../_redux/modules/chat_sever";
import { __getUserInfo } from "../_redux/modules/user_info";
import Friend from "../components/Chat/Friend";
import Me from "../components/Chat/Me";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import styled from "styled-components";

function ChatRoom() {
  //기본설정---헤더, 토큰, 주소설정
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const headers = {
    Authorization: window.localStorage.getItem("authorization"),
  };
  const socket = new SockJS(`${process.env.REACT_APP_BASE_URL}/socket`);
  const client = Stomp.over(socket);

  const chatList = useSelector((state) => state.chat.chat);
  const userInfo = useSelector((state) => state.myinfo.user.data);

  const roomId = useParams();

  //렌더되면 소켓 연결실행
  useEffect(() => {
    onConneted();
    return () => {
      onConneted();
    };
  }, []);

  //axios로 데이터 불러오는 용
  useEffect(() => {
    dispatch(loadMessage(roomId.id));
  }, []);

  useEffect(() => {
    dispatch(__getUserInfo());
  }, []);

  const handleEnterPress = (e) => {
    if (message.trim() === "") {
      e.preventDefault();
    }
    if (e.keyCode === 13 && e.shiftKey == false) {
      sendMessage();
    }
  };

  //연결&구독
  function onConneted() {
    try {
      client.connect(headers, () => {
        client.subscribe(
          `/sub/channel/${roomId.id}`,
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
      `/pub/message/${roomId.id}`,
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
            if (chat.memberId === userInfo?.id) {
              return (
                <div
                  style={{
                    height: "100%",
                  }}
                  key={chat.createdAt}
                >
                  <Me content={chat.content} />
                </div>
              );
            } else {
              return (
                <div key={chat.createdAt}>
                  <Friend
                    key={chat.createdAt}
                    content={chat.content}
                    nickname={chat.nickname}
                    imgUrl={chat.imgUrl}
                  />
                </div>
              );
            }
          })}
      </MessageWrapper>
      <MessageFormContainer>
        <MessageForm>
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
  display: flex;
  padding: 10px;
  flex-direction: column-reverse;
  background-color: #b2c7d9;
`;

const MessageFormContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  background-color: white;
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
  textarea:focus {
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex: 3;
  padding-top: 20px;
  justify-content: center;
  padding-right: 10px;
  button {
    width: 50px;
    height: 30px;
  }
`;

export default ChatRoom;
