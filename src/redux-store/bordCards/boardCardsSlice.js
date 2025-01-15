import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userRequest } from "../apiRouts/apiRouts";
// import axios from "axios";

export const addBoardCards = createAsyncThunk(
  "boardCards/addBoardCards",
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

export const getBoardList = createAsyncThunk(
  "boardCards/getBoardList",
  async (userData, { rejectWithValue }) => {
    
    try {
      const response = await userRequest.get(`/admin/boards/${userData}`);
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getListAgainstBoards = createAsyncThunk(
  "boardCards/getListAgainstBoards",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await userRequest.get(`admin/board-lists/${userData}`);
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const boardCardsSlice = createSlice({
  name: "boardCards",
  initialState: {
    boards: [],
    listAgainstBoards: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder.addCase(addBoardCards.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addBoardCards.fulfilled, (state, action) => {
      state.loading = false;

      state.boardCards= action.payload;
    });
    builder.addCase(addBoardCards.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // get Boards here
    builder.addCase(getBoardList.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getBoardList.fulfilled, (state, action) => {
        

      state.loading = false;

      state.boardCards= action.payload.boards;
    });
    builder.addCase(getBoardList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // getListsAgainstBoards here
    builder.addCase(getListAgainstBoards.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getListAgainstBoards.fulfilled, (state, action) => {
        

      state.loading = false;

      state.listAgainstBoards= action.payload.boardLists;
    });
    builder.addCase(getListAgainstBoards.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
   
  },
});

export default boardCardsSlice.reducer;
