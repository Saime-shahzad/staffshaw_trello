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

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (userData, { rejectWithValue }) => {
    
    try {
      const response = await userRequest.get("/admin/users-list", userData);
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const approveUser = createAsyncThunk(
  "user/approveUser",
  async (userData, { rejectWithValue }) => {
    
    try {
      const response = await userRequest.post("admin/update-wrokspace-request", userData);
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getUserDetails = createAsyncThunk(
  "user/getUserdetail",
  async (userData, { rejectWithValue }) => {
    
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
    userProfileData:[],
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

    ////Approve Users
    builder.addCase(approveUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(approveUser.fulfilled, (state, action) => {
      
      state.loading = false;  
      // state.user = action.payload.user;
    });
    builder.addCase(approveUser.rejected, (state, action) => {
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
      state.user = action.payload.users;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //get userprofile data//
    builder.addCase(getUserDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.userProfileData = action.payload;
    });
    builder.addCase(getUserDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
