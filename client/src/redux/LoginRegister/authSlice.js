import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// ✅ Backend URL
const API_BASE_URL = 'https://privetschool-backend.ohbjmh.easypanel.host';
axios.defaults.baseURL = API_BASE_URL;

// Request interceptor to attach token
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Safe localStorage parser
const getSafeUserFromStorage = () => {
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    localStorage.removeItem('user');
    return null;
  }
};

// ================== THUNKS ==================

// ✅ Login user
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/user/login', userData);
      const { access_token, token, user } = response.data;
      const finalToken = access_token || token;

      if (!finalToken) throw new Error('No token returned');

      localStorage.setItem('token', finalToken);
      if (user) localStorage.setItem('user', JSON.stringify(user));

      toast.success('Login successful');
      return { user, token: finalToken };
    } catch (error) {
      console.error('Login Error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { msg: 'Login failed' });
    }
  }
);

// ✅ Register user
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/user/register', userData);
      const { access_token, token, user } = response.data;
      const finalToken = access_token || token;

      if (finalToken) localStorage.setItem('token', finalToken);
      if (user) localStorage.setItem('user', JSON.stringify(user));

      toast.success('Registration successful');
      return { user, token: finalToken };
    } catch (error) {
      const message = error.response?.data?.msg || error.response?.data?.message || 'Registration failed';
      return rejectWithValue({ msg: message });
    }
  }
);

// ✅ Refresh token
export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/user/refresh_token');
      const { access_token, user } = response.data;

      if (access_token) localStorage.setItem('token', access_token);
      if (user) localStorage.setItem('user', JSON.stringify(user));

      return { token: access_token, user };
    } catch (error) {
      return rejectWithValue(error.response?.data || { msg: 'Token refresh failed' });
    }
  }
);

// ✅ Fetch all users
export const fetchAllUsers = createAsyncThunk(
  'auth/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/user/all_users');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { msg: 'Fetching users failed' });
    }
  }
);

// ✅ Update profile picture
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
      return rejectWithValue(error.response?.data || { msg: 'Profile picture update failed' });
    }
  }
);

// ✅ Update user info
export const updateUserInfo = createAsyncThunk(
  'auth/updateUserInfo',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.patch('/user/update', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { msg: 'Update failed' });
    }
  }
);

// ✅ Refresh user data
export const refreshUserData = createAsyncThunk(
  'auth/refreshUserData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/user/infor');
      if (response.data) localStorage.setItem('user', JSON.stringify(response.data));
      return response.data || null;
    } catch (error) {
      return rejectWithValue(error.response?.data || { msg: 'Failed to refresh user data' });
    }
  }
);

// ✅ Logout user
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await axios.get('/user/logout').catch(() => null); // optional backend logout
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      toast.info('Logged out successfully');
      return { msg: 'Logged out' };
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return rejectWithValue({ msg: 'Logout completed locally' });
    }
  }
);

// ================== SLICE ==================
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getSafeUserFromStorage(),
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
    isLoggedIn: !!localStorage.getItem('token'),
    allUsers: [],
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
        const index = state.user.children.findIndex((c) => c._id === childId);
        if (index !== -1) {
          state.user.children[index] = { ...state.user.children[index], ...updates };
          localStorage.setItem('user', JSON.stringify(state.user));
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
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || 'Registration failed';
        toast.error(state.error);
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      })

      // Refresh user data
      .addCase(refreshUserData.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      // Fetch all users
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
      });
  },
});

export const { clearError, updateUserProfile, updateChildProfile } = authSlice.actions;
export default authSlice.reducer;
