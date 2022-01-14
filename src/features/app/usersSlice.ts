import { RootState } from "./../../app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  uid: string;
  displayName: string;
  isOnline: boolean;
  charCount: number;
}

export interface IUsersState {
  [key: string]: IUser;
}

export const usersSlice = createSlice({
  name: "users",
  initialState: {} as IUsersState,
  reducers: {
    setUsers: (state, action: PayloadAction<IUsersState>) => {
      return (state = { ...action.payload });
    },
  },
});

export const selectSortedUsers = (state: RootState) => {
  const users = state.users;
  const userItems = Object.values(users);
  userItems.sort((item1, item2) => {
    if (!item1.charCount) {
      return 1;
    }
    if (item1.charCount <= item2.charCount) {
      return 1;
    }
    return -1;
  });
  return userItems;
};

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
