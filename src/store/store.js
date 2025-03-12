import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import interestsReducer from "./interestSlice";
import postReducer from "./postSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    interests: interestsReducer,
    posts: postReducer,
  },
});
