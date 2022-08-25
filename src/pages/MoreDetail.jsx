import React from "react";
import styled from "styled-components";
import { DetailHeader } from "../components/header/DetailHeader";
import KakaoImage from "../assets/kakao2.png";

const MoreDetailContainer = styled.div`
  width: 50vw;
  height: 70vh;
  display: flex;
  box-shadow: 2px 2px 2px 2px #cacaca;
  background-color: white;
`;

const MoreDetailHeaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MoreDetailInlineWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const KakaoBackgroundImage = styled.div`
  width: 200px;
  height: 200px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background: url(${KakaoImage});
`;

const MoreDetail = () => {
  return (
    <>
      <MoreDetailContainer>
        <MoreDetailHeaderContainer>
          <DetailHeader />
          <ImageContainer>
            <KakaoBackgroundImage />
          </ImageContainer>
          <MoreDetailInlineWrapper>
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
                서비스가 준비 중에 있습니다.
              </span>
              <span style={{ fontSize: "1.1em", fontWeight: "bold" }}>
                다음에 다시 방문해 주세요.
              </span>
            </div>
          </MoreDetailInlineWrapper>
        </MoreDetailHeaderContainer>
      </MoreDetailContainer>
    </>
  );
};

export default MoreDetail;
