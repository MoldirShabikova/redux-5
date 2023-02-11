import { createSlice } from "@reduxjs/toolkit";

export const displayCountry = createSlice({
  name: "isLoading",
  initialState: {
    value: false,
  },
  reducers: {
    setLoadingTrue: (state) => {
      state.value = true;
    },
    setLoadingFalse: (state) => {
      state.value = false;
    },
    toggleLoading: (state) => {
      state.value = !state.value;
    },
  },
});

export const { setLoadingFalse, setLoadingTrue, toggleLoading } =
  displayCountry.actions;

export const selectLoading = (state) => state.isLoading.value;

export default displayCountry.reducer;
