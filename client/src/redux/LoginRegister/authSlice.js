import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// ✅ Backend URL - Use the same as your working version
const API_BASE_URL = 'https://privetschool-backend.ohbjmh.easypanel.host';

// ✅ Simple axios setup like your local version
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;

// ✅ Simple request interceptor like your local version
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ------------------------ THUNKS ------------------------ //

// ✅ Login user - MATCHES YOUR LOCAL VERSION
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/user/login', userData);
      console.log('🔐 Login Response:', response.data); // Debug log
      
      // ✅ Handle both response structures like your local version
      const { access_token, token, user } = response.data;

      // ✅ Use the same logic as your working local version
      const finalToken = access_token || token;
      
      if (finalToken) {
        localStorage.setItem('token', finalToken);
      }

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }

      return { 
        user, 
        token: finalToken 
      };
    } catch (error) {
      console.error('❌ Login Error:', error.response?.data);
      return rejectWithValue(error.response?.data || { msg: 'Login failed' });
    }
  }
);

// ✅ Register user - MATCHES YOUR LOCAL VERSION
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/user/register', userData);
      console.log('📝 Register Response:', response.data); // Debug log
      
      // ✅ Handle both response structures
      const { access_token, token, user } = response.data;

      const finalToken = access_token || token;

      if (finalToken) {
        localStorage.setItem('token', finalToken);
      }

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }

      return { user, token: finalToken };
    } catch (error) {
      const message =
        error.response?.data?.msg || error.response?.data?.message || 'Registration failed';
      return rejectWithValue({ msg: message });
    }
  }
);

// ✅ Logout - SIMPLIFIED
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/user/logout');
      
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      return response.data;
    } catch (error) {
      console.error('❌ Logout Error:', error);
      
      // Clear localStorage even if server logout fails
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      return rejectWithValue({ 
        msg: error.response?.data?.msg || 'Logout completed locally' 
      });
    }
  }
);

// ✅ Get user info
export const getUserInfo = createAsyncThunk(
  'auth/getUserInfo',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/user/infor');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { msg: 'Failed to get user info' });
    }
  }
);

// ✅ Refresh token - MATCHES LOCAL VERSION STRUCTURE
export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/user/refresh_token');
      const { access_token, token, user } = response.data;

      const finalToken = access_token || token;

      if (finalToken) {
        localStorage.setItem('token', finalToken);
      }
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }

      return { token: finalToken, user };
    } catch (error) {
      return rejectWithValue(error.response?.data || { msg: 'Token refresh failed' });
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
      console.error('Upload error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { msg: 'Profile picture update failed' });
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

// ✅ Get new users
export const getNewUsers = createAsyncThunk(
  'auth/getNewUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/user/new-inscriptions');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { msg: 'Failed to get new users' });
    }
  }
);

// ✅ Mark user as seen
export const markUserAsSeen = createAsyncThunk(
  'auth/markUserAsSeen',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/user/mark-user-reviewed/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { msg: 'Failed to mark user as seen' });
    }
  }
);

// ✅ Update quiz score
export const updateQuizScore = createAsyncThunk(
  'auth/updateQuizScore',
  async (quizData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/user/update_quiz_score', quizData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { msg: 'Failed to update quiz score' });
    }
  }
);

// ✅ Refresh user data
export const refreshUserData = createAsyncThunk(
  'auth/refreshUserData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/user/infor');
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data || null;
    } catch (error) {
      return rejectWithValue(error.response?.data || { msg: 'Failed to refresh user data' });
    }
  }
);

// ------------------------ SLICE ------------------------ //

// ✅ Safe localStorage parser
const getSafeUserFromStorage = () => {
  try {
    const userStr = localStorage.getItem('user');
    if (userStr && userStr !== 'undefined' && userStr !== 'null') {
      return JSON.parse(userStr);
    }
    return null;
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
    localStorage.removeItem('user');
    return null;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    // ✅ Safe initialization
    user: getSafeUserFromStorage(),
    token: localStorage.getItem('token') || null,
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
        try {
          localStorage.setItem('user', JSON.stringify(state.user));
        } catch (error) {
          console.error('Error saving user to localStorage:', error);
        }
      }
    },
    updateChildProfile: (state, action) => {
      const { childId, updates } = action.payload;
      if (state.user?.children) {
        const childIndex = state.user.children.findIndex((child) => child._id === childId);
        if (childIndex !== -1) {
          state.user.children[childIndex] = { ...state.user.children[childIndex], ...updates };
          try {
            localStorage.setItem('user', JSON.stringify(state.user));
          } catch (error) {
            console.error('Error saving user to localStorage:', error);
          }
        }
      }
    },
    // ✅ Add manual logout action
    manualLogout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      toast.info('Logged out successfully');
    },
  },
  extraReducers: (builder) => {
    builder
      // Login - MATCHES LOCAL VERSION
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        if (state.user) {
          try {
            localStorage.setItem('user', JSON.stringify(state.user));
          } catch (error) {
            console.error('Error saving user to localStorage:', error);
          }
        }
        toast.success('Logged in successfully');
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || 'Login failed';
        toast.error(state.error);
      })

      // Register - MATCHES LOCAL VERSION
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        if (state.user) {
          try {
            localStorage.setItem('user', JSON.stringify(state.user));
          } catch (error) {
            console.error('Error saving user to localStorage:', error);
          }
        }
        toast.success('Registration successful!');
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
        toast.info('Logged out successfully');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        // Still clear state even if server logout fails
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        state.error = action.payload?.msg;
        toast.info('Logged out locally');
      })

      // ... rest of your extraReducers
  },
});

export const { 
  clearError, 
  updateUserProfile, 
  updateChildProfile,
  manualLogout 
} = authSlice.actions;

export default authSlice.reducer;