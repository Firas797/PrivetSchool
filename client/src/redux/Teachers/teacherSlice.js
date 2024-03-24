import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Login user
export const loginTeacher = createAsyncThunk('auth/loginTeacher', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/teachers/loginTeacher', userData);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    return user;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Register Techer
export const registerTeacher = createAsyncThunk('auth/registerTeacher', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/teachers/registerTeacher', userData);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    return user;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

//get All teachers
export const getAllTeachers = createAsyncThunk('teachers/getAllTeachers', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/teachers/getAllTeachers');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    teacher: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
    isLogedIn:false,
    teachers: [], // Initialize as an empty array

  },
  reducers: {
    logoutTeacher: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.teacher = action.payload;
        state.token = localStorage.getItem('token'); // Update token from localStorage
        state.isLogedIn = true
      })
      .addCase(loginTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg;
        
      })
      .addCase(registerTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.teacher = action.payload;
        state.token = localStorage.getItem('token'); // Update token from localStorage
      })
      .addCase(registerTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg;
      })
      .addCase(getAllTeachers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Assuming the API response will be an array of teachers
        state.teachers = action.payload;
      })
      .addCase(getAllTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg;
      });
      
  },
});


export const { logoutTeacher } = authSlice.actions;

export default authSlice.reducer;
