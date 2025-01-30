import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userRequest } from "../apiRouts/apiRouts";
// import axios from "axios";

export const updateCardsData = createAsyncThunk(
  "cards/updateCardsData",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await userRequest.post(`/admin/list-cards/update-card-description/${userData.cradId}`, userData);
console.log("response apiS", response);

      // const response = await userRequest.post("/login", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const addCardMember = createAsyncThunk(
  "cards/addCardMember",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await userRequest.post(`admin/list-cards/add-card-member/11${userData.cradId}`, userData);
console.log("response api>>>", response);

      // const response = await userRequest.post("/login", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);




const cardsSlice = createSlice({
  name: "cards",
  initialState: {
   updateCards: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder.addCase(updateCardsData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateCardsData.fulfilled, (state, action) => {
      state.loading = false;

      state.updateCards= action.payload;
    });
    builder.addCase(updateCardsData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
/// crds  member work
    builder.addCase(addCardMember.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addCardMember.fulfilled, (state, action) => {
      state.loading = false;

      state.updateCards= action.payload;
    });
    builder.addCase(addCardMember.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });


   
  },
});

export default cardsSlice.reducer;
