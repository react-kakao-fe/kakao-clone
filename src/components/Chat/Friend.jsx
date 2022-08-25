import React from "react";
import styled from "styled-components";

function Friend({ content, nickname, imgUrl }) {
  return (
    <FriendWrap>
      <FriendBox>
        <img
          alt=""
          src={imgUrl}
          width="35px"
          height="35px"
          style={{ borderRadius: "10px" }}
        />
        <FriendTitleContainer>
          <span style={{ fontWeight: "bold", fontSize: "12px" }}>
            {nickname}
          </span>
          <div className="bubble">
            <span>{content}</span>
          </div>
        </FriendTitleContainer>
      </FriendBox>
    </FriendWrap>
  );
}

const FriendWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 4px 10px;
  align-items: center;
  .bubble {
    position: relative;
    background: #eee;
    padding: 5px;
    border-radius: 3px;
    margin-left: 10px;
    margin-top: 3px;
  }
  .bubble:after {
    content: "";
    position: absolute;
    border-style: solid;
    border-width: 5px 12px 5px 0;
    border-color: transparent #eee;
    display: block;
    z-index: 1;
    left: -12px;
    top: 0px;
  }
`;

const FriendBox = styled.div`
  display: flex;
  align-items: center;
`;

const FriendTitleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-left: 10px;
`;

export default Friend;
