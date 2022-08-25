import React from "react";
import styled from "styled-components";

function Me({ key, content }) {
  return (
    <ContentWrap>
      <ContentBox className="bubble">
        <div style={{ padding: "5px" }}>
          <span>{content}</span>
        </div>
      </ContentBox>
    </ContentWrap>
  );
}

const ContentWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 4px 10px;
  .bubble {
    position: relative;
    padding: 2px;
    background-color: #fff323;
    border-radius: 3px;
  }
  .bubble:after {
    content: "";
    position: absolute;
    border-style: solid;
    border-width: 2px 0 6px 8px;
    border-color: transparent #fff323;
    display: block;
    width: 0;
    z-index: 1;
    right: -8px;
    top: 5px;
  }
`;

const ContentBox = styled.div`
  padding: 15px;
`;

export default Me;
