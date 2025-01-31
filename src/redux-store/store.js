import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import boardSlice from "./boards/boardSlice";
import userSlice from "./users/userSlice";
import boardCardsSlice from "./bordCards/boardCardsSlice";
import globalSlice from "./globalSlice/globalSlice";
import cardsSlice from "./cardsSlice/cardsSlice"

const store = configureStore({
  reducer: {
    auth: authSlice,
    boards:boardSlice,
    user:userSlice,
    boardCards:boardCardsSlice,
    globalData:globalSlice,
    cards:cardsSlice,
  
    // passwordReset: forgetPasswordReducer,
  },
});

export default store;

