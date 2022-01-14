import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ContentState {
  value?: string;
  user?: string;
}

export const contentSlice = createSlice({
  name: 'content',
  initialState: {
    value: undefined,
    user: undefined
  } as ContentState,
  reducers: {
    setContent: (state, action: PayloadAction<ContentState>) => {
      state.user = action.payload.user;
      state.value = action.payload.value;
    },
  },
})

export const { setContent } = contentSlice.actions;
export default contentSlice.reducer;
