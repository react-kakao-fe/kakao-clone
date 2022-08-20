import { React, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Chatfilled } from "../assets/chat-fill.svg";

const Login = () => {
  //input값 설정
  const [username, setUsername] = useState("");
  const [pw, setPw] = useState("");

  const userInfo = {
    username: username,
    password: pw,
  };

  //--------유효성 검사용

  const isValidId = username.length >= 4 && username.length <= 12;
  const isValidpw = pw.length >= 8 && pw.length <= 32;

  //유효성 통과시 버튼&폰트 색상 변경
  let setColor = "";
  let setFontColor = "";

  if (isValidId && isValidpw === true) {
    setColor = "#4A403A";
    setFontColor = "white";
  } else {
    setColor = "#eeee";
    setFontColor = "gray";
  }

  return (
    <div>
      <MainContainer>
        <Chatfilled width="100" height="100" fill="#4A403A"></Chatfilled>
        <InputWarp>
          <Input
            placeholder="계정"
            name="username"
            value={username}
            borderB="none"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="비밀번호"
            name="pw"
            value={pw}
            type="password"
            borderT="1px solid #e5e5e5"
            onChange={(e) => setPw(e.target.value)}
          />
          <Button fontColor={setFontColor} color={setColor}>
            로그인
          </Button>
        </InputWarp>
        <TextBox>
          <p>회원가입</p>
          <p>|</p>
          <p>비밀번호 재설정</p>
        </TextBox>
      </MainContainer>
    </div>
  );
};

//전체 가운데 정렬용
const MainContainer = styled.div`
  width: 50vw;
  height: 70vh;
  display: flex;
  flex-direction: column;
  flex-wrap: warp;
  align-items: center;
  justify-content: center;
  background-color: #fff323;
`;

//내용물 전체 크기설정
const InputWarp = styled.div`
  width: 30%;
  margin-bottom: 30px;
  margin-top: 50px;
  p {
    font-size: 10px;
    font-weight: 800;
  }
  h1 {
    margin-bottom: 60px;
    font-size: 20px;
    font-weight: bold;
  }
`;

const Input = styled.input`
  min-width: 100%;
  outline: none;
  padding: 15px;
  border: 1px solid #ffce45;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: #d3d3d3;
  }
  border-bottom: ${(props) => props.borderB || "1px solid #FFCE45"};
  border-top: ${(props) => props.borderT || "1px solid #FFCE45"};
`;

//입력버튼
const Button = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  border: none;
  border-radius: 4px;
  border: 1px solid #ffce45;
  background-color: ${(props) => props.color || "#eeee"};
  color: ${(props) => props.fontColor || "gray"};
`;

const TextBox = styled.div`
  width: 20%;
  height: 10px;
  margin-top: 100px;
  display: flex;
  justify-content: space-between;
  p {
    font-size: 13px;
    color: #4a403a;
  }
`;

export default Login;
