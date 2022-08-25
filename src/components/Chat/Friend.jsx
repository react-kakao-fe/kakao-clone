import React from "react";
import styled from "styled-components";

function Friend({ content, nickname, imgUrl }) {
  return (
    <FriendBox>
      <img src={imgUrl} width="20px" height="20px" />
      <p>
        {nickname}|{content}
      </p>
    </FriendBox>
  );
}

const FriendBox = styled.div`
  display: flex;
  align-items: center;
`;

export default Friend;
