import { createSlice } from "@reduxjs/toolkit";

const mainSlice = createSlice({
  name: "review",
  initialState: { isDark: "dark", thema: "1", isThemaOpen: true },
  reducers: {
    setIsDark(state, action) {
      state.isDark = action.payload.newIsDark;
    },
    setThema(state, action) {
      state.thema = action.payload.newThema;
    },
    setIsThemaOpen(state, action) {
      state.isThemaOpen = action.payload.newIsThemaOpen;
    },
  },
});

export default mainSlice;
export const { setIsDark, setIsThemaOpen, setThema } = mainSlice.actions;
