import React from "react";
import styled from "styled-components";
import { ChatHeader } from "../components/Header";
import { Navigation } from "../components/Navigation";
import kakaoImg from "../assets/kakao.png";

const OpenChatContainer = styled.div`
  width: 50vw;
  height: 70vh;
  display: flex;
  box-shadow: 2px 2px 2px 2px #cacaca;
`;

const OpenChatHeaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const OpenChatInlineWrapperr = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const KakaoImage = styled.div`
  width: 300px;
  height: 200px;
  background-position: center;
  background-size: cover;
  background: url(${kakaoImg});
  background-repeat: no-repeat;
`;

const OpenChat = () => {
  return (
    <>
      <OpenChatContainer>
        <Navigation />
        <OpenChatHeaderContainer>
          <ChatHeader />
          <OpenChatInlineWrapperr>
            <ImageContainer>
              <KakaoImage />
            </ImageContainer>
            <div
              style={{
                paddingTop: "50px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: "30px",
              }}
            >
              <span style={{ fontSize: "1.1em", color: "#585858" }}>
                서비스가 종료되었습니다.
              </span>
              <span style={{ fontSize: "1.1em", fontWeight: "bold" }}>
                나중에 더 좋은 서비스로 찾아뵙겠습니다.
              </span>
            </div>
          </OpenChatInlineWrapperr>
        </OpenChatHeaderContainer>
      </OpenChatContainer>
    </>
  );
};

export default OpenChat;
