import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// If you can't import directly, recreate the axiosInstance here:
const API_BASE_URL = 'https://privetschool-backend.ohbjmh.easypanel.host';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Thunk for fetching homework
export const fetchHomeWorks = createAsyncThunk(
  'homeWorks/fetchHomeWorks', 
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/homeworks/getAllHw');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { msg: 'Échec de la récupération des devoirs' });
    }
  }
);

// Thunk for adding homework
export const addHomeWorkAsync = createAsyncThunk(
  'homeWorks/addHomeWork', 
  async (homeWorkData, { rejectWithValue }) => {
    try {
      const { title, classe, description, category } = homeWorkData;
      const response = await axiosInstance.post('/api/homeworks/createHw', { 
        title, 
        classe, 
        description, 
        category 
      });
      toast.success('Devoir ajouté avec succès');
      return response.data.homeWork;
    } catch (error) {
      toast.error('Échec de l\'ajout du devoir');
      return rejectWithValue(error.response?.data || { msg: 'Échec de l\'ajout du devoir' });
    }
  }
);

// Thunk for fetching homework by class
export const fetchHomeWorksByClass = createAsyncThunk(
  'homeWorks/fetchHomeWorksByClass',
  async (classNumber, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/homeworks/by-class/${classNumber}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { msg: 'Erreur lors de la récupération des devoirs' });
    }
  }
);

// Thunk for updating homework
export const updateHomeWorkAsync = createAsyncThunk(
  'homeWorks/updateHomeWork',
  async ({ id, homeWorkData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/homeworks/updateHw/${id}`, homeWorkData);
      toast.success('Devoir mis à jour avec succès');
      return response.data.homeWork;
    } catch (error) {
      toast.error('Échec de la mise à jour du devoir');
      return rejectWithValue(error.response?.data || { msg: 'Échec de la mise à jour du devoir' });
    }
  }
);

// Thunk for deleting homework
export const deleteHomeWorkAsync = createAsyncThunk(
  'homeWorks/deleteHomeWork',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/homeworks/deleteHw/${id}`);
      toast.success('Devoir supprimé avec succès');
      return id;
    } catch (error) {
      toast.error('Échec de la suppression du devoir');
      return rejectWithValue(error.response?.data || { msg: 'Échec de la suppression du devoir' });
    }
  }
);

const initialState = {
  homeWorks: [],
  loading: false,
  error: null,
};

const homeWorkSlice = createSlice({
  name: 'homeWorks',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearHomeWorks: (state) => {
      state.homeWorks = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all homeworks
      .addCase(fetchHomeWorks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeWorks.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.homeWorks = action.payload;
      })
      .addCase(fetchHomeWorks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || 'Erreur lors de la récupération des devoirs';
      })
      
      // Add homework
      .addCase(addHomeWorkAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addHomeWorkAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.homeWorks.push(action.payload);
      })
      .addCase(addHomeWorkAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || 'Erreur lors de l\'ajout du devoir';
      })
      
      // Fetch homeworks by class
      .addCase(fetchHomeWorksByClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeWorksByClass.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.homeWorks = action.payload;
      })
      .addCase(fetchHomeWorksByClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || 'Erreur lors de la récupération des devoirs par classe';
      })
      
      // Update homework
      .addCase(updateHomeWorkAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHomeWorkAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.homeWorks.findIndex(hw => hw._id === action.payload._id);
        if (index !== -1) {
          state.homeWorks[index] = action.payload;
        }
      })
      .addCase(updateHomeWorkAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || 'Erreur lors de la mise à jour du devoir';
      })
      
      // Delete homework
      .addCase(deleteHomeWorkAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHomeWorkAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.homeWorks = state.homeWorks.filter(hw => hw._id !== action.payload);
      })
      .addCase(deleteHomeWorkAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || 'Erreur lors de la suppression du devoir';
      });
  },
});

export const { clearError, clearHomeWorks } = homeWorkSlice.actions;

export const selectHomeWorks = (state) => state.homeWork.homeWorks;
export const selectHomeWorksLoading = (state) => state.homeWork.loading;
export const selectHomeWorksError = (state) => state.homeWork.error;

export default homeWorkSlice.reducer;