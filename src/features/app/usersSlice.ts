import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UsersState {
  [key: string]: {
    uid: string;
    displayName: string;
    isOnline: boolean;
    charCount: number;
  };
}

export const usersSlice = createSlice({
  name: "users",
  initialState: {} as UsersState,
  reducers: {
    setUsers: (state, action: PayloadAction<UsersState>) => {
      return (state = { ...action.payload });
    },
  },
});

export const { setUsers } = usersSlice.actions;

export default usersSlice.reducer;
