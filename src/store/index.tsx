import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import loginSlice from "./user/loginSlice";
import registerSlice from "./user/registerSlice";

export const store = configureStore({
  reducer: {
    userStore: userSlice,
    loginStore: loginSlice,
    registerSlice: registerSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
