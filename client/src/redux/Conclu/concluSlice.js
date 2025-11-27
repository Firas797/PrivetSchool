// redux/Conclu/concluSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// ✅ CORRIGÉ: Utiliser l'URL de votre backend
const API_BASE_URL = 'https://57.131.24.227';

// 📥 Récupérer toutes les conclusions
export const fetchConclusions = createAsyncThunk(
  "conclusion/fetchConclusions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/conclusions`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Erreur lors du chargement des conclusions.");
    }
  }
);

// ➕ Créer une nouvelle conclusion
export const createConclusion = createAsyncThunk(
  "conclusion/createConclusion",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/conclusions`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("✅ Conclusion ajoutée avec succès !");
      return response.data.data;
    } catch (error) {
      toast.error("❌ Erreur lors de l'ajout de la conclusion !");
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors de la création de la conclusion."
      );
    }
  }
);

// 🗑️ Supprimer une conclusion
export const deleteConclusion = createAsyncThunk(
  "conclusion/deleteConclusion",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/conclusions/${id}`);
      toast.info("🗑️ Conclusion supprimée !");
      return id;
    } catch (error) {
      toast.error("❌ Erreur lors de la suppression de la conclusion");
      return rejectWithValue(error.response?.data?.message || "Erreur lors de la suppression.");
    }
  }
);

// 📚 Récupérer les conclusions par classe
export const fetchConclusionsByClass = createAsyncThunk(
  "conclusion/fetchConclusionsByClass",
  async (classNumber, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/conclusions/class/${classNumber}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Erreur lors du chargement des conclusions par classe.");
    }
  }
);

// 🔄 Mettre à jour une conclusion
export const updateConclusion = createAsyncThunk(
  "conclusion/updateConclusion",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/conclusions/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("✅ Conclusion mise à jour avec succès !");
      return response.data.data;
    } catch (error) {
      toast.error("❌ Erreur lors de la mise à jour de la conclusion !");
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors de la mise à jour de la conclusion."
      );
    }
  }
);

// 📄 Récupérer une conclusion par ID
export const fetchConclusionById = createAsyncThunk(
  "conclusion/fetchConclusionById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/conclusions/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Erreur lors du chargement de la conclusion.");
    }
  }
);

// 🏷️ Récupérer les conclusions par catégorie
export const fetchConclusionsByCategory = createAsyncThunk(
  "conclusion/fetchConclusionsByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/conclusions/category/${category}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Erreur lors du chargement des conclusions par catégorie.");
    }
  }
);

const concluSlice = createSlice({
  name: "conclusion",
  initialState: {
    list: [],
    currentConclusion: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentConclusion: (state) => {
      state.currentConclusion = null;
    },
    clearConclusions: (state) => {
      state.list = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // 🧭 Récupérer toutes les conclusions
      .addCase(fetchConclusions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConclusions.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchConclusions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ➕ Créer une conclusion
      .addCase(createConclusion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createConclusion.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload); // Ajouter au début de la liste
      })
      .addCase(createConclusion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🗑️ Supprimer une conclusion
      .addCase(deleteConclusion.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteConclusion.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((c) => c._id !== action.payload);
      })
      .addCase(deleteConclusion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 📚 Récupérer les conclusions par classe
      .addCase(fetchConclusionsByClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConclusionsByClass.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchConclusionsByClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔄 Mettre à jour une conclusion
      .addCase(updateConclusion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateConclusion.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(c => c._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateConclusion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 📄 Récupérer une conclusion par ID
      .addCase(fetchConclusionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConclusionById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentConclusion = action.payload;
      })
      .addCase(fetchConclusionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🏷️ Récupérer les conclusions par catégorie
      .addCase(fetchConclusionsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConclusionsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchConclusionsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentConclusion, clearConclusions } = concluSlice.actions;

export const selectConclusions = (state) => state.conclusion.list;
export const selectCurrentConclusion = (state) => state.conclusion.currentConclusion;
export const selectConclusionsLoading = (state) => state.conclusion.loading;
export const selectConclusionsError = (state) => state.conclusion.error;

export default concluSlice.reducer;