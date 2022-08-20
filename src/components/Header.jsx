import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { ReactComponent as Search } from "../assets/search.svg";
import { ReactComponent as PersonPlus } from "../assets/person-plus.svg";
import { ReactComponent as ChatDots } from "../assets/chat-dots.svg";
import { ReactComponent as ChatPlus } from "../assets/chat-plus-outline.svg";
import { ReactComponent as Setting } from "../assets/gear.svg";

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
  column-gap: 15px;
  align-items: center;
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

// header Nav
const StyledNavLink = styled(NavLink)`
  color: rgba(168, 163, 163, 0.6);
  text-align: center;
  &:link {
    text-decoration: none;
  }
  &:hover {
    color: rgba(168, 163, 163, 1);
  }
  &.active {
    color: black;
  }
`;

const HeaderInputContainer = styled.div`
  margin: 10px;
  display: flex;
  align-items: center;
  position: relative;
  padding: 20px 0;
  input {
    width: 100%;
    border: none;
    height: 30px;
    background-color: rgba(168, 163, 163, 0.2);
    border-radius: 15px;
    position: absolute;
    padding: 10px 50px;
    &:focus {
      background-color: transparent;
    }
  }
`;
// Icon Box
const IconContainer = styled.div`
  padding: 2px;
  &:hover {
    border-radius: 9999px;
    background-color: rgba(168, 163, 163, 0.1);
  }
`;

// Person Icon
const PersonPlusIcon = styled(PersonPlus)`
  width: 25px;
  height: 25px;
  color: black;
  cursor: pointer;
`;

const SearchIcon = styled(Search)`
  width: 20px;
  height: 20px;
  color: black;
  cursor: pointer;
`;

// Chat Icon
const ChatDotsIcon = styled(ChatDots)`
  width: 25px;
  height: 20px;
  color: black;
  cursor: pointer;
`;

const ChatPlusIcon = styled(ChatPlus)`
  width: 25px;
  height: 23px;
  color: black;
  cursor: pointer;
`;

// login Icon
const Settinghcon = styled(Setting)`
  width: 15px;
  height: 15px;
  cursor: pointer;
`;

export const LoginHeader = () => {
  return (
    <>
      <div
        style={{
          width: "100%",
          marginTop: "-40px",
          display: "flex",
          justifyContent: "flex-end",
          fontSize: "20px",
          alignItems: "center",
          color: "rgba(168, 163, 163, 1)",
          paddingTop: "10px",
        }}
      >
        <Settinghcon />
        <div
          style={{
            borderLeft: "1px solid rgba(168, 163, 163, 0.4)",
            margin: " 10px",

            padding: "0 10px",
          }}
        >
          <span style={{ marginRight: "10px", cursor: "pointer" }}>‒</span>
          <span style={{ cursor: "pointer" }}>×</span>
        </div>
      </div>
    </>
  );
};

export const MainHeader = () => {
  const [visible, setVisible] = useState(false);
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
          <IconContainer>
            <SearchIcon
              onClick={() => {
                setVisible(!visible);
              }}
            />
          </IconContainer>
          <IconContainer>
            <PersonPlusIcon />
          </IconContainer>
        </HeaderIconContainer>
      </HeaderContainer>
      <HeaderInputContainer
        style={{
          display: visible ? "flex" : "none",
        }}
      >
        <SearchIcon
          style={{
            width: "47px",
            height: "47px",
            padding: "5px 15px",
            color: "rgba(168, 163, 163, 0.5)",
            position: "absolute",
            zIndex: "1",
            cursor: "auto",
            // backgroundColor: "red",
          }}
        />
        <input placeholder="이름 검색" />
        <div
          style={{
            right: "0",
            position: "absolute",
            display: "flex",
            alignItems: "center",
            fontSize: "12px",
            fontWeight: "bold",
            borderLeft: "1px solid rgba(168, 163, 163, 1)",
            paddingRight: "10px",
            color: "rgba(168, 163, 163, 1)",
          }}
        >
          <span style={{ paddingLeft: "5px" }}>통합검색</span>
        </div>
      </HeaderInputContainer>
    </>
  );
};

// ChatHeader
export const ChatHeader = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <TopIconContainer>
        <span>‒</span>
        <span>ㅁ</span>
        <span>×</span>
      </TopIconContainer>
      <HeaderContainer>
        <div style={{ display: "flex", columnGap: "30px" }}>
          <StyledNavLink to="/chat">
            <span>채팅</span>
          </StyledNavLink>
          <StyledNavLink to="/openchat">
            <span>오픈채팅</span>
          </StyledNavLink>
        </div>
        <HeaderIconContainer>
          <IconContainer>
            <SearchIcon
              onClick={() => {
                setVisible(!visible);
              }}
            />
          </IconContainer>
          <IconContainer>
            <ChatDotsIcon />
          </IconContainer>
          <IconContainer>
            <ChatPlusIcon />
          </IconContainer>
        </HeaderIconContainer>
      </HeaderContainer>

      <HeaderInputContainer
        style={{
          display: visible ? "flex" : "none",
        }}
      >
        <SearchIcon
          style={{
            width: "47px",
            height: "47px",
            padding: "5px 15px",
            color: "rgba(168, 163, 163, 0.5)",
            position: "absolute",
            zIndex: "1",
            cursor: "auto",
            // backgroundColor: "red",
          }}
        />
        <input placeholder="이름 검색" />
        <div
          style={{
            right: "0",
            position: "absolute",
            display: "flex",
            alignItems: "center",
            fontSize: "12px",
            fontWeight: "bold",
            borderLeft: "1px solid rgba(168, 163, 163, 1)",
            paddingRight: "10px",
            color: "rgba(168, 163, 163, 1)",
          }}
        >
          <span style={{ paddingLeft: "5px" }}>통합검색</span>
        </div>
      </HeaderInputContainer>
    </>
  );
};

export const DetailHeader = () => {
  return (
    <>
      <TopIconContainer>
        <span>‒</span>
        <span>ㅁ</span>
        <span>×</span>
      </TopIconContainer>
      <HeaderContainer>
        <div style={{ display: "flex", columnGap: "30px" }}>
          <div>
            <span>더보기</span>
          </div>
        </div>
      </HeaderContainer>
    </>
  );
};
