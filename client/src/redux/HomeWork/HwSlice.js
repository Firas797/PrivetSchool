import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// Thunk for fetching homework
export const fetchHomeWorks = createAsyncThunk('homeWorks/fetchHomeWorks', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/api/getAllHw');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Thunk for adding homework
export const addHomeWorkAsync = createAsyncThunk('homeWorks/addHomeWork', async (homeWorkData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/createHw', homeWorkData);
    toast.success('Homework added successfully');
    return response.data.homeWork;
  } catch (error) {
    toast.error('Failed to add Homework');
    return rejectWithValue(error.response.data);
  }
});

const initialState = {
  homeWorks: [],
  loading: false,
  error: null,
};

const homeWorkSlice = createSlice({
  name: 'homeWorks',
  initialState,
  reducers: {
    // Your existing reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeWorks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeWorks.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.homeWorks = action.payload;
      })
      .addCase(fetchHomeWorks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg;
      })
      .addCase(addHomeWorkAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addHomeWorkAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.homeWorks.push(action.payload);
      })
      .addCase(addHomeWorkAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg;
      });
  },
});

export const selectHomeWorks = (state) => state.homeWorks.homeWorks;
export const selectHomeWorksLoading = (state) => state.homeWorks.loading;
export const selectHomeWorksError = (state) => state.homeWorks.error;

export default homeWorkSlice.reducer;
