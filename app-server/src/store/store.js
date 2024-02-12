import { configureStore } from "@reduxjs/toolkit";

import captureSlice from "./captureSlice";
import mainSlice from "./mainSlice";
import itemSlice from "./itemSlice";
import loginSlice from "./loginSlice";

const store = configureStore({
  reducer: {
    captureSlice: captureSlice.reducer,
    mainSlice: mainSlice.reducer,
    itemSlice: itemSlice.reducer,
    loginSlice: loginSlice.reducer,
  },
});

export default store;
