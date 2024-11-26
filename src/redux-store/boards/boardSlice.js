import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {userRequest} from "../apiRouts/apiRouts";
// import axios from "axios";

export const addBoard = createAsyncThunk(
  "board/addBoard",
  async (userData, { rejectWithValue }) => {
    
    try {
      const response = await userRequest.post("/board", userData);
      // const response = await userRequest.post("/login", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getBaord = createAsyncThunk(
  "board/getBaord",
  async (userData, { rejectWithValue }) => {
    console.log("userdata...slice>>", userData);
    
    try {
      const response = await userRequest.post("/get-board", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const boardSlice = createSlice({
  name: "board",
  initialState: {
    user: null,
    token: null,
    board: false,
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder.addCase(addBoard.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addBoard.fulfilled, (state, action) => {
      
      state.loading = false;  
      state.user = action.payload.user;
      state.token = action.payload.access_token;
      state.board = true;
    });
    builder.addCase(addBoard.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // get Boards here
    builder.addCase(getBaord.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getBaord.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.board = true;
    });
    builder.addCase(getBaord.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default boardSlice.reducer;
