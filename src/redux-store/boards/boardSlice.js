import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userRequest } from "../apiRouts/apiRouts";
// import axios from "axios";

export const addBoard = createAsyncThunk(
  "board/addBoard",
  async (userData, { rejectWithValue }) => {
    console.log("userData>>>>" , userData);
    
    try {
      const response = await userRequest.post(`admin/boards/create-board/${userData.workspace_name}`, userData);
      // const response = await userRequest.post("/board", userData);

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
    try {
      const response = await userRequest.get(`/auth/workspaces/${userData}/boards`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getWorkspaces = createAsyncThunk(
  "board/getWorkspaces",
  async ( userData, { rejectWithValue }) => {
    try {
      const response = await userRequest.get("/auth/workspaces");
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const boardSlice = createSlice({
  name: "board",
  initialState: {
    boards: [],
    workspaces:[],
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

      state.boards = action.payload;
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

      state.boards = action.payload.boards;
    });
    builder.addCase(getBaord.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // get workspaces here
    builder.addCase(getWorkspaces.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getWorkspaces.fulfilled, (state, action) => {

      state.loading = false;

      state.workspaces = action.payload.workspaces;
    });
    builder.addCase(getWorkspaces.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default boardSlice.reducer;
