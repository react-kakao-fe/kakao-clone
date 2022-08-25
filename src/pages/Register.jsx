import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "../_redux/modules/login_signup";
import styled from "styled-components";
import { ReactComponent as Xbutton } from "../assets/x-circle-fill.svg";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //input값 설정
  const [username, setUsername] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [nickname, setNickname] = useState("");

  const userInfo = {
    username: username,
    password: pw,
    nickname: nickname,
  };

  //--------유효성 검사용
  //id=영대소문, 숫자 4~12자
  const isValidId = username.length >= 4 && username.length <= 12;

  //pw-영대소문, 숫자, 특수문자 8~32자
  const isValidpw = pw.length >= 8 && pw.length <= 32;

  //닉네임 20글자 미만
  const isValidnickname = nickname.length >= 1 && nickname.length <= 20;

  //유효성 통과시 버튼 색상 변경
  let setColor = "#eeee";

  if (isValidId && isValidpw && isValidnickname === true) {
    setColor = "yellow";
  } else {
    setColor = "#eeee";
  }

  // 유효성 통과-> 전송하기
  const onClick = () => {
    if (pw === pwCheck) {
      if (isValidId && isValidpw && isValidnickname === true) {
        dispatch(signUp(userInfo));
      } else {
        alert("입력란을 확인해주세요");
      }
    } else {
      alert("비밀번호가 일치하지 않습니다");
    }
  };

  //지우기버튼 띄우기
  function display(str) {
    if (str.length >= 1) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <MainContainer>
      <InputWarp>
        <h1>계정 정보를 입력해주세요</h1>
        <p>아이디</p>
        <InputContainer>
          <Input
            placeholder="아이디 입력"
            name="username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value.replace(/[^A-Za-z0-9]*$/gi, ""))
            }
          />
          <InputButton>
            <Xbutton
              width="20"
              height="20"
              fill="#e2e2e2"
              display={display(username) ? "block" : "none"}
              onClick={(e) => setUsername("")}
            />
          </InputButton>
        </InputContainer>
      </InputWarp>
      <InputWarp>
        <p>비밀번호</p>
        <InputContainer>
          <Input
            placeholder="비밀번호(8~32자리)"
            name="pw"
            type="password"
            maxLength="32"
            value={pw}
            onChange={(e) =>
              setPw(e.target.value.replace(/[^A-Za-z0-9]*$/gi, ""))
            }
          />
          <InputButton>
            <Xbutton
              width="20"
              height="20"
              fill="#e2e2e2"
              display={display(pw) ? "block" : "none"}
              onClick={(e) => setPw("")}
            />
          </InputButton>
        </InputContainer>
        <InputContainer>
          <Input
            placeholder="비밀번호 재입력"
            type="password"
            value={pwCheck}
            maxLength="32"
            onChange={(e) =>
              setPwCheck(e.target.value.replace(/[^A-Za-z0-9]*$/gi, ""))
            }
          />
          <InputButton>
            <Xbutton
              width="20"
              height="20"
              fill="#e2e2e2"
              display={display(pwCheck) ? "block" : "none"}
              onClick={(e) => setPwCheck("")}
            />
          </InputButton>
        </InputContainer>
      </InputWarp>
      <InputWarp>
        <InputContainer>
          <p>닉네임</p>
          <Input
            placeholder="닉네임을 입력해주세요"
            name="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            maxLength="20"
          />
          <InputButton2>
            <Xbutton
              width="20"
              height="20"
              fill="#e2e2e2"
              display={display(nickname) ? "block" : "none"}
              onClick={(e) => setNickname("")}
            />
            <p>{nickname.length}/20</p>
          </InputButton2>
        </InputContainer>
      </InputWarp>
      <Button color={setColor} onClick={onClick}>
        회원가입
      </Button>
    </MainContainer>
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
  background-color: white;
  box-shadow: 2px 2px 2px 2px #cacaca;
`;

//내용물 전체 크기설정
const InputWarp = styled.div`
  width: 40%;
  margin-bottom: 30px;
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

//button 위치조정용
const InputContainer = styled.div`
  position: relative;
`;

//X버튼 container
const InputButton = styled.div`
  position: absolute;
  bottom: 11px;
  right: 10px;
`;

//닉네임 X버튼 container
const InputButton2 = styled.div`
  position: absolute;
  bottom: 11px;
  right: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    width: 20px;
    margin-left: 10px;
    color: #d3d3d3;
    font-size: 12px;
  }
`;

//input설정
const Input = styled.input`
  min-width: 100%;
  outline: none;
  padding: 15px;
  border: none;
  border-bottom: 1px solid #e2e2e2;
  &:focus {
    border-bottom: 1px solid black;
  }

  ::placeholder,
  ::-webkit-input-placeholder {
    color: #d3d3d3;
    font-weight: bold;
  }
`;

//입력버튼
const Button = styled.button`
  width: 40%;
  padding: 12px;
  margin-top: 50px;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => props.color || "#eeee"};
`;

export default Register;
