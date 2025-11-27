import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// ✅ Backend URL
const API_BASE_URL = 'https://privetschool-backend.ohbjmh.easypanel.host';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // This is important for cookies
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    // ✅ FIX: Check if token exists and isn't the test token
    if (token && token !== '"test-token-direct"') {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ------------------------ THUNKS ------------------------ //

// Utility to sanitize token before saving
const sanitizeToken = (token) => token?.replace(/^"|"$/g, '') || null;

// Get user info
export const getUserInfo = createAsyncThunk(
  'auth/getUserInfo',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/user/infor');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { msg: 'Failed to get user info' });
    }
  }
);

// Login user
// Login user - SIMPLER VERSION
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      console.log('🔄 Sending login request...', userData);
      const response = await axiosInstance.post('/user/login', userData);
      console.log('🔐 Login Response:', response.data);
      
      const token = response.data.token;
      
      if (!token) {
        throw new Error('No token received from server');
      }
      
      // ✅ FIX: Create user object safely
      const user = response.data.user || {
        _id: 'temp-id',
        email: userData.email,
        parentName: 'User',
        isTemp: true
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      localStorage.setItem('isLoggedIn', 'true');
      
      console.log('✅ Token stored:', token);
      console.log('✅ User stored:', user);
      
      return { token, user };
      
    } catch (error) {
      console.error('❌ Login Error:', error.response?.data || error.message);
      return rejectWithValue({ 
        msg: error.response?.data?.msg || 'Échec de la connexion' 
      });
    }
  }
);

// Register user
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/user/register', userData);
      const { token, user } = response.data;

      const sanitizedToken = sanitizeToken(token);

      if (sanitizedToken) localStorage.setItem('token', sanitizedToken);
      if (user) localStorage.setItem('user', JSON.stringify(user));

      return { token: sanitizedToken, user };
    } catch (error) {
      return rejectWithValue({ msg: error.response?.data?.msg || "Échec de l'inscription" });
    }
  }
);

// Logout
// Logout - FIXED (using GET)
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      // ✅ FIX: Using GET to match your backend route
      const response = await axiosInstance.get('/user/logout');
      
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.setItem('isLoggedIn', 'false');
      
      return response.data;
    } catch (error) {
      console.error('❌ Logout Error:', error);
      
      // Even if server logout fails, clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.setItem('isLoggedIn', 'false');
      
      return rejectWithValue({ 
        msg: error.response?.data?.msg || 'Déconnexion locale effectuée' 
      });
    }
  }
);
// Refresh token
export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/user/refresh_token');
      const { token, user } = response.data;

      const sanitizedToken = sanitizeToken(token);

      if (sanitizedToken) localStorage.setItem('token', sanitizedToken);
      if (user) localStorage.setItem('user', JSON.stringify(user));

      return { token: sanitizedToken, user };
    } catch (error) {
      return rejectWithValue({ msg: 'Échec de la actualisation du token' });
    }
  }
);

// Update user info
export const updateUserInfo = createAsyncThunk(
  'auth/updateUserInfo',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch('/user/update', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue({ msg: 'Échec de la mise à jour du profil' });
    }
  }
);

// Update profile picture
export const updateProfilePicture = createAsyncThunk(
  'auth/updateProfilePicture',
  async ({ formData, childId = null }, { rejectWithValue }) => {
    try {
      const url = childId
        ? `/user/update-child-profile-picture/${childId}`
        : '/user/update-profile-picture';
      const response = await axiosInstance.patch(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return { ...response.data, childId };
    } catch (error) {
      return rejectWithValue({ msg: 'Échec de la mise à jour de la photo de profil' });
    }
  }
);

// Get all users
export const fetchAllUsers = createAsyncThunk(
  'auth/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/user/all_users');
      return response.data;
    } catch (error) {
      return rejectWithValue({ msg: 'Échec de la récupération des utilisateurs' });
    }
  }
);

// Get new users
export const getNewUsers = createAsyncThunk(
  'auth/getNewUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/user/new-inscriptions');
      return response.data;
    } catch (error) {
      return rejectWithValue({ msg: 'Échec de la récupération des nouveaux utilisateurs' });
    }
  }
);

// Mark user as seen
export const markUserAsSeen = createAsyncThunk(
  'auth/markUserAsSeen',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/user/mark-user-reviewed/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue({ msg: 'Échec du marquage de l\'utilisateur' });
    }
  }
);

// Update quiz score
export const updateQuizScore = createAsyncThunk(
  'auth/updateQuizScore',
  async (quizData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/user/update_quiz_score', quizData);
      return response.data;
    } catch (error) {
      return rejectWithValue({ msg: 'Échec de la mise à jour du score' });
    }
  }
);

// Refresh user data
export const refreshUserData = createAsyncThunk(
  'auth/refreshUserData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/user/infor');
      if (response.data) localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue({ msg: 'Échec de la actualisation des données utilisateur' });
    }
  }
);

// ------------------------ SLICE ------------------------ //

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: sanitizeToken(localStorage.getItem('token')),
    loading: false,
    error: null,
    isLoggedIn: !!localStorage.getItem('token'),
    allUsers: [],
    newUsers: [],
    profilePictureLoading: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateUserProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
    updateChildProfile: (state, action) => {
      const { childId, updates } = action.payload;
      if (state.user?.children) {
        const childIndex = state.user.children.findIndex((child) => child._id === childId);
        if (childIndex !== -1) {
          state.user.children[childIndex] = { ...state.user.children[childIndex], ...updates };
          localStorage.setItem('user', JSON.stringify(state.user));
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        toast.success('Connexion réussie');
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg;
        toast.error(state.error);
      })
      // Register
      .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        toast.success('Inscription réussie !');
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg;
        toast.error(state.error);
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        toast.info('Déconnexion réussie');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload?.msg;
        toast.error(state.error);
      })
      // Update profile picture
      .addCase(updateProfilePicture.pending, (state) => { state.profilePictureLoading = true; })
      .addCase(updateProfilePicture.fulfilled, (state, action) => {
        state.profilePictureLoading = false;
        const { profilePicture, childId } = action.payload;
        if (state.user) {
          if (childId && state.user.children) {
            const childIndex = state.user.children.findIndex((child) => child._id === childId);
            if (childIndex !== -1) state.user.children[childIndex].profilePicture = profilePicture;
          } else state.user.profilePicture = profilePicture;
          localStorage.setItem('user', JSON.stringify(state.user));
        }
        toast.success('Photo de profil mise à jour avec succès');
      })
      .addCase(updateProfilePicture.rejected, (state, action) => {
        state.profilePictureLoading = false;
        state.error = action.payload?.msg;
        toast.error(state.error);
      })
      // Other cases
      .addCase(fetchAllUsers.fulfilled, (state, action) => { state.allUsers = action.payload; })
      .addCase(getNewUsers.fulfilled, (state, action) => { state.newUsers = action.payload; })
      .addCase(markUserAsSeen.fulfilled, (state, action) => {
        const updatedUser = action.payload.user;
        state.newUsers = state.newUsers.filter(u => u._id !== updatedUser._id);
        toast.success('Utilisateur marqué comme vu');
      })
      .addCase(updateQuizScore.fulfilled, (state, action) => {
        if (state.user) { state.user.quizScores = action.payload.quizScores; }
      })
      .addCase(refreshUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        if (state.user) localStorage.setItem('user', JSON.stringify(state.user));
      });
  },
});

export const { clearError, updateUserProfile, updateChildProfile } = authSlice.actions;
export default authSlice.reducer;
