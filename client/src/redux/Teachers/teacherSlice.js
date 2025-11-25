// src/redux/Teachers/teacherSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// ✅ CORRIGÉ: Utiliser l'URL de votre backend
const API_BASE_URL = 'http://57.131.24.227';

// ========================
// 🔹 AUTH THUNKS
// ========================

// Login Teacher
export const loginTeacher = createAsyncThunk(
  'auth/loginTeacher',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/teachers/loginTeacher`, userData);
      const { token, teacher } = response.data;
      localStorage.setItem('token', token);
      toast.success('Connexion enseignant réussie');
      return teacher;
    } catch (error) {
      toast.error('Échec de la connexion enseignant');
      return rejectWithValue(error.response?.data || { msg: 'Échec de la connexion enseignant' });
    }
  }
);

// Register Teacher
export const registerTeacher = createAsyncThunk(
  'auth/registerTeacher',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/teachers/registerTeacher`, userData);
      const { token, teacher } = response.data;
      localStorage.setItem('token', token);
      toast.success('Inscription enseignant réussie');
      return teacher;
    } catch (error) {
      toast.error('Échec de l\'inscription enseignant');
      return rejectWithValue(error.response?.data || { msg: 'Échec de l\'inscription enseignant' });
    }
  }
);

// Get Students by Teacher
export const getStudentsByTeacher = createAsyncThunk(
  'teacher/getStudentsByTeacher',
  async (teacherId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.get(`${API_BASE_URL}/teachers/students?teacherId=${teacherId}`, config);
      console.log("Réponse du serveur:", response.data);
      return response.data; 
    } catch (error) {
      console.error(error.response?.data);
      return rejectWithValue(error.response?.data || { msg: 'Échec de la récupération des étudiants' });
    }
  }
);

// ========================
// 🔹 TEACHER MANAGEMENT THUNKS
// ========================

// Get all teachers
export const getAllTeachers = createAsyncThunk(
  'teachers/getAllTeachers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/teachers/getAllTeachers`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { msg: 'Échec de la récupération des enseignants' });
    }
  }
);

// Update a teacher
export const updateTeacher = createAsyncThunk(
  'teachers/updateTeacher',
  async ({ id, teacherData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/teachers/updateTeacher/${id}`, teacherData);
      toast.success('Enseignant mis à jour avec succès');
      return response.data;
    } catch (error) {
      toast.error('Échec de la mise à jour de l\'enseignant');
      return rejectWithValue(error.response?.data || { msg: 'Échec de la mise à jour de l\'enseignant' });
    }
  }
);

// Delete a teacher
export const deleteTeacher = createAsyncThunk(
  'teachers/deleteTeacher',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/teachers/deleteTeacher/${id}`);
      toast.success('Enseignant supprimé avec succès');
      return response.data;
    } catch (error) {
      toast.error('Échec de la suppression de l\'enseignant');
      return rejectWithValue(error.response?.data || { msg: 'Échec de la suppression de l\'enseignant' });
    }
  }
);

// ========================
// 🧩 QUIZ CREATION THUNK
// ========================
export const createQuiz = createAsyncThunk(
  'quizzes/createQuiz',
  async (quizData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      console.log('🔄 Envoi de la requête de création de quiz...', quizData);
      
      const config = {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      
      const response = await axios.post(`${API_BASE_URL}/api/quizzes/createQuiz`, quizData, config);
      console.log('✅ Réponse création quiz:', response.data);
      toast.success('Quiz créé avec succès');
      return response.data.quiz;
    } catch (error) {
      console.error('❌ Erreur création quiz:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      toast.error('Échec de la création du quiz');
      return rejectWithValue(error.response?.data || { error: 'Erreur réseau' });
    }
  }
);

// ========================
// 🔹 ADDITIONAL TEACHER THUNKS
// ========================

// Get teacher by ID
export const getTeacherById = createAsyncThunk(
  'teachers/getTeacherById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/teachers/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { msg: 'Échec de la récupération de l\'enseignant' });
    }
  }
);

// Update teacher profile
export const updateTeacherProfile = createAsyncThunk(
  'teachers/updateTeacherProfile',
  async (teacherData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      const response = await axios.put(`${API_BASE_URL}/teachers/profile`, teacherData, config);
      toast.success('Profil enseignant mis à jour avec succès');
      return response.data;
    } catch (error) {
      toast.error('Échec de la mise à jour du profil');
      return rejectWithValue(error.response?.data || { msg: 'Échec de la mise à jour du profil' });
    }
  }
);

// ========================
// 🔹 SLICE
// ========================
const teacherSlice = createSlice({
  name: 'teacher',
  initialState: {
    teacher: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
    isLogedIn: false,
    teachers: [],
    students: [],
    
    // Quiz state
    quizLoading: false,
    quizError: null,
    quizSuccess: false,
    createdQuiz: null,
  },
  reducers: {
    logoutTeacher: (state) => {
      state.teacher = null;
      state.token = null;
      state.isLogedIn = false;
      localStorage.removeItem('token');
      toast.info('Enseignant déconnecté');
    },
    resetQuizState: (state) => {
      state.quizLoading = false;
      state.quizError = null;
      state.quizSuccess = false;
      state.createdQuiz = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearStudents: (state) => {
      state.students = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // ======================
      // LOGIN
      // ======================
      .addCase(loginTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.teacher = action.payload;
        state.token = localStorage.getItem('token');
        state.isLogedIn = true;
      })
      .addCase(loginTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || 'Échec de la connexion enseignant';
      })
      
      // ======================
      // REGISTER
      // ======================
      .addCase(registerTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.teacher = action.payload;
        state.token = localStorage.getItem('token');
        state.isLogedIn = true;
      })
      .addCase(registerTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || 'Échec de l\'inscription enseignant';
      })
      
      // ======================
      // GET ALL TEACHERS
      // ======================
      .addCase(getAllTeachers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers = action.payload;
      })
      .addCase(getAllTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || 'Échec de la récupération des enseignants';
      })
      
      // ======================
      // UPDATE TEACHER
      // ======================
      .addCase(updateTeacher.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.teachers.findIndex(t => t._id === action.payload._id);
        if (index !== -1) state.teachers[index] = action.payload;
      })
      .addCase(updateTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || 'Échec de la mise à jour de l\'enseignant';
      })
      
      // ======================
      // DELETE TEACHER
      // ======================
      .addCase(deleteTeacher.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers = state.teachers.filter(t => t._id !== action.meta.arg);
      })
      .addCase(deleteTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || 'Échec de la suppression de l\'enseignant';
      })
      
      // ======================
      // CREATE QUIZ
      // ======================
      .addCase(createQuiz.pending, (state) => {
        state.quizLoading = true;
        state.quizError = null;
        state.quizSuccess = false;
      })
      .addCase(createQuiz.fulfilled, (state, action) => {
        state.quizLoading = false;
        state.quizSuccess = true;
        state.createdQuiz = action.payload;
      })
      .addCase(createQuiz.rejected, (state, action) => {
        state.quizLoading = false;
        state.quizError = action.payload?.error || 'Échec de la création du quiz';
      })
      
      // ======================
      // GET STUDENTS BY TEACHER
      // ======================
      .addCase(getStudentsByTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentsByTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(getStudentsByTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || 'Échec de la récupération des étudiants';
      })
      
      // ======================
      // GET TEACHER BY ID
      // ======================
      .addCase(getTeacherById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTeacherById.fulfilled, (state, action) => {
        state.loading = false;
        state.teacher = action.payload;
      })
      .addCase(getTeacherById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || 'Échec de la récupération de l\'enseignant';
      })
      
      // ======================
      // UPDATE TEACHER PROFILE
      // ======================
      .addCase(updateTeacherProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTeacherProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.teacher = action.payload;
      })
      .addCase(updateTeacherProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || 'Échec de la mise à jour du profil';
      });
  },
});

export const { logoutTeacher, resetQuizState, clearError, clearStudents } = teacherSlice.actions;
export default teacherSlice.reducer;