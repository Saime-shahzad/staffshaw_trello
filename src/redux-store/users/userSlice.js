import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {userRequest} from "../apiRouts/apiRouts";
// import axios from "axios";

export const addUsers = createAsyncThunk(
  "user/addUsers",
  async (userData, { rejectWithValue }) => {
    
    try {
      const response = await userRequest.post("/login", userData);
      // const response = await userRequest.post("/login", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getBaord = createAsyncThunk(
  "user/getUsers",
  async (userData, { rejectWithValue }) => {
    console.log("userdata...slice>>", userData);
    
    try {
      const response = await userRequest.post("/register", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user:[],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder.addCase(addUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addUsers.fulfilled, (state, action) => {
      
      state.loading = false;  
      state.user = action.payload.user;
    });
    builder.addCase(addUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // get users here
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
