import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

export const addGlobalData = createAsyncThunk(
    "global/addGlobalData",
    async (addGlobalDataData, { rejectWithValue }) => {
      console.log("addGlobalDataData>>>", addGlobalDataData);
  
      try {
        // Simulate API call (replace this with actual API logic)
        // const response = await axios.post("/api/globalData", addGlobalDataData);
        // return response.data;
  
        // For now, return the data directly
        return addGlobalDataData;
      } catch (error) {
        console.log("Error in addGlobalData:", error);
  
        // Ensure meaningful error data is passed to the reducer
        return rejectWithValue(
          error.response?.data || error.message || "An unknown error occurred"
        );
      }
    }
  );
  



const globalSlice = createSlice({
    name: "global",
    initialState: {
      addglobal: [],
      lastClickedItem: null, // Add this for storing the last clicked item
      loading: false,
      error: null,
    },
  
    extraReducers: (builder) => {
      builder.addCase(addGlobalData.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
      builder.addCase(addGlobalData.fulfilled, (state, action) => {
        console.log("Payload:", action.payload);
        state.loading = false;
        state.addglobal.push(action.payload); // Add to the list
        state.lastClickedItem = action.payload; // Store the last clicked item
      });
      builder.addCase(addGlobalData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    },
  });
  
  

export default globalSlice.reducer;
