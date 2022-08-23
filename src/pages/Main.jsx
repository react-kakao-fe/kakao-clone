import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { MainHeader } from "../components/header/MainHeader";
import { __getUserInfo } from "../_redux/modules/user_info";
import { __getPlusUser } from "../_redux/modules/friend_info";

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
  const userInfo = useSelector((state) => state.myinfo.user.data);
  const friendInfo = useSelector((state) => state.friend.userFriend);
  const dispatch = useDispatch();

  console.log(userInfo);
  useEffect(() => {
    dispatch(__getUserInfo());
  }, []);

  useEffect(() => {
    dispatch(__getPlusUser());
  }, []);

  return (
    <>
      <MainContainer>
        <MainHeader />
        <MainInlineContainer>
          <MainInlineWrapper>
            <ImageContainer>
              <img
                src={userInfo && userInfo.imgUrl}
                alt=""
                style={{ width: "100%", height: "100%" }}
              />
            </ImageContainer>
            <ImageTitleContainer>
              <span style={{ fontWeight: "bold" }}>
                {userInfo && userInfo.username}
              </span>
              <span>{userInfo && userInfo.nickname}</span>
            </ImageTitleContainer>
          </MainInlineWrapper>
          <div
            style={{
              color: "black",
              width: "100%",
              height: "100%",
              border: "1px solid black",
            }}
          >
            {friendInfo &&
              friendInfo.map((friend) => {
                return (
                  <div
                    style={{
                      color: "black",
                      width: "100%",
                      height: "100%",
                      border: "1px solid black",
                    }}
                    key={friend.id}
                  >
                    <span style={{ color: "black" }}>{friend.nickname}</span>
                    {/* <span>{friend.imgUrl}</span> */}
                  </div>
                );
              })}
          </div>
        </MainInlineContainer>
      </MainContainer>
    </>
  );
};

export default Main;
