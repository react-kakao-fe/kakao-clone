import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://13.209.17.224";

export const login = createAsyncThunk(
  "users/login",
  async (payload, thunkAPI) => {
    try {
      const response = await axios
        .post("/api/members/login", payload)
        .then((response) => {
          console.log(response);
          window.localStorage.setItem(
            "authorization",
            response.headers.authorization
          );
          window.localStorage.setItem(
            "refresh-token",
            response.headers["refresh-token"]
          );
        });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const initialState = {
  user: [],
  isLoading: false,
  error: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [login.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {} = loginSlice.actions;
export default loginSlice.reducer;
