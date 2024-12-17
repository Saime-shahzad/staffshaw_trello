import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {userRequest} from "../apiRouts/apiRouts";
// import axios from "axios";

export const addList = createAsyncThunk(
  "lists/addList",
  async (addListData, { rejectWithValue }) => {
    console.log("addListData.cardId", addListData.boardId);
    console.log("addListData.title", addListData.title);
    
    try {
      const response = await userRequest.post(`admin/board-lists/create-list/${addListData.boardId}`, {title:addListData.title});
      // const response = await userRequest.post("/login", addListData);                                                                                                            
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const listSlice = createSlice({
  name: "lists",
  initialState: {
    addLists:[],
  
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder.addCase(addList.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addList.fulfilled, (state, action) => {
      
      state.loading = false;  
    
      state.addLists = action.payload;
    });
    builder.addCase(addList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  },
});

export default listSlice.reducer;
