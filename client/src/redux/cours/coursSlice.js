import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// ✅ CORRIGÉ: Utiliser l'URL de votre backend
const API_BASE_URL = 'https://57.131.24.227';

// Fetch all courses
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/courses`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { msg: 'Échec de la récupération des cours' });
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

      const response = await axios.post(`${API_BASE_URL}/api/courses/createCourse`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Cours ajouté avec succès');
      return response.data.course;
    } catch (error) {
      toast.error('Échec de l\'ajout du cours');
      return rejectWithValue(error.response?.data || { msg: 'Échec de l\'ajout du cours' });
    }
  }
);

// Update a course
export const updateCourseAsync = createAsyncThunk(
  'courses/updateCourse',
  async ({ id, courseData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('Title', courseData.Title);
      formData.append('classe', courseData.classe);
      formData.append('description', courseData.description);
      formData.append('category', courseData.category);

      if (courseData.urlVid) formData.append('urlVid', courseData.urlVid);
      if (courseData.pdfFile) formData.append('pdfFile', courseData.pdfFile);

      const response = await axios.put(`${API_BASE_URL}/api/courses/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Cours mis à jour avec succès');
      return response.data.course;
    } catch (error) {
      toast.error('Échec de la mise à jour du cours');
      return rejectWithValue(error.response?.data || { msg: 'Échec de la mise à jour du cours' });
    }
  }
);

// Delete a course
export const deleteCourseAsync = createAsyncThunk(
  'courses/deleteCourse',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/courses/${id}`);
      toast.success('Cours supprimé avec succès');
      return id;
    } catch (error) {
      toast.error('Échec de la suppression du cours');
      return rejectWithValue(error.response?.data || { msg: 'Échec de la suppression du cours' });
    }
  }
);

// Fetch courses by class
export const fetchCoursesByClass = createAsyncThunk(
  'courses/fetchCoursesByClass',
  async (classNumber, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/courses/class/${classNumber}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { msg: 'Échec de la récupération des cours par classe' });
    }
  }
);

// Fetch courses by category
export const fetchCoursesByCategory = createAsyncThunk(
  'courses/fetchCoursesByCategory',
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/courses/category/${category}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { msg: 'Échec de la récupération des cours par catégorie' });
    }
  }
);

// Get single course by ID
export const fetchCourseById = createAsyncThunk(
  'courses/fetchCourseById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/courses/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { msg: 'Échec de la récupération du cours' });
    }
  }
);

const initialState = {
  courses: [],
  currentCourse: null,
  loading: false,
  error: null,
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentCourse: (state) => {
      state.currentCourse = null;
    },
    clearCourses: (state) => {
      state.courses = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all courses
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
        state.error = action.payload?.msg || 'Échec de la récupération des cours';
      })
      
      // Add course
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
        state.error = action.payload?.msg || 'Échec de l\'ajout du cours';
      })
      
      // Update course
      .addCase(updateCourseAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCourseAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.courses.findIndex(course => course._id === action.payload._id);
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
      })
      .addCase(updateCourseAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || 'Échec de la mise à jour du cours';
      })
      
      // Delete course
      .addCase(deleteCourseAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCourseAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = state.courses.filter(course => course._id !== action.payload);
      })
      .addCase(deleteCourseAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || 'Échec de la suppression du cours';
      })
      
      // Fetch courses by class
      .addCase(fetchCoursesByClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoursesByClass.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCoursesByClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || 'Échec de la récupération des cours par classe';
      })
      
      // Fetch courses by category
      .addCase(fetchCoursesByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoursesByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCoursesByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || 'Échec de la récupération des cours par catégorie';
      })
      
      // Fetch course by ID
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCourse = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || 'Échec de la récupération du cours';
      });
  },
});

export const { clearError, clearCurrentCourse, clearCourses } = courseSlice.actions;

export const selectCourses = (state) => state.courses.courses;
export const selectCurrentCourse = (state) => state.courses.currentCourse;
export const selectCoursesLoading = (state) => state.courses.loading;
export const selectCoursesError = (state) => state.courses.error;

export default courseSlice.reducer;