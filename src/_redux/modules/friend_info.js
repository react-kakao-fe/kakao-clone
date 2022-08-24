import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const BASE_URL = "http://3.39.237.124";
const acessToken = localStorage.getItem("authorization");
const refreshToken = localStorage.getItem("refresh-token");

// POST 친구추가
export const __postPlusUser = createAsyncThunk(
  "user/postPlusUser",
  async (username, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/members/friendsAdd/${username}`,
        username,
        {
          headers: {
            authorization: acessToken,
            "refresh-token": refreshToken,
          },
        }
      );
      if (response.status === 200) {
        window.location.reload();
      }
      console.log(response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      if (error) {
        alert("이미 친구인 유저 또는 아이디가 없습니다");
        window.location.reload();
      }
      return thunkAPI.fulfillWithValue(error);
    }
  }
);

export const __getPlusUser = createAsyncThunk(
  "user/getPlusUser",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/members/friends`, {
        headers: {
          authorization: acessToken,
          "refresh-token": refreshToken,
        },
      });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.fulfillWithValue(error);
    }
  }
);

export const __postChatRoom = createAsyncThunk(
  "user/postChatRoom",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/chatRooms/friend/${payload}`,
        payload,
        {
          headers: {
            authorization: acessToken,
            "refresh-token": refreshToken,
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
  userFriend: [],
  isLoading: false,
  error: null,
};

const friendSlice = createSlice({
  name: "myinfo",
  initialState,
  extraReducers: {
    [__postPlusUser.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.userFriend = action.payload;
    },

    [__getPlusUser.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.userFriend = action.payload;
    },

    [__postChatRoom.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.userFriend = action.payload;
    },
  },
});

export default friendSlice.reducer;
