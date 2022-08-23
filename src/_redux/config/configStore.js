import { configureStore } from "@reduxjs/toolkit";
import myinfo from "../modules/userinfo";
import { signUp, login } from "../modules/login_signup";

const store = configureStore({
  reducer: {
    signUp,
    login,
    myinfo,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
