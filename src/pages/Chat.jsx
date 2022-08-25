import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Search } from "../assets/search.svg";
import { ReactComponent as ChatDots } from "../assets/chat-dots.svg";
import { ReactComponent as ChatPlus } from "../assets/chat-plus-outline.svg";
import { useDispatch, useSelector } from "react-redux";
import { __getPlusUser } from "../_redux/modules/friend_info";
import { NavLink } from "react-router-dom";
import _ from "lodash";

const Chat = () => {
  const [visible, setVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const [serch, setSerch] = useState("");
  const chatInfo = useSelector((state) => state.chat.chatList);
  console.log(chatInfo);

  const handleModal = () => {
    setModal(!modal);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getPlusUser());
  }, []);

  // lodash 검색기능
  const searchChatdName =
    chatInfo &&
    chatInfo.filter((friend) => {
      return friend.chatRoomName.toLowerCase().includes(serch.toLowerCase());
    });

  const handleSearchDebounce = _.debounce((e) => {
    setSerch(e.target.value);
  }, 200);

  return (
    <>
      <ChatContainer>
        {/* Chat Header */}
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
                <ChatPlusIcon onClick={handleModal} />
                {modal && (
                  <>
                    <HeaderChatPlusModalContainer>
                      <HeaderChatPlusModal>
                        <HeaderChatPlusModalCloseButton onClick={handleModal}>
                          x
                        </HeaderChatPlusModalCloseButton>
                        <HeaderChatPlusModalSpaneWrapper>
                          <span
                            style={{
                              color: "black",
                            }}
                          >
                            대화상대 선택
                          </span>
                        </HeaderChatPlusModalSpaneWrapper>
                        <HeaderChatPlusBodyContainer>
                          <HeaderChatPlusBodyFormContainer>
                            <HeaderChatPlusInputContainer>
                              <SearchIcon
                                style={{
                                  width: "47px",
                                  height: "47px",
                                  padding: "5px 15px",
                                  color: "rgba(168, 163, 163, 0.5)",
                                  position: "absolute",
                                  zIndex: "1",
                                  cursor: "auto",
                                }}
                              />
                              <input
                                placeholder="채팅방 검색"
                                onChange={handleSearchDebounce}
                              />
                            </HeaderChatPlusInputContainer>
                          </HeaderChatPlusBodyFormContainer>
                          <div
                            style={{
                              display: "flex",
                              padding: "20px",
                              width: "100%",
                              alignItems: "flex-start",
                              justifyContent: "flex-start",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "12px",
                                color: "rgba(168, 163, 163, 0.6)",
                              }}
                            >
                              친구
                            </span>
                          </div>
                          {searchChatdName &&
                            searchChatdName.map((chatInfo) => (
                              <FriendList key={chatInfo.id}>
                                <img
                                  src={chatInfo.imgUrl}
                                  alt=""
                                  width="30px"
                                  height="30px"
                                />
                                <span>{chatInfo.chatRoomName}</span>
                              </FriendList>
                            ))}
                        </HeaderChatPlusBodyContainer>
                      </HeaderChatPlusModal>
                    </HeaderChatPlusModalContainer>
                  </>
                )}
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
            <input placeholder="이름 검색" onChange={handleSearchDebounce} />
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

        {/* ChatBody */}
        <ChatBodyContainer>
          <ChatInlineWrapperr>
            {/* 채팅리스트 */}
            {/* <<ChatWrap> */}
            {searchChatdName &&
              searchChatdName.map((list) => {
                return (
                  <div key={list.id}>
                    <ChatWrap>
                      <img
                        alt=""
                        src="https://firebasestorage.googleapis.com/v0/b/test-12a64.appspot.com/o/images%2Fdefault.jpeg?alt=media&token=5fcde518-3706-4b4b-b2df-fe1efbc13049"
                      />
                      <ChatBox>
                        <span>{list.chatRoomName}</span>
                        {/* <span>마지막 채팅내용</span> */}
                      </ChatBox>
                    </ChatWrap>
                    <ChatTimeBox>{/* <span>채팅시간</span> */}</ChatTimeBox>
                  </div>
                );
              })}
            {/* </ChatWrap> searchVal={serch} /> */}
          </ChatInlineWrapperr>
        </ChatBodyContainer>
      </ChatContainer>
    </>
  );
};

const ChatContainer = styled.div`
  width: 100%;
`;

// HeaderComponent
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

// 친구추가 modal 창
const HeaderChatPlusModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const HeaderChatPlusModal = styled.div`
  position: absolute;
  width: 300px;
  height: 450px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
`;

const HeaderChatPlusModalCloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  border: none;
  color: rgba(214, 211, 211, 0.7);
  font-size: 16px;
  background-color: transparent;
  cursor: pointer;
`;

const HeaderChatPlusModalSpaneWrapper = styled.div`
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-weight: 400;
  color: #bdbaba;
`;

const HeaderChatPlusBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const HeaderChatPlusBodyFormContainer = styled.div`
  display: flex;
  width: 100%;
`;

const HeaderChatPlusInputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px 10px;
  input {
    border: none;
    height: 30px;
    background-color: rgba(168, 163, 163, 0.2);
    border-radius: 15px;
    position: absolute;
    padding: 10px 60px;
    &:focus::placeholder {
      opacity: 0;
    }
    &:focus {
      background-color: transparent;
      border: 1px solid black;
    }
  }
`;
// 여기까지

const ChatBodyContainer = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
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

//친구목록
const FriendList = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-bottom: 10px;
  img {
    border-radius: 10px;
  }
  span {
    margin-left: 10px;
    font-size: 13px;
    font-weight: normal;
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

// chatList
const ChatWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-bottom: 20px;
  img {
    width: 35px;
    height: 35px;
    border-radius: 10px;
  }
`;

const ChatInlineWrapperr = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  span {
    font-size: 14px;
  }
  p {
    font-weight: bold;
    font-size: 14px;
  }
`;

const ChatTimeBox = styled.div`
  span {
    font-size: 14px;
  }
`;

export default Chat;
