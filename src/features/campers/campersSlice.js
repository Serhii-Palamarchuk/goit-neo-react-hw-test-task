import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// Список кемперів (повертає або масив, або { items: [...] })
export const fetchCampers = createAsyncThunk(
  "campers/fetchAll",
  async ({ page = 1, limit = 10, filters = {} } = {}, { rejectWithValue }) => {
    try {
      const response = await api.get("/campers", {
        params: { page, limit, ...filters },
      });
      return response.data;
    } catch (err) {
      // Якщо 404 — просто повертаємо порожній масив
      if (err.response?.status === 404) {
        return [];
      }
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Деталі одного кемпера
export const fetchCamperById = createAsyncThunk(
  "campers/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/campers/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    items: [],
    status: "idle",
    error: null,

    detail: null,
    detailStatus: "idle",
    detailError: null,

    page: 1,
    limit: 10,
    hasMore: true,
  },
  reducers: {
    resetCampers(state) {
      state.items = [];
      state.status = "idle";
      state.error = null;
      state.page = 1;
      state.hasMore = true;
    },
    incrementPage(state) {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== список =====
      .addCase(fetchCampers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCampers.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        // payload може бути [] або об’єкт з полем items
        const data = Array.isArray(payload)
          ? payload
          : Array.isArray(payload.items)
          ? payload.items
          : [];
        if (data.length < state.limit) state.hasMore = false;
        // якщо це перша сторінка — заміняємо, інакше — додаємо
        state.items = state.page === 1 ? data : [...state.items, ...data];
      })
      .addCase(fetchCampers.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      })

      // ===== деталі =====
      .addCase(fetchCamperById.pending, (state) => {
        state.detailStatus = "loading";
      })
      .addCase(fetchCamperById.fulfilled, (state, { payload }) => {
        state.detailStatus = "succeeded";
        state.detail = payload;
      })
      .addCase(fetchCamperById.rejected, (state, { payload }) => {
        state.detailStatus = "failed";
        state.detailError = payload;
      });
  },
});

export const { resetCampers, incrementPage } = campersSlice.actions;
export default campersSlice.reducer;
