import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "../features/app/contentSlice";
import usersReducer from "../features/app/usersSlice";

export const store = configureStore({
  reducer: {
    content: contentReducer,
    users: usersReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const selectContent = (state: RootState) => state.content;
export const selectUsers = (state: RootState) => state.users;
