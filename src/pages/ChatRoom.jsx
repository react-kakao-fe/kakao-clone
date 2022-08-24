import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs/esm6";
import { addChatroom } from "../_redux/modules/chat";

function ChatRoom() {
  const BASE_URL = "http://13.209.17.224";
  //기본설정---헤더, 토큰, 주소
  const headers = {
    authorization: window.localStorage.getItem("authorization"),
  };
  const [contents, setContents] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const roomId = useSelector((state) => state.chat.chat);

  useEffect(() => {
    dispatch(addChatroom());
  }, []);

  console.log(roomId);

  useEffect(() => {
    const socket = new SockJS(`${BASE_URL}/socket/ws`);
    const stompClient = Stomp.over(socket);
    stompClient.debug = null;
    stompClient.connect({}, () => {
      stompClient.subscribe(`${BASE_URL}/sub/channel/{roomid}`);
    });
  });

  //연결&구독
  // stompClient.connect(
  //   headers,
  //   (frame) => {
  //     stompClient.subscribe(
  //       "<subscribe하는 topic>",
  //       () => {
  //         // subscribe 후 실행하는 곳
  //       },
  //       headers
  //     );
  //   },
  //   () => {
  //     // disconnect 시 실행 되는 곳
  //   }
  // );
  return <div>ChatRoom</div>;
}

export default ChatRoom;
