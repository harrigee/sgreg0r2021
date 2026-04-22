import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface IContentState {
  value?: string;
  user?: string;
  email?: string;
  postedAt?: number;
}

export const contentSlice = createSlice({
  name: "content",
  initialState: {
    value: undefined,
    user: undefined,
    postedAt: undefined,
  } as IContentState,
  reducers: {
    getContent: (_) => {},
    setContent: (state, action: PayloadAction<IContentState>) => {
      state.user = action.payload?.user;
      state.value = action.payload?.value;
      state.postedAt = action.payload?.postedAt;
    },
  },
});

// Selectors
export const selectContent = (state: RootState) => state.content;

// Actions
export const { setContent, getContent } = contentSlice.actions;

// Reducer
export default contentSlice.reducer;
