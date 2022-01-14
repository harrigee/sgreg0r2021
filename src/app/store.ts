import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import contentSaga from "../features/app/contentSaga";
import contentReducer from "../features/app/contentSlice";
import usersReducer from "../features/app/usersSlice";

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    content: contentReducer,
    users: usersReducer,
  },
  middleware: [saga],
});

saga.run(contentSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
