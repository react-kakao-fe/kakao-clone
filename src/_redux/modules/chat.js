import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const acessToken = localStorage.getItem("authorization");
const refreshToken = localStorage.getItem("refresh-token");

const BASE_URL = process.env.REACT_APP_BASE_URL;

const initialState = {
  chat: [],
  isLoading: false,
  error: null,
};

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

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
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
      state.chat = payload;
      state.error = payload;
    },
  },
});

export default chatSlice.reducer;
