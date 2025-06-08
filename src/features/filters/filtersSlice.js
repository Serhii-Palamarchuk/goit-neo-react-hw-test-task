import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  bodyType: "",
  features: [], // напр. ['AC','kitchen']
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setLocation(state, action) {
      state.location = action.payload;
    },
    setBodyType(state, action) {
      state.bodyType = action.payload;
    },
    toggleFeature(state, action) {
      const feat = action.payload;
      state.features = state.features.includes(feat)
        ? state.features.filter((f) => f !== feat)
        : [...state.features, feat];
    },
    clearFilters(state) {
      state.location = "";
      state.bodyType = "";
      state.features = [];
    },
  },
});

export const { setLocation, setBodyType, toggleFeature, clearFilters } =
  filtersSlice.actions;
export default filtersSlice.reducer;
