import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import GlobalStyle from "../src/components/GlobalStyle";
import App from "./App";
import store from "./_redux/config/configStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>
);
