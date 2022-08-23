import { configureStore } from "@reduxjs/toolkit";
import myinfo from "../modules/user_info";
import friend from "../modules/friend_info";
import { signUp, login } from "../modules/login_signup";

const store = configureStore({
  reducer: {
    signUp,
    login,
    myinfo,
    friend,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
