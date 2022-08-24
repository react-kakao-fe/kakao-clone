import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addMessage } from "../_redux/modules/chat";
import { getMessage } from "../_redux/modules/chat";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

function ChatRoom() {
  //기본설정---헤더, 토큰, 주소설정
  const params = useParams();
  const dispatch = useDispatch();
  const [message, setMessage] = useState();
  const headers = {
    Authorization: window.localStorage.getItem("authorization"),
  };

  const socket = new SockJS("http://13.209.17.224/socket");
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
  const chatList = useSelector((state) => state.chat);
  console.log(chatList);

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
    } catch (error) {
      console.log(error);
    }
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
    <div>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>버튼입니다</button>
      {/* {chatList.map((chat) => {
        if (chat.id === params.id) return <div>{chat.contet}</div>;
      })} */}
    </div>
  );
}

export default ChatRoom;
