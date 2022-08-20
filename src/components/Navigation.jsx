import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { ReactComponent as Personfill } from "../assets/person-fill.svg";
import { ReactComponent as Chatfill } from "../assets/chat-fill.svg";
import { ReactComponent as ThreeDots } from "../assets/three-dots.svg";
import { ReactComponent as EmojiSmile } from "../assets/emoji-smile.svg";
import { ReactComponent as Bell } from "../assets/bell.svg";
import { ReactComponent as BellSlash } from "../assets/bell-slash.svg";
import { ReactComponent as Setting } from "../assets/gear.svg";

const NavCintainer = styled.div`
  height: 100%;
  width: 7vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #eee;
  font-size: 1.1em;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
`;

const StyledNavLink = styled(NavLink)`
  color: rgba(168, 163, 163, 0.6);
  width: 100%;
  text-align: center;
  margin-top: 40px;
  margin-bottom: -10px;
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

const PersonIcon = styled(Personfill)`
  width: 25px;
  height: 25px;
`;

const ChatIcon = styled(Chatfill)`
  width: 22px;
  height: 22px;
`;

const ThreeDotsIcon = styled(ThreeDots)`
  width: 25px;
  height: 25px;
`;

// Bottom Icon

const BottomIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 100px;
`;

const BottomIconWrapper = styled.div`
  padding: 10px;
  &:hover {
    border-radius: 9999px;
    background-color: rgba(168, 163, 163, 0.1);
  }
  color: rgba(54, 54, 54, 0.7);
`;

const EmojiSmileIcon = styled(EmojiSmile)`
  width: 25px;
  height: 25px;
`;

const BellIcon = styled(Bell)`
  width: 25px;
  height: 25px;
`;

const BellSlashicon = styled(BellSlash)`
  width: 25px;
  height: 25px;
`;

const Settinghcon = styled(Setting)`
  width: 25px;
  height: 25px;
`;

const DisplayNone = keyframes`
  from{
    opacity: 1;
    display:flex;
  }
  to{
    opacity: 0;
    display:none;
  }
`;

// bell 가운데 뜨기
const BellDarkContainer = styled.div`
  position: absolute;
  top: 40%;
  left: 40%;
  border-radius: 10px;
  padding: 30px;
  border: 1px solid black;
  background-color: rgba(0, 0, 0, 0.7);
  animation: ${DisplayNone} forwards 4s 1s;
`;

const BellDarkContainera = styled.div`
  position: absolute;
  top: 40%;
  left: 40%;
  border-radius: 10px;
  padding: 30px;
  border: 1px solid black;
  background-color: rgba(0, 0, 0, 0.7);
  animation: ${DisplayNone} forwards 4s 1s;
`;

export const Navigation = () => {
  const [bell, setBell] = useState(true);
  return (
    <>
      <NavCintainer>
        <StyledNavLink to="/">
          <PersonIcon />
        </StyledNavLink>

        <StyledNavLink to="/chat">
          <ChatIcon />
        </StyledNavLink>

        <StyledNavLink to="/detail">
          <ThreeDotsIcon />
        </StyledNavLink>

        {/* bottomIcon */}
        <BottomIconContainer>
          <BottomIconWrapper>
            <EmojiSmileIcon />
          </BottomIconWrapper>

          <BottomIconWrapper>
            {bell ? (
              <BellIcon onClick={() => setBell(!bell)} />
            ) : (
              <BellSlashicon onClick={() => setBell(!bell)} />
            )}
          </BottomIconWrapper>

          <BottomIconWrapper>
            <Settinghcon />
          </BottomIconWrapper>
        </BottomIconContainer>
        {/* <BottomIcon /> */}
      </NavCintainer>
    </>
  );
};

export const BottomIcon = () => {
  const [bell, setBell] = useState(false);

  return (
    <BottomIconContainer>
      <BottomIconWrapper>
        <EmojiSmileIcon />
      </BottomIconWrapper>

      <BottomIconWrapper>
        <>
          {bell ? (
            <>
              <BellSlashicon onClick={() => setBell(!bell)} />
              <div>Hi</div>
            </>
          ) : (
            <>
              <BellIcon onClick={() => setBell(!bell)} />
              <div>dd</div>
            </>
          )}
        </>
      </BottomIconWrapper>

      <BottomIconWrapper>
        <Settinghcon />
      </BottomIconWrapper>
    </BottomIconContainer>
  );
};
