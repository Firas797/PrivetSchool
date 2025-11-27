import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// ✅ CORRIGÉ: Utiliser l'URL de votre backend
const API_BASE_URL = 'https://privetschool-backend.ohbjmh.easypanel.host';
// Create axios instance with proper configuration
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// FIXED Request interceptor - this is CRITICAL
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('🔐 Interceptor - Token from localStorage:', token);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('✅ Authorization header set:', config.headers.Authorization);
    } else {
      console.log('❌ No token found in localStorage');
    }
    
    console.log('🚀 Making request to:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Use this axiosInstance for ALL your API calls
export const getUserInfo = createAsyncThunk(
  'auth/getUserInfo',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/user/infor');
      return response.data;
    } catch (error) {
      console.log('❌ getUserInfo failed:', error.response?.data);
      return rejectWithValue({ msg: error.response?.data?.msg || 'Failed to get user info' });
    }
  }
);

// ✅ Connexion utilisateur
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/user/login', userData);
      const { access_token, user } = response.data;

      if (access_token) {
        localStorage.setItem('token', access_token);
      } else if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      if (user) localStorage.setItem('user', JSON.stringify(user)); // save user

      return { user, token: access_token || response.data.token };
    } catch (error) {
      return rejectWithValue(error.response?.data || { msg: 'Login failed' });
    }
  }
);


// ✅ Inscription utilisateur
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/user/register', userData);
      const { token, user } = response.data;

      if (token) localStorage.setItem('token', token);

      if (user) localStorage.setItem('user', JSON.stringify(user));

      return { user, token };
    } catch (error) {
      const message =
        error.response?.data?.msg || error.response?.data?.message || "Échec de l'inscription";
      return rejectWithValue({ msg: message });
    }
  }
);

// ✅ Récupérer tous les utilisateurs (protégé)
export const fetchAllUsers = createAsyncThunk(
  'auth/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/user/all_users');
      return response.data;
    } catch (error) {
      return rejectWithValue({ msg: 'Échec de la récupération des utilisateurs' });
    }
  }
);

// ✅ Mettre à jour la photo de profil
export const updateProfilePicture = createAsyncThunk(
  'auth/updateProfilePicture',
  async ({ formData, childId = null }, { rejectWithValue }) => {
    try {
      const url = childId
        ? `/user/update-child-profile-picture/${childId}`
        : '/user/update-profile-picture';

      const response = await axios.patch(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return { ...response.data, childId };
    } catch (error) {
      console.error('Erreur upload:', error.response?.data || error.message);
      return rejectWithValue({ msg: 'Échec de la mise à jour de la photo de profil' });
    }
  }
);

// ✅ Actualiser le token
export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/user/refresh_token');
      const { token, user } = response.data;

      if (token) localStorage.setItem('token', token);
      if (user) localStorage.setItem('user', JSON.stringify(user));

      return { token, user };
    } catch (error) {
      return rejectWithValue({ msg: 'Échec de la actualisation du token' });
    }
  }
);

// ✅ Mettre à jour les informations utilisateur
export const updateUserInfo = createAsyncThunk(
  'auth/updateUserInfo',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.patch('/user/update', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue({ msg: 'Échec de la mise à jour' });
    }
  }
);

// ✅ Actualiser les données utilisateur
export const refreshUserData = createAsyncThunk(
  'auth/refreshUserData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/user/infor');
      if (response.data) localStorage.setItem('user', JSON.stringify(response.data)); 
      return response.data || null;
    } catch (error) {
      return rejectWithValue({ msg: 'Échec de la actualisation des données utilisateur' });
    }
  }
);

// ✅ Récupérer les nouveaux utilisateurs (pour admin)
export const getNewUsers = createAsyncThunk(
  'auth/getNewUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/user/new-inscriptions');
      return response.data;
    } catch (error) {
      return rejectWithValue({ msg: 'Échec de la récupération des nouveaux utilisateurs' });
    }
  }
);

// ✅ Marquer l'utilisateur comme vu
export const markUserAsSeen = createAsyncThunk(
  'auth/markUserAsSeen',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/user/mark-user-reviewed/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue({ msg: 'Échec du marquage de l\'utilisateur' });
    }
  }
);

// ✅ Mettre à jour le score du quiz
export const updateQuizScore = createAsyncThunk(
  'auth/updateQuizScore',
  async (quizData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/user/update_quiz_score', quizData);
      return response.data;
    } catch (error) {
      return rejectWithValue({ msg: 'Échec de la mise à jour du score' });
    }
  }
);

// ✅ Déconnexion utilisateur
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/user/logout');
      return response.data;
    } catch (error) {
      return rejectWithValue({ msg: 'Échec de la déconnexion' });
    }
  }
);

// ✅ Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null, // load user from localStorage
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
    isLoggedIn: !!localStorage.getItem('token'),
    allUsers: [],
    profilePictureLoading: false,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user'); // remove user
      toast.info('Logged out successfully');
    },
    clearError: (state) => {
      state.error = null;
    },
    updateUserProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('user', JSON.stringify(state.user)); // update localStorage
      }
    },
    updateChildProfile: (state, action) => {
      const { childId, updates } = action.payload;
      if (state.user?.children) {
        const childIndex = state.user.children.findIndex((child) => child._id === childId);
        if (childIndex !== -1) {
          state.user.children[childIndex] = {
            ...state.user.children[childIndex],
            ...updates,
          };
          localStorage.setItem('user', JSON.stringify(state.user)); // update localStorage
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        if (state.user) localStorage.setItem('user', JSON.stringify(state.user));
        toast.success('Logged in successfully');
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || 'Login failed';
        toast.error(state.error);
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        if (state.user) localStorage.setItem('user', JSON.stringify(state.user));
        toast.success('Registration successful!');
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || 'Registration failed';
        toast.error(state.error);
      })

      // Fetch all users
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || 'Fetching users failed';
      })

      // Update profile picture
      .addCase(updateProfilePicture.fulfilled, (state, action) => {
        const { profilePicture, childId } = action.payload;
        if (state.user) {
          if (childId && state.user.children) {
            const childIndex = state.user.children.findIndex((child) => child._id === childId);
            if (childIndex !== -1) {
              state.user.children[childIndex].profilePicture = profilePicture;
            }
          } else {
            state.user.profilePicture = profilePicture;
          }
          localStorage.setItem('user', JSON.stringify(state.user)); // save user
        }
        toast.success('Profile picture updated successfully');
      })
      .addCase(updateProfilePicture.rejected, (state, action) => {
        state.error = action.payload?.msg || 'Failed to update profile picture';
        toast.error(state.error);
      })

      // Update user info
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        if (state.user) {
          state.user = { ...state.user, ...action.payload.user };
          localStorage.setItem('user', JSON.stringify(state.user));
        }
        toast.success('Profile updated successfully');
      })

      // Refresh user data
      .addCase(refreshUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        if (state.user) localStorage.setItem('user', JSON.stringify(state.user));
      });
  },
});

export const {
  clearError,
  updateUserProfile,
  updateChildProfile,
} = authSlice.actions;

export default authSlice.reducer;