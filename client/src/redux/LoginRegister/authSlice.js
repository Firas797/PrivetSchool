import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// ✅ Backend URL
const API_BASE_URL = 'https://privetschool-backend.ohbjmh.easypanel.host';
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;

// Request interceptor
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && token !== 'test-token-direct') { // Don't send test token
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Login user - HANDLES TEST RESPONSE
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      console.log('🔄 Attempting login...', userData.email);
      const response = await axios.post('/user/login', userData);
      console.log('🔐 Login Response:', response.data);
      
      // ✅ CHECK FOR TEST RESPONSE
      if (response.data.message && response.data.message.includes('DIRECT ROUTE')) {
        console.warn('⚠️ Backend returning test data - using mock authentication');
        
        // Create mock authenticated state
        const mockUser = {
          _id: 'mock-user-id-' + Date.now(),
          email: userData.email,
          parentName: userData.email.split('@')[0] || 'User',
          isTemp: true,
          isMock: true,
          children: [],
          role: 'parent'
        };
        
        const mockToken = 'mock-token-' + Date.now();
        
        // Store in localStorage
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('isMockUser', 'true'); // Flag for mock user
        
        toast.success('Demo login successful (using test mode)');
        
        return { 
          user: mockUser, 
          token: mockToken 
        };
      }
      
      // ✅ REAL BACKEND RESPONSE
      const { access_token, token, user } = response.data;
      const finalToken = access_token || token;
      
      if (finalToken) {
        localStorage.setItem('token', finalToken);
        localStorage.removeItem('isMockUser'); // Remove mock flag
      }

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }

      toast.success('Login successful');
      return { user, token: finalToken };
      
    } catch (error) {
      console.error('❌ Login Error:', error.response?.data);
      return rejectWithValue(error.response?.data || { msg: 'Login failed' });
    }
  }
);

// ✅ Get user info - SKIPS FOR MOCK USERS
export const getUserInfo = createAsyncThunk(
  'auth/getUserInfo',
  async (_, { rejectWithValue, getState }) => {
    try {
      // Skip API call for mock users
      if (localStorage.getItem('isMockUser') === 'true') {
        console.log('⏩ Skipping user info fetch for mock user');
        return JSON.parse(localStorage.getItem('user'));
      }
      
      const response = await axios.get('/user/infor');
      return response.data;
    } catch (error) {
      console.error('❌ Get User Info Error:', error.response?.status);
      return rejectWithValue(error.response?.data || { msg: 'Failed to get user info' });
    }
  }
);

// ✅ Refresh user data - SKIPS FOR MOCK USERS
export const refreshUserData = createAsyncThunk(
  'auth/refreshUserData',
  async (_, { rejectWithValue }) => {
    try {
      // Skip API call for mock users
      if (localStorage.getItem('isMockUser') === 'true') {
        console.log('⏩ Skipping refresh for mock user');
        return JSON.parse(localStorage.getItem('user'));
      }
      
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

// ✅ Other thunks - SKIP AUTH FOR MOCK USERS
export const fetchAllUsers = createAsyncThunk(
  'auth/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      // Return empty array for mock users
      if (localStorage.getItem('isMockUser') === 'true') {
        console.log('⏩ Returning empty users list for mock user');
        return [];
      }
      
      const response = await axios.get('/user/all_users');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { msg: 'Fetching users failed' });
    }
  }
);

// ✅ Logout - HANDLES MOCK USERS
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      // Only call backend logout for real users
      if (localStorage.getItem('isMockUser') !== 'true') {
        await axios.get('/user/logout');
      }
      
      // Always clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('isMockUser');
      
      toast.info('Logged out successfully');
      return { msg: 'Logged out' };
      
    } catch (error) {
      console.error('❌ Logout Error:', error);
      
      // Still clear localStorage even if error
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('isMockUser');
      
      toast.info('Logged out locally');
      return rejectWithValue({ msg: 'Logout completed locally' });
    }
  }
);

// Safe localStorage parser
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

// ✅ Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getSafeUserFromStorage(),
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
    isLoggedIn: !!localStorage.getItem('token'),
    isMockUser: localStorage.getItem('isMockUser') === 'true',
    allUsers: [],
    newUsers: [],
    profilePictureLoading: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    // Manual logout for mock users
    mockLogin: (state, action) => {
      const { email } = action.payload;
      const mockUser = {
        _id: 'mock-user-id-' + Date.now(),
        email: email,
        parentName: email.split('@')[0] || 'User',
        isTemp: true,
        isMock: true,
        children: [],
        role: 'parent'
      };
      
      const mockToken = 'mock-token-' + Date.now();
      
      state.user = mockUser;
      state.token = mockToken;
      state.isLoggedIn = true;
      state.isMockUser = true;
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('isMockUser', 'true');
      
      toast.success('Demo login activated');
    },
    manualLogout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.isMockUser = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('isMockUser');
      toast.info('Logged out successfully');
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
        state.isMockUser = localStorage.getItem('isMockUser') === 'true';
        
        if (state.user) {
          try {
            localStorage.setItem('user', JSON.stringify(state.user));
          } catch (error) {
            console.error('Error saving user to localStorage:', error);
          }
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || 'Login failed';
        toast.error(state.error);
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        state.isMockUser = false;
      })

      // ... other cases
  },
});

export const { 
  clearError, 
  updateUserProfile, 
  updateChildProfile,
  manualLogout,
  mockLogin 
} = authSlice.actions;

export default authSlice.reducer;