import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px 10px 15px;
  font-size: 1.1em;
  font-weight: 550;
  position: relative;
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
