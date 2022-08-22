import { configureStore } from "@reduxjs/toolkit";
import users from "../modules/login";
import signup from "../modules/signup";
import login from "../modules/login";

const store = configureStore({
  reducer: {
    users: users,
    signup: signup,
    login: login,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
