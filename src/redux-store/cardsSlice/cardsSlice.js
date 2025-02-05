import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userRequest, userRequestForMultipart } from "../apiRouts/apiRouts";
// import axios from "axios";

export const updateCardsData = createAsyncThunk(
  "cards/updateCardsData",
  async (userData, { rejectWithValue }) => {
    console.log("userData>>>" , userData);

    try {
      const response = await userRequest.post(`/admin/list-cards/update-card-description/${userData?.cardId}`, userData);
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
      const response = await userRequest.post(`admin/list-cards/add-card-member/${userData.cardId}`, userData);
console.log("response api>>>", response);

      // const response = await userRequest.post("/login", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const viewCardData = createAsyncThunk(
  "cards/viewCardData",
  async (userData, { rejectWithValue }) => {
    try {
        if(userData?.isUser){
            const response = await userRequest.get(`user/list-cards/view-card/${userData.item}`);
            
            return response.data;
        }
        else{
            const response = await userRequest.get(`admin/list-cards/view-card/${userData.item}`);

    
          // const response = await userRequest.post("/login", userData);
          return response.data;
        }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addCardsAttachment = createAsyncThunk(
    "cards/addCardsAttachment",
    async (userData, { rejectWithValue }) => {
      console.log("userData>>>" , userData);
  
      try {
        const response = await userRequestForMultipart.post(`admin/list-cards/upload-card-attachment/${userData?.cardId}`, userData);
  console.log("response apiS", response);
  
        // const response = await userRequest.post("/login", userData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
export const addCardComment = createAsyncThunk(
    "cards/addCardComment",
    async (userData, { rejectWithValue }) => {
      console.log("userData>>>" , userData);
      
      try {
          if(userData.userRole === "user"){
    
            
              const response = await userRequest.post(`user/list-cards/add-comment/${userData?.cardId}`, userData);
      console.log("response apiS", response);
      
            // const response = await userRequest.post("/login", userData);
            return response.data;
          }
          else{
            const response = await userRequest.post(`admin/list-cards/add-card-comment/${userData?.cardId}`, userData);
            console.log("response apiS", response);
            
                  // const response = await userRequest.post("/login", userData);
                  return response.data;
          }
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );



const cardsSlice = createSlice({
  name: "cards",
  initialState: {
   updateCards: [],
   cardData: [],
   cardAttachment: [],
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
/// crds  view work
    builder.addCase(viewCardData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(viewCardData.fulfilled, (state, action) => {

      state.loading = false;

      state.cardData= action.payload.data;
    });
    builder.addCase(viewCardData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
/// crds  Attachment work
    builder.addCase(addCardsAttachment.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addCardsAttachment.fulfilled, (state, action) => {

      state.loading = false;

      state.cardAttachment= action.payload.data;
    });
    builder.addCase(addCardsAttachment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });


   
  },
});

export default cardsSlice.reducer;
