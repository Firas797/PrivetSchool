// src/redux/Teachers/teacherSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ========================
// 🔹 AUTH THUNKS
// ========================

// Login Teacher
export const loginTeacher = createAsyncThunk(
  'auth/loginTeacher',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/teachers/loginTeacher', userData);
      const { token, teacher } = response.data; // <-- corrected key
      localStorage.setItem('token', token);
      return teacher; // return teacher object
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Register Teacher
export const registerTeacher = createAsyncThunk(
  'auth/registerTeacher',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/teachers/registerTeacher', userData);
      const { token, teacher } = response.data;
      localStorage.setItem('token', token);
      return teacher;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getStudentsByTeacher = createAsyncThunk(
  'teacher/getStudentsByTeacher',
  async (teacherId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.get(`/teachers/students?teacherId=${teacherId}`, config);
      console.log("Response from server:", response.data); // ✅ check server response
      return response.data; 
    } catch (error) {
      console.error(error.response?.data);
      return rejectWithValue(error.response.data);
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
      const response = await axios.get('/teachers/getAllTeachers');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update a teacher
export const updateTeacher = createAsyncThunk(
  'teachers/updateTeacher',
  async ({ id, teacherData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/teachers/updateTeacher/${id}`, teacherData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a teacher
export const deleteTeacher = createAsyncThunk(
  'teachers/deleteTeacher',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/teachers/deleteTeacher/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ========================
// 🧩 QUIZ CREATION THUNK
// ========================
// In teacherSlice.js - UPDATE the createQuiz thunk
export const createQuiz = createAsyncThunk(
  'quizzes/createQuiz',
  async (quizData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      console.log('🔄 Sending quiz creation request...', quizData);
      
      const config = {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      
      const response = await axios.post('/api/quizzes/createQuiz', quizData, config);
      console.log('✅ Quiz creation response:', response.data);
      return response.data.quiz;
    } catch (error) {
      console.error('❌ Quiz creation error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      return rejectWithValue(error.response?.data || { error: 'Network error' });
    }
  }
);
// ========================
// 🔹 SLICE
// ========================
const teacherSlice = createSlice({
  name: 'teacher',
  initialState: {
    teacher: null, // logged-in teacher info
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
    isLogedIn: false,
    teachers: [], // all teachers
      students: [],  // ✅ new state for students

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
    },
    resetQuizState: (state) => {
      state.quizLoading = false;
      state.quizError = null;
      state.quizSuccess = false;
      state.createdQuiz = null;
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
        state.teacher = action.payload; // now teacher info is stored
        state.token = localStorage.getItem('token');
        state.isLogedIn = true;
      })
      .addCase(loginTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg || 'Login failed';
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
        state.error = action.payload.msg || 'Registration failed';
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
        state.error = action.payload.msg || 'Failed to fetch teachers';
      })
      // ======================
      // UPDATE TEACHER
      // ======================
      .addCase(updateTeacher.fulfilled, (state, action) => {
        const index = state.teachers.findIndex(t => t._id === action.payload._id);
        if (index !== -1) state.teachers[index] = action.payload;
      })
      // ======================
      // DELETE TEACHER
      // ======================
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.teachers = state.teachers.filter(t => t._id !== action.meta.arg);
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
        state.quizError = action.payload?.error || 'Failed to create quiz';
      }).addCase(getStudentsByTeacher.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(getStudentsByTeacher.fulfilled, (state, action) => {
  state.loading = false;
  state.students = action.payload;
})
.addCase(getStudentsByTeacher.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload?.msg || 'Failed to fetch students';
});
  },
});

export const { logoutTeacher, resetQuizState } = teacherSlice.actions;
export default teacherSlice.reducer;
