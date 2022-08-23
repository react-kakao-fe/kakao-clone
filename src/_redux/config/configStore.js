import { configureStore } from "@reduxjs/toolkit";
import myinfo from "../modules/userinfo";
import users from "../modules/login";
import signup from "../modules/signup";
import login from "../modules/login";
import friend from "../modules/friend";

const store = configureStore({
  reducer: {
    users: users,
    signup: signup,
    login: login,
    myinfo,
    friend,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
