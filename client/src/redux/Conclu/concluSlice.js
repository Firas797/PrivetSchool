// redux/Conclu/concluSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// 📥 Fetch all conclusions
export const fetchConclusions = createAsyncThunk(
  "conclusion/fetchConclusions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Erreur lors du chargement des conclusions.");
    }
  }
);

// ➕ Create new conclusion
export const createConclusion = createAsyncThunk(
  "conclusion/createConclusion",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/conclusions", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("✅ Conclusion ajoutée avec succès !");
      return response.data.data;
    } catch (error) {
      toast.error("❌ Erreur lors de l’ajout de la conclusion !");
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors de la création de la conclusion."
      );
    }
  }
);

// 🗑️ Delete conclusion
export const deleteConclusion = createAsyncThunk(
  "conclusion/deleteConclusion",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/${id}`);
      toast.info("🗑️ Conclusion supprimée !");
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Erreur lors de la suppression.");
    }
  }
);
export const fetchConclusionsByClass = createAsyncThunk(
  "conclusion/fetchConclusionsByClass",
  async (classNumber, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/conclusions/${classNumber}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "خطأ في تحميل الاستنتاجات.");
    }
  }
);

const concluSlice = createSlice({
  name: "conclusion",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // 🧭 Fetch all
      .addCase(fetchConclusions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConclusions.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchConclusions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ➕ Create
      .addCase(createConclusion.pending, (state) => {
        state.loading = true;
      })
      .addCase(createConclusion.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload); // Add to the top of the list
      })
      .addCase(createConclusion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🗑️ Delete
      .addCase(deleteConclusion.fulfilled, (state, action) => {
        state.list = state.list.filter((c) => c._id !== action.payload);
      }).addCase(fetchConclusionsByClass.pending, (state) => {
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
});
  },
});
export const selectConclusions = (state) => state.conclusion.list;
export const selectConclusionsLoading = (state) => state.conclusion.loading;
export const selectConclusionsError = (state) => state.conclusion.error;

export default concluSlice.reducer;
