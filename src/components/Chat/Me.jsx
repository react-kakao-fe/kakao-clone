import React from "react";
import styled from "styled-components";

function Me({ key, content }) {
  return (
    <ContentWarp>
      <ContentBox>{content}</ContentBox>
    </ContentWarp>
  );
}

const ContentWarp = styled.div`
  width: 100%;
  background-color: #eeee;
`;

const ContentBox = styled.div`
  width: 100%;
`;

export default Me;
