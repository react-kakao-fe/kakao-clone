import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px 10px 10px 15px;
  font-size: 1.1em;
  font-weight: 550;
`;

const HeaderIconContainer = styled.div`
  display: flex;
  column-gap: 10px;
  border: 1px solid black;
`;

const TopIconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 10px;
  padding-right: 5px;
  color: rgba(168, 163, 163, 0.8);
  span {
    &:hover {
      color: black;
      cursor: pointer;
    }
  }
`;

export const MainHeader = () => {
  return (
    <>
      <TopIconContainer>
        <span>‒</span>
        <span>ㅁ</span>
        <span>×</span>
      </TopIconContainer>
      <HeaderContainer>
        <span>친구</span>
        <HeaderIconContainer>
          <span>icon</span>
          <span>icon</span>
        </HeaderIconContainer>
      </HeaderContainer>
    </>
  );
};

export const ChatHeader = () => {
  return (
    <>
      <TopIconContainer>
        <span>‒</span>
        <span>ㅁ</span>
        <span>×</span>
      </TopIconContainer>
      <HeaderContainer>
        <div style={{ display: "flex", columnGap: "30px" }}>
          <span>채팅</span>
          <span>오픈채팅</span>
        </div>
        <HeaderIconContainer>
          <span>icon</span>
          <span>icon</span>
          <span>icon</span>
        </HeaderIconContainer>
      </HeaderContainer>
    </>
  );
};
