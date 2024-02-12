import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "myLogin",
  initialState: { is_signed: false, is_manager: false, name: "" },
  reducers: {
    signin: function (state, action) {
      state.is_signed = true;
      state.is_manager = action.payload.newUser.is_manager;
      state.name = action.payload.newUser.name;
    },
    signout: function (state, action) {
      state.is_signed = false;
      state.is_manager = false;
      state.name = "";
    },
  },
});

export default loginSlice;
export const { signin, signout } = loginSlice.actions;
