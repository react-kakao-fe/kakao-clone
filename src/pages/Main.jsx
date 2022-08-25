import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { __getUserInfo } from "../_redux/modules/user_info";
import { __getPlusUser, __postPlusUser } from "../_redux/modules/friend_info";
import { addChatroom, __getChatRoom } from "../_redux/modules/chat";
import { ReactComponent as Search } from "../assets/search.svg";
import { ReactComponent as PersonPlus } from "../assets/person-plus.svg";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [visible, setVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [chatRoom, setChatRoom] = useState("");

  const userInfo = useSelector((state) => state.myinfo.user.data);
  const friendInfo = useSelector((state) => state.friend.userFriend);
  const chatInfo = useSelector((state) => state.chat.chatList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(chatInfo);

  useEffect(() => {
    dispatch(__getUserInfo());
  }, []);

  useEffect(() => {
    dispatch(__getChatRoom(chatInfo));
  }, []);

  const plusUserId = () => {
    dispatch(__postPlusUser(userName));
  };

  // lodash 친구검색

  const searchFriendName =
    friendInfo &&
    friendInfo.filter((friend) => {
      return friend.nickname.toLowerCase().includes(searchVal.toLowerCase());
    });

  const handleSearchDebounce = _.debounce((e) => {
    setSearchVal(e.target.value);
  }, 200);

  const handleModal = () => {
    setModal(!modal);
  };

  const handleVisible = () => {
    setVisible(!visible);
  };

  const handleFormData = (e) => {
    // dispatch(__getChatRoom(chatInfo.id));
    e.preventDefault();
    plusUserId();
  };

  // chat
  const handleChatRoomModal = () => {
    // dispatch(__postChatRoom(friendInfo.id));
    setChatRoom(!chatRoom);
  };

  const handleChatFormData = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <MainContainer>
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
                <SearchIcon onClick={handleVisible} />
              </IconContainer>
              <IconContainer>
                <PersonPlusIcon onClick={handleModal} />
                {modal && (
                  <>
                    <HeaderPlusModalContainer>
                      <HeaderPlusModal>
                        <HeaderPlusModalCloseButton onClick={handleModal}>
                          x
                        </HeaderPlusModalCloseButton>
                        <HeaderPlusModalSpaneWrapper>
                          <span
                            style={{
                              color: "black",
                            }}
                          >
                            친구 추가
                          </span>
                        </HeaderPlusModalSpaneWrapper>
                        <HeaderPlusBodyContainer>
                          <span
                            style={{
                              color: "black",
                              fontSize: "14px",
                              marginLeft: "20px",
                              fontWeight: "400",
                            }}
                          >
                            ID로 추가
                          </span>
                          <hr style={{ width: "100%", opacity: "1" }} />
                          <HeaderPlusBodyFormContainer>
                            <HeaderPlusForm onSubmit={handleFormData}>
                              <input
                                type="text"
                                placeholder="친구 카카오톡 ID"
                                maxLength="20"
                                onChange={(e) => setUserName(e.target.value)}
                              />
                              <span
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "400",
                                  color: "rgba(168, 163, 163, 0.6)",
                                }}
                              >
                                {userName.length}/20
                              </span>
                            </HeaderPlusForm>
                          </HeaderPlusBodyFormContainer>
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
                              카카오톡 ID를 등록하고 검색을 허용한 친구만 찾을
                              수 있습니다.
                            </span>
                          </div>
                        </HeaderPlusBodyContainer>
                      </HeaderPlusModal>
                    </HeaderPlusModalContainer>
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

        {/* MainBody 부분 */}
        <MainInlineContainer>
          <MainInlineWrapper>
            <ImageContainer>
              <img
                src={userInfo && userInfo.imgUrl}
                alt=""
                width="30px"
                height="30px"
                style={{ borderRadius: "10px" }}
              />
            </ImageContainer>
            <ImageTitleContainer>
              <span style={{ fontWeight: "bold" }}>
                {userInfo && userInfo.username}
              </span>
              <span>{userInfo && userInfo.nickname}</span>
            </ImageTitleContainer>
          </MainInlineWrapper>
          <div
            style={{
              width: "100%",
              borderBottom: "1px solid rgba(180, 172, 172, 0.5)",
            }}
          />
          <MainSearchFriend>
            <div
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                color: "rgba(180, 172, 172, 1)",
                padding: "10px 0",
              }}
            >
              <span style={{ marginRight: "5px" }}>친구</span>
              <span>{friendInfo.length}</span>
            </div>

            <MainSearchFriendInlineWrapper>
              {searchFriendName &&
                searchFriendName.map((nicknames) => {
                  return (
                    <MainInlineWrapper
                      key={nicknames.id}
                      onClick={(e) => {
                        if (e.detail === 2) {
                          dispatch(addChatroom(nicknames.id));
                          navigate(`chatroom/${chatInfo.id}`);
                          dispatch(__getChatRoom(chatInfo.id));
                        }
                      }}
                    >
                      <ImageContainer>
                        <img
                          src={nicknames.imgUrl}
                          alt=""
                          width="30px"
                          height="30px"
                          style={{ borderRadius: "10px" }}
                        />
                      </ImageContainer>
                      <ImageTitleContainer>
                        <span style={{ fontWeight: "bold" }}>
                          {nicknames.nickname}
                        </span>
                      </ImageTitleContainer>
                    </MainInlineWrapper>
                  );
                })}
            </MainSearchFriendInlineWrapper>
            {chatRoom && (
              <ChatModalContainer>
                <ChatModal>
                  {/* header */}
                  <ChatModalHeaderContainer>
                    <ChatModalCloseButton onClick={handleChatRoomModal}>
                      x
                    </ChatModalCloseButton>
                  </ChatModalHeaderContainer>
                  <ChatModalBodyContainer>
                    <ChatList>dd</ChatList>
                    <ChatInputFrom onSubmit={handleChatFormData}>
                      <textarea type="text" />
                      asd
                    </ChatInputFrom>
                  </ChatModalBodyContainer>
                </ChatModal>
              </ChatModalContainer>
            )}
          </MainSearchFriend>
        </MainInlineContainer>
      </MainContainer>
    </>
  );
};

// Header StyledComponent
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

// 친구추가 modal 창
const HeaderPlusModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
`;

const HeaderPlusModal = styled.div`
  position: absolute;
  width: 300px;
  height: 450px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
`;

const HeaderPlusModalCloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  border: none;
  color: rgba(214, 211, 211, 0.7);
  font-size: 16px;
  background-color: transparent;
  cursor: pointer;
`;

const HeaderPlusModalSpaneWrapper = styled.div`
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-weight: 400;
  color: #bdbaba;
`;

const HeaderPlusBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const HeaderPlusBodyFormContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 20px;
  padding: 0 20px;
`;

const HeaderPlusForm = styled.form`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  &:focus {
  }
  input {
    width: 100%;
    outline: none;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid rgba(168, 163, 163, 0.4);
    padding: 10px;
    &:focus::placeholder {
      opacity: 0;
    }
    &:focus {
      border-bottom: 1px solid black;
    }
  }
`;
// 여기까지

// chat room modal
const ChatModalContainer = styled.div`
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

const ChatModal = styled.div`
  position: absolute;
  width: 300px;
  height: 450px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
`;

const ChatModalHeaderContainer = styled.div`
  width: 100%;
  height: 15%;
`;

const ChatModalCloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  border: none;
  color: rgba(214, 211, 211, 0.7);
  font-size: 16px;
  background-color: transparent;
  cursor: pointer;
`;

const ChatModalBodyContainer = styled.div`
  width: 100%;
  height: 85%;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;

const ChatList = styled.div`
  border: 1px solid black;
  flex: 3;
`;

const ChatInputFrom = styled.form`
  flex: 1;
  textarea {
    width: 100%;
    height: 100%;
    resize: none;
    padding: 10px;
  }
`;

const HeaderInputContainer = styled.div`
  margin: 10px;
  display: block;
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

// Main StyledComponent
const MainContainer = styled.div`
  width: 100%;
  overflow-y: scroll;
`;
const MainInlineContainer = styled.div`
  padding: 15px;
`;

const MainInlineWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: rgba(168, 163, 163, 0.1);
  }
`;

// 친구목록
const MainSearchFriend = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MainSearchFriendInlineWrapper = styled.div``;

const ImageTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 10px;
`;

export default Main;
