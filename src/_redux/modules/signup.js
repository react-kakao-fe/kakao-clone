import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://13.209.17.224";

export const signUp = createAsyncThunk(
  "users/signup",
  async (payload, { rejectWithValue }) => {
    console.log(payload);
    try {
      const response = await axios.post("/api/members/signup", payload);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: [],
  isLoading: false,
  error: null,
};

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

export const {} = signUpSlice.actions;
export default signUpSlice.reducer;
