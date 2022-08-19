import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavCintainer = styled.div`
  height: 100%;
  max-width: 25vw;
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
  border: 1px solid black;
  margin-top: 40px;
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

const Navigation = () => {
  return (
    <NavCintainer>
      <StyledNavLink to="/">
        <span>메인</span>
      </StyledNavLink>
      <StyledNavLink to="/chat">
        <span>채팅</span>
      </StyledNavLink>
    </NavCintainer>
  );
};

export default Navigation;
