import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

// Завантаження списку кемперів
export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async ({ page, limit, filters }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(API_URL, {
        params: { page, limit, ...filters },
      });
      return data; // { total, items: [...] }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Завантаження деталей одного кемпера
export const fetchCamperById = createAsyncThunk(
  "campers/fetchCamperById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    items: [],
    detail: null,
    page: 1,
    limit: 10,
    hasMore: true,
    status: "idle",
    detailStatus: "idle",
    error: null,
  },
  reducers: {
    resetCampers(state) {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
      state.status = "idle";
      state.error = null;
    },
    incrementPage(state) {
      state.page += 1;
    },
    // Ось він, екшен для перемикання фаворита
    toggleFavorite(state, action) {
      const id = action.payload;
      const camper = state.items.find((c) => c.id === id);
      if (camper) camper.isFavorite = !camper.isFavorite;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, { payload }) => {
        const { items: newItems } = payload;
        const normalized = newItems.map((c) => ({
          ...c,
          isFavorite: c.isFavorite ?? false,
        }));
        state.items = [...state.items, ...normalized];
        state.hasMore = normalized.length === state.limit;
        state.status = "succeeded";
      })
      .addCase(fetchCampers.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      })
      .addCase(fetchCamperById.pending, (state) => {
        state.detailStatus = "loading";
        state.error = null;
      })
      .addCase(fetchCamperById.fulfilled, (state, { payload }) => {
        state.detailStatus = "succeeded";
        state.detail = payload;
      })
      .addCase(fetchCamperById.rejected, (state, { payload }) => {
        state.detailStatus = "failed";
        state.error = payload;
      });
  },
});

export const { resetCampers, incrementPage, toggleFavorite } =
  campersSlice.actions;

export default campersSlice.reducer;
