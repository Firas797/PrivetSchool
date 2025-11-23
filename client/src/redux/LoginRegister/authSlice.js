import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// ✅ Base setup
axios.defaults.baseURL = '/'; // change if needed, e.g., 'http://localhost:5000'
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Login user
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

// ✅ Register user
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/user/register', userData);
      const { access_token, user } = response.data;

      if (access_token) localStorage.setItem('token', access_token);
      else if (response.data.token) localStorage.setItem('token', response.data.token);

      if (user) localStorage.setItem('user', JSON.stringify(user)); // save user

      return { user, token: access_token || response.data.token };
    } catch (error) {
      const message =
        error.response?.data?.msg || error.response?.data?.message || 'Registration failed';
      return rejectWithValue({ msg: message });
    }
  }
);

// ✅ Fetch all users (protected)
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
      console.error('Upload error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { msg: 'Profile picture update failed' });
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
      if (user) localStorage.setItem('user', JSON.stringify(user)); // save refreshed user

      return { token: access_token, user };
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
  logoutUser,
  clearError,
  updateUserProfile,
  updateChildProfile,
} = authSlice.actions;

export default authSlice.reducer;
