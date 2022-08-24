import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs/esm6";

function ChatRoom() {
  //기본설정---헤더, 토큰, 주소
  const headers = {
    authorization: window.localStorage.getItem("authorization"),
  };
  const socket = new SockJS(`<base URL - 웹소켓 서버 주소>/ws`);
  const stompClient = Stomp.over(socket);

  //연결&구독
  stompClient.connect(
    headers,
    (frame) => {
      stompClient.subscribe(
        "<subscribe하는 topic>",
        () => {
          // subscribe 후 실행하는 곳
        },
        headers
      );
    },
    () => {
      // disconnect 시 실행 되는 곳
    }
  );
  return <div>ChatRoom</div>;
}

export default ChatRoom;
