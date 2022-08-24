import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://13.209.17.224";
const initialState = {
  user: [],
  isLoading: false,
  error: null,
};

//회원가입
export const signUp = createAsyncThunk(
  "users/signup",
  async (payload, { rejectWithValue }) => {
    console.log(payload);
    try {
      const response = await axios.post("/api/members/signup", {
        username: payload.username,
        nickname: payload.nickname,
        password: payload.password,
        imgUrl:
          "https://firebasestorage.googleapis.com/v0/b/test-12a64.appspot.com/o/images%2Fdefault.jpeg?alt=media&token=5fcde518-3706-4b4b-b2df-fe1efbc13049",
      });
      console.log(response);
      window.location.replace("/login");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {},
  extraReducers: {
    [signUp.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [signUp.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [signUp.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

//로그인
export const login = createAsyncThunk(
  "users/login",
  async (payload, thunkAPI) => {
    try {
      const response = await axios
        .post("http://13.209.17.224/api/members/login", payload)
        .then((response) => {
          console.log(response);
          window.localStorage.setItem(
            "authorization",
            response.headers.authorization
          );
          window.localStorage.setItem(
            "refresh-token",
            response.headers["refresh-token"]
          );
          if (response.data.success === true) {
            window.location.replace("/");
          }
        });

      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.user = payload;
      console.log(payload);
    },
    [login.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default { signUpSlice, loginSlice }.reducer;
