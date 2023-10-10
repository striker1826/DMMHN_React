import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  id: null,
  nickname: null,
  profileImg: null,
  socialId: null,
  createdAt: null,
  updatedAt: null,
};

let user = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeUser(state, action) {
      const user = action.payload;
      return {
        ...user,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export let { changeUser } = user.actions;

export default user;
