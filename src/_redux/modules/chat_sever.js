import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const acessToken = localStorage.getItem("authorization");

const accessToken = localStorage.getItem("authorization");
const refreshToken = localStorage.getItem("refresh-token");

//채팅방 생성
export const addChatroom = createAsyncThunk(
  "post/chatroom",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/chatRooms/friend/${payload}`,
        payload,

        {
          headers: {
            contentType: "application/json",
            authorization: accessToken,
            "refresh-token": refreshToken,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//이전 채팅내용 가져오기
export const loadMessage = createAsyncThunk(
  "get/chat",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/room/4`, {
        headers: {
          contentType: "application/json",
          authorization: accessToken,
          "refresh-token": refreshToken,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  chat: [],
  chatList: [],
  isLoading: false,
  error: null,
};

export const preChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      state.chat = [payload, ...state.chat];
    },
  },
  extraReducers: {
    [addChatroom.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [addChatroom.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.success = true;
    },
    [addChatroom.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [loadMessage.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.chat = payload;
    },
  },
});

export const { addMessage } = preChatSlice.actions;
export default preChatSlice.reducer;
