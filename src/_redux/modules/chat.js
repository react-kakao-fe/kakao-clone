import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const acessToken = localStorage.getItem("authorization");
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
            authorization: acessToken,
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

export const __getChatRoom = createAsyncThunk(
  "get/chatroom",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/chatRooms`, {
        headers: {
          authorization: acessToken,
          "refresh-token": refreshToken,
        },
      });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log(error.response);
      return thunkAPI.fulfillWithValue(error);
    }
  }
);

//이전 채팅내용 가져오기
export const getMessage = createAsyncThunk(
  "get/chat",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/room/3`, {
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

const initialState = {
  chat: [],
  chatList: [],
  isLoading: false,
  error: null,
};

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

    [__getChatRoom.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.chatList = payload;
      state.error = payload;
    },
    [getMessage.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.chat.push(payload);
    },
  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
