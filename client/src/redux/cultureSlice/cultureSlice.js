import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/culture';

// 🔹 Get all culture items
export const fetchCultures = createAsyncThunk('culture/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Error fetching cultures');
  }
});

// 🔹 Create a new culture item
export const createCulture = createAsyncThunk('culture/create', async (formData, { rejectWithValue }) => {
  try {
    const res = await axios.post(API_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Error creating culture');
  }
});

// 🔹 Delete culture
export const deleteCulture = createAsyncThunk('culture/delete', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Error deleting culture');
  }
});

const cultureSlice = createSlice({
  name: 'culture',
  initialState: {
    cultures: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔸 Fetch
      .addCase(fetchCultures.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCultures.fulfilled, (state, action) => {
        state.loading = false;
        state.cultures = action.payload;
      })
      .addCase(fetchCultures.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔸 Create
      .addCase(createCulture.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCulture.fulfilled, (state, action) => {
        state.loading = false;
        state.cultures.push(action.payload);
      })
      .addCase(createCulture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔸 Delete
      .addCase(deleteCulture.fulfilled, (state, action) => {
        state.cultures = state.cultures.filter((c) => c._id !== action.payload);
      })
      .addCase(deleteCulture.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default cultureSlice.reducer;
