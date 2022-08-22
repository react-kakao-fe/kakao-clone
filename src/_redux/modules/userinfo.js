import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const BASE_URL = "http://13.209.17.224";
const acessToken = localStorage.getItem("authorization");
const refreshToken = localStorage.getItem("refresh-token");

export const __getUserInfo = createAsyncThunk(
  "user/getUser",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/listAll`, {
        headers: {
          authorization: acessToken,
          "refresh-token": refreshToken,
        },
      });
      console.log(response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.fulfillWithValue(error);
    }
  }
);

export const __postPlusUser = createAsyncThunk(
  "user/postPlusUser",
  async (friendUsername, thunkAPI) => {
    console.log(friendUsername);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/members/friendsAdd/${friendUsername}`,
        {
          headers: {
            Authorization: acessToken,
            "Refresh-Token": refreshToken,
          },
        }
      );
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
    [__postPlusUser.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.userFriend = action.payload;
    },
  },
});

export default userSlice.reducer;
