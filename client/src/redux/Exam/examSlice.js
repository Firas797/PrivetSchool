import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunks
export const createExam = createAsyncThunk(
  'Exams/createExam',
  async (examData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('Title', examData.Title);
      formData.append('description', examData.description);
      formData.append('classe', examData.classe);
      formData.append('category', examData.category);
      if (examData.file) {
        formData.append('file', examData.file);
      }

      const response = await axios.post('/api/exams/createExam', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllExams = createAsyncThunk(
  'Exams/getAllExams',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/exams');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getExamsByClass = createAsyncThunk(
  'Exams/getExamsByClass',
  async (classe, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/exams/class/${classe}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateExam = createAsyncThunk(
  'Exams/updateExam',
  async ({ id, examData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('Title', examData.Title);
      formData.append('description', examData.description);
      formData.append('classe', examData.classe);
      formData.append('category', examData.category);
      if (examData.file) {
        formData.append('file', examData.file);
      }

      const response = await axios.put(`/api/exams/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteExam = createAsyncThunk(
  'Exams/deleteExam',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/exams/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const examSlice = createSlice({
  name: 'Exams', // Changed to 'Exams' to match your selectors
  initialState: {
    exams: [],
    loading: false,
    error: null,
    currentExam: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentExam: (state, action) => {
      state.currentExam = action.payload;
    },
    clearCurrentExam: (state) => {
      state.currentExam = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Exam
      .addCase(createExam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExam.fulfilled, (state, action) => {
        state.loading = false;
        state.exams.unshift(action.payload.exam);
      })
      .addCase(createExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || 'Failed to create exam';
      })
      // Get All Exams
      .addCase(getAllExams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllExams.fulfilled, (state, action) => {
        state.loading = false;
        state.exams = action.payload;
      })
      .addCase(getAllExams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || 'Failed to fetch exams';
      })
      // Get Exams By Class
      .addCase(getExamsByClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExamsByClass.fulfilled, (state, action) => {
        state.loading = false;
        state.exams = action.payload;
      })
      .addCase(getExamsByClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || 'Failed to fetch class exams';
      })
      // Update Exam
      .addCase(updateExam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExam.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.exams.findIndex(exam => exam._id === action.payload.exam._id);
        if (index !== -1) {
          state.exams[index] = action.payload.exam;
        }
        state.currentExam = null;
      })
      .addCase(updateExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || 'Failed to update exam';
      })
      // Delete Exam
      .addCase(deleteExam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExam.fulfilled, (state, action) => {
        state.loading = false;
        state.exams = state.exams.filter(exam => exam._id !== action.payload);
      })
      .addCase(deleteExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || 'Failed to delete exam';
      });
  },
});

// Selectors - now they will work correctly
export const selectExams = (state) => state.Exams.exams;
export const selectExamsLoading = (state) => state.Exams.loading;
export const selectExamsError = (state) => state.Exams.error;

export const { clearError, setCurrentExam, clearCurrentExam } = examSlice.actions;
export default examSlice.reducer;