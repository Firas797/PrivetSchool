import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// Fetch all courses
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/courses'); // backend route
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { msg: error.message });
    }
  }
);

// Add a new course
export const addCourseAsync = createAsyncThunk(
  'courses/addCourse',
  async (courseData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('Title', courseData.Title);
      formData.append('classe', courseData.classe);
      formData.append('description', courseData.description);
      formData.append('category', courseData.category);

      if (courseData.urlVid) formData.append('urlVid', courseData.urlVid);
      if (courseData.pdfFile) formData.append('pdfFile', courseData.pdfFile);

      const response = await axios.post('/api/courses/createCourse', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Course added successfully');
      return response.data.course;
    } catch (error) {
      toast.error('Failed to add course');
      return rejectWithValue(error.response?.data || { msg: error.message });
    }
  }
);

const initialState = {
  courses: [],
  loading: false,
  error: null,
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
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
