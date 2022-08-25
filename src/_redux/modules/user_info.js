import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const BASE_URL = "http://3.34.4.242";
const accessToken = localStorage.getItem("authorization");
const refreshToken = localStorage.getItem("refresh-token");

export const __getUserInfo = createAsyncThunk(
  "user/getUser",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/members/info`, {
        headers: {
          authorization: accessToken,
          "refresh-token": refreshToken,
        },
      });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.fulfillWithValue(error);
    }
  }
);

const initialState = {
  user: [],
  userFriend: [],
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "myinfo",
  initialState,
  extraReducers: {
    [__getUserInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [__getUserInfo.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.user = action.payload;
    },
    [__getUserInfo.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});

export default userSlice.reducer;
