import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface ContentState {
  value?: string;
  user?: string;
}

export const contentSlice = createSlice({
  name: "content",
  initialState: {
    value: undefined,
    user: undefined,
  } as ContentState,
  reducers: {
    setContent: (state, action: PayloadAction<ContentState>) => {
      state.user = action.payload.user;
      state.value = action.payload.value;
    },
  },
});

export const selectContent = (state: RootState) => state.content;

export const { setContent } = contentSlice.actions;
export default contentSlice.reducer;
