import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
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
      return response.data.data.roomId;
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
      const response = await axios.get(`${BASE_URL}/api/room/${payload}`, {
        headers: {
          contentType: "application/json",
          authorization: accessToken,
          "refresh-token": refreshToken,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//채팅방 전체 불러오기
export const getChatRoom = createAsyncThunk(
  "get/chatroom",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/chatRooms`, {
        headers: {
          contentType: "application/json",
          authorization: accessToken,
          "refresh-token": refreshToken,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  roomId: "",
  chatRoom: [],
  chat: [],
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
    [addChatroom.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.roomId = payload;
    },
    [loadMessage.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.chat = payload;
    },
    [getChatRoom.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.chatRoom = payload;
    },
  },
});

export const { addMessage } = preChatSlice.actions;
export default preChatSlice.reducer;
