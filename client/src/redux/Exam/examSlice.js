import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// ✅ CORRIGÉ: Utiliser l'URL de votre backend
const API_BASE_URL = 'https://57.131.24.227';

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

      const response = await axios.post(`${API_BASE_URL}/api/exams/createExam`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Examen créé avec succès');
      return response.data;
    } catch (error) {
      toast.error('Échec de la création de l\'examen');
      return rejectWithValue(error.response?.data || { msg: 'Échec de la création de l\'examen' });
    }
  }
);

export const getAllExams = createAsyncThunk(
  'Exams/getAllExams',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/exams`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { msg: 'Échec de la récupération des examens' });
    }
  }
);

export const getExamsByClass = createAsyncThunk(
  'Exams/getExamsByClass',
  async (classe, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/exams/class/${classe}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { msg: 'Échec de la récupération des examens par classe' });
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

      const response = await axios.put(`${API_BASE_URL}/api/exams/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Examen mis à jour avec succès');
      return response.data;
    } catch (error) {
      toast.error('Échec de la mise à jour de l\'examen');
      return rejectWithValue(error.response?.data || { msg: 'Échec de la mise à jour de l\'examen' });
    }
  }
);

export const deleteExam = createAsyncThunk(
  'Exams/deleteExam',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/exams/${id}`);
      toast.success('Examen supprimé avec succès');
      return id;
    } catch (error) {
      toast.error('Échec de la suppression de l\'examen');
      return rejectWithValue(error.response?.data || { msg: 'Échec de la suppression de l\'examen' });
    }
  }
);

export const getExamById = createAsyncThunk(
  'Exams/getExamById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/exams/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { msg: 'Échec de la récupération de l\'examen' });
    }
  }
);

const examSlice = createSlice({
  name: 'Exams',
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
    clearExams: (state) => {
      state.exams = [];
    }
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
        state.error = action.payload?.msg || 'Échec de la création de l\'examen';
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
        state.error = action.payload?.msg || 'Échec de la récupération des examens';
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
        state.error = action.payload?.msg || 'Échec de la récupération des examens par classe';
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
        state.error = action.payload?.msg || 'Échec de la mise à jour de l\'examen';
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
        state.error = action.payload?.msg || 'Échec de la suppression de l\'examen';
      })
      // Get Exam By ID
      .addCase(getExamById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExamById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentExam = action.payload;
      })
      .addCase(getExamById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || 'Échec de la récupération de l\'examen';
      });
  },
});

// Selectors
export const selectExams = (state) => state.Exams.exams;
export const selectExamsLoading = (state) => state.Exams.loading;
export const selectExamsError = (state) => state.Exams.error;
export const selectCurrentExam = (state) => state.Exams.currentExam;

export const { clearError, setCurrentExam, clearCurrentExam, clearExams } = examSlice.actions;
export default examSlice.reducer;