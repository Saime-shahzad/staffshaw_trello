import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userRequest } from "../apiRouts/apiRouts";
// import axios from "axios";

export const addGlobalData = createAsyncThunk(
  "global/addGlobalData",
  async (addGlobalDataData, { rejectWithValue }) => {
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
export const getDashboardData = createAsyncThunk(
  "global/getDashboardData",
  async (dashboardData, { rejectWithValue }) => {
    try {
      // Simulate API call (replace this with actual API logic)
      const response = await userRequest.get("admin/dashboard", dashboardData);
      return response.data;

      // For now, return the data directly
    } catch (error) {
      console.log("Error in addGlobalData:", error);

      // Ensure meaningful error data is passed to the reducer
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred"
      );
    }
  }
);
export const getWorkspaces = createAsyncThunk(
  "global/getWorkspaces",
  async (dashboardData, { rejectWithValue }) => {
    try {
      // Simulate API call (replace this with actual API logic)
      const response = await userRequest.get("admin/workspaces", dashboardData);
      return response.data;

      // For now, return the data directly
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
    dashboardData: [],
    workspaceData: [],
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
      state.loading = false;
      state.addglobal.push(action.payload); // Add to the list
      state.lastClickedItem = action.payload; // Store the last clicked item
    });
    builder.addCase(addGlobalData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    /// dashboard Data collection//
    builder.addCase(getDashboardData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getDashboardData.fulfilled, (state, action) => {
      state.loading = false;
      state.dashboardData = action.payload.data.workspaces; // Store the last clicked item
    });
    builder.addCase(getDashboardData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    /// get WorkSpaces//
    builder.addCase(getWorkspaces.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getWorkspaces.fulfilled, (state, action) => {
      
      state.loading = false;
      state.workspaceData = action.payload.workspaces; // Store the last clicked item
    });
    builder.addCase(getWorkspaces.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default globalSlice.reducer;
