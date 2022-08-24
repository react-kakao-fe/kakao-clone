import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
        `http://3.39.237.124/api/chatRooms/friend/${payload}`,
        {
          chatRoomName: payload,
        },
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
  },
});

export default chatSlice.reducer;
