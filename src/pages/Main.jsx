import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { MainHeader } from "../components/header/MainHeader";
import { __getUserInfo } from "../_redux/modules/userinfo";

const MainContainer = styled.div`
  width: 100%;
`;
const MainInlineContainer = styled.div`
  padding: 15px;
`;

const MainInlineWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 10px;
`;

const ImageTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const ImageContainer = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const Main = () => {
  const userInfo = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(userInfo);

  useEffect(() => {
    dispatch(__getUserInfo());
  }, []);

  return (
    <>
      <MainContainer>
        <MainHeader />
        <MainInlineContainer>
          <MainInlineWrapper>
            {/* <ImageContainer>
              <img
                src={userInfo.imageUrl}
                alt=""
                style={{ width: "100%", height: "100%" }}
              />
            </ImageContainer> */}
            {/* <ImageTitleContainer>
              <span>{userInfo.username}</span>
              <span>{userInfo.nickname}</span>
            </ImageTitleContainer> */}
          </MainInlineWrapper>
        </MainInlineContainer>
      </MainContainer>
    </>
  );
};

export default Main;
