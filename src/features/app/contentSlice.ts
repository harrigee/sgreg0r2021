import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ContentState {
  value?: string;
  user?: string;
}

const initialState: ContentState = {
  value: undefined,
  user: undefined
}

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<ContentState>) => {
      state.user = action.payload.user;
      state.value = action.payload.value;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setContent } = contentSlice.actions;

export default contentSlice.reducer;
