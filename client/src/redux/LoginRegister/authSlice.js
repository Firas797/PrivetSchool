import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// ✅ CORRIGÉ: Utiliser l'URL de votre backend
const API_BASE_URL = 'https://57.131.24.227';

// ✅ Configuration de base - CORRIGÉ
axios.defaults.baseURL = API_BASE_URL;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Connexion utilisateur
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://57.131.24.227/user/login', userData);
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem('token', token);
      }

      if (user) localStorage.setItem('user', JSON.stringify(user));

      return { user, token };
    } catch (error) {
      const message = error.response?.data?.msg || 'Échec de la connexion';
      return rejectWithValue({ msg: message });
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
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
    isLoggedIn: !!localStorage.getItem('token'),
    allUsers: [],
    newUsers: [],
    profilePictureLoading: false,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      toast.info('Déconnexion réussie');
    },
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
          state.user.children[childIndex] = {
            ...state.user.children[childIndex],
            ...updates,
          };
          localStorage.setItem('user', JSON.stringify(state.user));
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Connexion
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
        toast.success('Connexion réussie');
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || 'Échec de la connexion';
        toast.error(state.error);
      })

      // Inscription
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
        toast.success('Inscription réussie !');
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || "Échec de l'inscription";
        toast.error(state.error);
      })

      // Récupérer tous les utilisateurs
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || 'Échec de la récupération des utilisateurs';
      })

      // Mettre à jour la photo de profil
      .addCase(updateProfilePicture.pending, (state) => {
        state.profilePictureLoading = true;
      })
      .addCase(updateProfilePicture.fulfilled, (state, action) => {
        state.profilePictureLoading = false;
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
          localStorage.setItem('user', JSON.stringify(state.user));
        }
        toast.success('Photo de profil mise à jour avec succès');
      })
      .addCase(updateProfilePicture.rejected, (state, action) => {
        state.profilePictureLoading = false;
        state.error = action.payload?.msg || 'Échec de la mise à jour de la photo de profil';
        toast.error(state.error);
      })

      // Mettre à jour les informations utilisateur
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        if (state.user) {
          state.user = { ...state.user, ...action.payload.user };
          localStorage.setItem('user', JSON.stringify(state.user));
        }
        toast.success('Profil mis à jour avec succès');
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.error = action.payload?.msg || 'Échec de la mise à jour du profil';
        toast.error(state.error);
      })

      // Actualiser les données utilisateur
      .addCase(refreshUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        if (state.user) localStorage.setItem('user', JSON.stringify(state.user));
      })
      .addCase(refreshUserData.rejected, (state, action) => {
        state.error = action.payload?.msg || 'Échec de la actualisation des données';
      })

      // Récupérer les nouveaux utilisateurs
      .addCase(getNewUsers.fulfilled, (state, action) => {
        state.newUsers = action.payload;
      })
      .addCase(getNewUsers.rejected, (state, action) => {
        state.error = action.payload?.msg || 'Échec de la récupération des nouveaux utilisateurs';
      })

      // Marquer l'utilisateur comme vu
      .addCase(markUserAsSeen.fulfilled, (state, action) => {
        const updatedUser = action.payload.user;
        state.newUsers = state.newUsers.filter(user => user._id !== updatedUser._id);
        toast.success('Utilisateur marqué comme vu');
      })
      .addCase(markUserAsSeen.rejected, (state, action) => {
        state.error = action.payload?.msg || 'Échec du marquage de l\'utilisateur';
        toast.error(state.error);
      })

      // Mettre à jour le score du quiz
      .addCase(updateQuizScore.fulfilled, (state, action) => {
        if (state.user) {
          state.user.quizScores = action.payload.quizScores;
          localStorage.setItem('user', JSON.stringify(state.user));
        }
        toast.success('Score mis à jour avec succès');
      })
      .addCase(updateQuizScore.rejected, (state, action) => {
        state.error = action.payload?.msg || 'Échec de la mise à jour du score';
        toast.error(state.error);
      })

      // Déconnexion
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.info('Déconnexion réussie');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload?.msg || 'Échec de la déconnexion';
        toast.error(state.error);
      });
  },
});

export const {
  clearError,
  updateUserProfile,
  updateChildProfile,
} = authSlice.actions;

export default authSlice.reducer;