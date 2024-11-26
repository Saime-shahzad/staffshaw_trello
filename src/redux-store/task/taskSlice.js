import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {userRequest} from "../apiRouts/apiRouts";
// import axios from "axios";

export const addTask = createAsyncThunk(
  "board/addTask",
  async (taskData, { rejectWithValue }) => {
    
    try {
      const response = await userRequest.post("/tasks", taskData);
      // const response = await userRequest.post("/login", taskData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (taskData, { rejectWithValue }) => {
    console.log("taskData...slice>>", taskData);
    
    try {
      const response = await userRequest.post("/update-task", taskData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getTasks = createAsyncThunk(
  "task/getTasks",
  async (taskData, { rejectWithValue }) => {
    console.log("taskData...slice>>", taskData);
    
    try {
      const response = await userRequest.post("/getTask", taskData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState: {
    addTasks:[],
    getTasks: [],
    updateTasks: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder.addCase(addTask.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      
      state.loading = false;  
    
      state.addTasks = action.payload;
    });
    builder.addCase(addTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // get tasks here
    builder.addCase(updateTask.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.loading = false;
     
      state.updateTasks = action.payload;
    });
    builder.addCase(updateTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getTasks.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.loading = false;
     
      state.board = action.payload;
    });
    builder.addCase(getTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default taskSlice.reducer;
