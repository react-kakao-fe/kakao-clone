import styled from "styled-components";
import { ReactComponent as Setting } from "../../assets/gear.svg";

// login Icon
const Settinghcon = styled(Setting)`
  width: 15px;
  height: 15px;
  cursor: pointer;
`;

export const LoginHeader = () => {
  return (
    <>
      <div
        style={{
          width: "100%",
          marginTop: "-40px",
          display: "flex",
          justifyContent: "flex-end",
          fontSize: "20px",
          alignItems: "center",
          color: "rgba(168, 163, 163, 1)",
          paddingTop: "10px",
        }}
      >
        <Settinghcon />
        <div
          style={{
            borderLeft: "1px solid rgba(168, 163, 163, 0.4)",
            margin: " 10px",

            padding: "0 10px",
          }}
        >
          <span style={{ marginRight: "10px", cursor: "pointer" }}>‒</span>
          <span style={{ cursor: "pointer" }}>×</span>
        </div>
      </div>
    </>
  );
};
