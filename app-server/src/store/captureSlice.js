import { createSlice } from "@reduxjs/toolkit";

const captureSlice = createSlice({
  name: "review",
  initialState: {
    rarityPreset: "custom",
    isHolo: true,
    isGlow: true,
    isShine: true,
    isShadow: true,
    framePreset: "1",
    frameColor: "3",
    cardBG: "1",
  },
  reducers: {
    setRarityPreset(state, action) {
      state.rarityPreset = action.payload.newRarityPreset;
    },
    setIsHolo(state, action) {
      state.isHolo = action.payload.newIsHolo;
    },
    setIsGlow(state, action) {
      state.isGlow = action.payload.newIsGlow;
    },
    setIsShine(state, action) {
      state.isShine = action.payload.newIsShine;
    },
    setIsShadow(state, action) {
      state.isShadow = action.payload.newIsShadow;
    },
    setFramePreset(state, action) {
      state.framePreset = action.payload.newFramePreset;
    },
    setFrameColor(state, action) {
      state.frameColor = action.payload.newFrameColor;
    },
    cardBG(state, action) {
      state.cardBG = action.payload.newcardBG;
    },
  },
});

export default captureSlice;
export const {
  setRarityPreset,
  setIsHolo,
  setIsGlow,
  setIsShine,
  setIsShadow,
  setFramePreset,
  setFrameColor,
  cardBG,
} = captureSlice.actions;
