import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://13.209.17.224";
const acessToken = localStorage.getItem("authorization");
const refreshToken = localStorage.getItem("refresh-token");

const initialState = {
  chat: [],
  isLoading: false,
  error: null,
};

//채팅방 생성
export const addChatroom = createAsyncThunk(
  "post/chatroom",
  async (payload, { rejectWithValue }) => {
    console.log(payload);
    try {
      const response = await axios.post(
        `/api/chatRooms/friend/${payload}`,
        null,
        {
          headers: {
            contentType: "application/json",
            authorization: acessToken,
            "refresh-token": refreshToken,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

//이전 채팅내용 가져오기
export const getMessage = createAsyncThunk(
  "get/chat",
  async (payload, { rejectWithValue }) => {
    console.log(payload);
    try {
      const response = await axios.get(`/api/room/3`, {
        headers: {
          contentType: "application/json",
          authorization: acessToken,
          "refresh-token": refreshToken,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      state.chat = [...state.chat, { payload }];
    },
  },
  extraReducers: {
    [addChatroom.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [addChatroom.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [addChatroom.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [getMessage.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.chat = { payload };
    },
  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
