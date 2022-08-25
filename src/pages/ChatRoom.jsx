import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadMessage } from "../_redux/modules/chat_sever";
import { addMessage } from "../_redux/modules/chat_sever";
import { __getUserInfo } from "../_redux/modules/user_info";
import Friend from "../components/Chat/Friend";
import Me from "../components/Chat/Me";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

function ChatRoom() {
  //기본설정---헤더, 토큰, 주소설정
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const headers = {
    Authorization: window.localStorage.getItem("authorization"),
  };
  const socket = new SockJS("http://54.180.79.105/socket");
  const client = Stomp.over(socket);

  //렌더되면 소켓 연결실행
  useEffect(() => {
    onConneted();
    return () => {
      onConneted();
    };
  }, []);

  //axios로 데이터 불러오는 용
  useEffect(() => {
    dispatch(loadMessage());
  }, []);
  const chatList = useSelector((state) => state.chat.chat);

  //유저인포에서 내 정보 가져오기
  useEffect(() => {
    dispatch(__getUserInfo());
  }, []);
  const userInfo = useSelector((state) => state.myinfo.user.data);

  //연결&구독
  function onConneted() {
    try {
      client.connect(headers, () => {
        client.subscribe(
          `/sub/channel/4`,
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
      `/pub/message/4`,
      headers,
      JSON.stringify({
        content: message,
      })
    );
    setMessage("");
  };

  return (
    <div>
      {chatList
        .slice(0)
        .reverse()
        .map((chat) => {
          if (chat.memberId === userInfo?.id) {
            return (
              <div key={chat.createdAt}>
                <Me content={chat.content} />
              </div>
            );
          } else {
            return (
              <div key={chat.createdAt}>
                <Friend
                  content={chat.content}
                  nickname={chat.nickname}
                  imgUrl={chat.imgUrl}
                />
              </div>
            );
          }
        })}
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>버튼입니다</button>
    </div>
  );
}
export default ChatRoom;
