import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

// Async thunk для завантаження кемперів
export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();

      if (filters.location) {
        params.append("location", filters.location);
      }

      if (filters.bodyType) {
        params.append("form", filters.bodyType);
      }

      // Додаємо фільтри обладнання
      if (filters.features && filters.features.length > 0) {
        filters.features.forEach((feature) => {
          if (feature === "transmission") {
            params.append("transmission", "automatic");
          } else {
            params.append(feature, "true");
          }
        });
      }

      params.append("page", filters.page || 1);
      params.append("limit", 4);

      const response = await axios.get(`${API_URL}?${params.toString()}`);
      return {
        items: response.data.items || response.data,
        page: filters.page || 1,
        hasMore:
          response.data.items && response.data.items.length === 4
            ? true
            : response.data.length === 4,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk для завантаження додаткових кемперів
export const loadMoreCampers = createAsyncThunk(
  "campers/loadMoreCampers",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();

      if (filters.location) {
        params.append("location", filters.location);
      }

      if (filters.bodyType) {
        params.append("form", filters.bodyType);
      }

      if (filters.features && filters.features.length > 0) {
        filters.features.forEach((feature) => {
          if (feature === "transmission") {
            params.append("transmission", "automatic");
          } else {
            params.append(feature, "true");
          }
        });
      }

      params.append("page", filters.page || 1);
      params.append("limit", 4);

      const response = await axios.get(`${API_URL}?${params.toString()}`);
      return {
        items: response.data.items || response.data,
        page: filters.page || 1,
        hasMore:
          response.data.items && response.data.items.length === 4
            ? true
            : response.data.length === 4,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk для завантаження конкретного кемпера
export const fetchCamperById = createAsyncThunk(
  "campers/fetchCamperById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    items: [],
    currentCamper: null,
    loading: false,
    error: null,
    page: 1,
    hasMore: true,
  },
  reducers: {
    clearCampers: (state) => {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
    clearCurrentCamper: (state) => {
      state.currentCamper = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCampers
      .addCase(fetchCampers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.page = action.payload.page;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // loadMoreCampers
      .addCase(loadMoreCampers.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadMoreCampers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [...state.items, ...action.payload.items];
        state.page = action.payload.page;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(loadMoreCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchCamperById
      .addCase(fetchCamperById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCamper = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCampers, clearCurrentCamper } = campersSlice.actions;
export default campersSlice.reducer;
