import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface IContentState {
  value?: string;
  user?: string;
}

export const contentSlice = createSlice({
  name: "content",
  initialState: {
    value: undefined,
    user: undefined,
  } as IContentState,
  reducers: {
    getContent: (_) => {},
    setContent: (state, action: PayloadAction<IContentState>) => {
      state.user = action.payload.user;
      state.value = action.payload.value;
    },
  },
});

// Selectors
export const selectContent = (state: RootState) => state.content;

// Actions
export const { setContent, getContent } = contentSlice.actions;

// Reducer
export default contentSlice.reducer;
