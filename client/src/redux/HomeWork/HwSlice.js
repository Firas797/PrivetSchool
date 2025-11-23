import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// Thunk for fetching homework
export const fetchHomeWorks = createAsyncThunk('homeWorks/fetchHomeWorks', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/api/homeworks/getAllHw');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Thunk for adding homework
export const addHomeWorkAsync = createAsyncThunk('homeWorks/addHomeWork', async (homeWorkData, { rejectWithValue }) => {
  try {
    // Ensure homeWorkData is correctly formatted
    const { title, classe, description, category } = homeWorkData;
    const response = await axios.post('/api/homeworks/createHw', { title, classe, description, category });
    toast.success('Homework added successfully');
    return response.data.homeWork;
  } catch (error) {
    toast.error('Failed to add Homework');
    return rejectWithValue(error.response.data);
  }
});
// 🔹 Add this new thunk in your slice file
export const fetchHomeWorksByClass = createAsyncThunk(
  'homeWorks/fetchHomeWorksByClass',
  async (classNumber, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/homeworks/by-class/${classNumber}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { msg: 'Error fetching homeworks' });
    }
  }
);

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
      })
       .addCase(fetchHomeWorksByClass.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(fetchHomeWorksByClass.fulfilled, (state, action) => {
    state.loading = false;
    state.error = null;
    state.homeWorks = action.payload;
  })
  .addCase(fetchHomeWorksByClass.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload.msg;
  });
  },
});
export const selectHomeWorks = (state) => state.homeWork.homeWorks;
export const selectHomeWorksLoading = (state) => state.homeWork.loading;
export const selectHomeWorksError = (state) => state.homeWork.error;

export default homeWorkSlice.reducer;
