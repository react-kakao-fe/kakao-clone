import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Navigation } from "../components/Navigation";

const HomeContainer = styled.div`
  width: 50vw;
  height: 70vh;
  display: flex;
  box-shadow: 2px 2px 2px 2px #cacaca;
  background-color: white;
`;

const HomeInlineWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Home = () => {
  return (
    <>
      <HomeContainer>
        <HomeInlineWrapper>
          <Navigation />
          <Outlet />
        </HomeInlineWrapper>
      </HomeContainer>
    </>
  );
};

export default Home;
