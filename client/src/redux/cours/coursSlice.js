import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import react-toastify

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/api/getAllCourses');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const addCourseAsync = createAsyncThunk('courses/addCourse', async (courseData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/createCourse', courseData);
    toast.success('Course added successfully'); // Show success toast
    return response.data.course;
  } catch (error) {
    toast.error('Failed to add course'); // Show error toast
    return rejectWithValue(error.response.data);
  }
});

const initialState = {
  courses: [],
  loading: false,
  error: null,
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    // Your existing reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg;
      })
      .addCase(addCourseAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCourseAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.courses.push(action.payload);
      })
      .addCase(addCourseAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg;
      });
  },
});

export const selectCourses = (state) => state.courses.courses;
export const selectCoursesLoading = (state) => state.courses.loading;
export const selectCoursesError = (state) => state.courses.error;

export default courseSlice.reducer;
