import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { materialsAPI, Material, MaterialsResponse } from '../../api/materials';

interface MaterialsState {
  materials: Material[];
  bookmarkedMaterials: Material[];
  recentMaterials: Material[];
  popularMaterials: Material[];
  searchResults: Material[];
  currentMaterial: Material | null;
  isLoading: boolean;
  isSearching: boolean;
  error: string | null;
  searchQuery: string;
  filters: {
    category: string | null;
    type: string | null;
    sortBy: 'date' | 'title' | 'views' | 'downloads';
    sortOrder: 'asc' | 'desc';
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

const initialState: MaterialsState = {
  materials: [],
  bookmarkedMaterials: [],
  recentMaterials: [],
  popularMaterials: [],
  searchResults: [],
  currentMaterial: null,
  isLoading: false,
  isSearching: false,
  error: null,
  searchQuery: '',
  filters: {
    category: null,
    type: null,
    sortBy: 'date',
    sortOrder: 'desc',
  },
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    hasMore: true,
  },
};

// Async thunks
export const fetchMaterials = createAsyncThunk(
  'materials/fetchMaterials',
  async ({ categoryId, page = 1, limit = 20 }: { categoryId?: string; page?: number; limit?: number }) => {
    const response = await materialsAPI.getMaterials({ categoryId, page, limit });
    return response;
  }
);

export const fetchMaterial = createAsyncThunk(
  'materials/fetchMaterial',
  async (materialId: string) => {
    const material = await materialsAPI.getMaterial(materialId);
    return material;
  }
);

export const searchMaterials = createAsyncThunk(
  'materials/searchMaterials',
  async ({ query, filters }: { query: string; filters?: any }) => {
    const response = await materialsAPI.searchMaterials(query, filters);
    return response;
  }
);

export const fetchRecentMaterials = createAsyncThunk(
  'materials/fetchRecentMaterials',
  async (limit = 10) => {
    const materials = await materialsAPI.getRecentMaterials(limit);
    return materials;
  }
);

export const fetchPopularMaterials = createAsyncThunk(
  'materials/fetchPopularMaterials',
  async (limit = 10) => {
    const materials = await materialsAPI.getPopularMaterials(limit);
    return materials;
  }
);

export const fetchBookmarkedMaterials = createAsyncThunk(
  'materials/fetchBookmarkedMaterials',
  async () => {
    const materials = await materialsAPI.getBookmarkedMaterials();
    return materials;
  }
);

export const toggleBookmark = createAsyncThunk(
  'materials/toggleBookmark',
  async (materialId: string) => {
    const response = await materialsAPI.toggleBookmark(materialId);
    return { materialId, isBookmarked: response.isBookmarked };
  }
);

export const updateProgress = createAsyncThunk(
  'materials/updateProgress',
  async ({ materialId, progress }: { materialId: string; progress: number }) => {
    const response = await materialsAPI.updateProgress(materialId, progress);
    return { materialId, progress: response.progress };
  }
);

export const incrementViews = createAsyncThunk(
  'materials/incrementViews',
  async (materialId: string) => {
    await materialsAPI.incrementViews(materialId);
    return materialId;
  }
);

const materialsSlice = createSlice({
  name: 'materials',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<typeof initialState.filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchQuery = '';
    },
    resetPagination: (state) => {
      state.pagination = initialState.pagination;
    },
    setCurrentMaterial: (state, action: PayloadAction<Material | null>) => {
      state.currentMaterial = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Materials
      .addCase(fetchMaterials.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMaterials.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.meta.arg.page === 1) {
          state.materials = action.payload.materials;
        } else {
          state.materials.push(...action.payload.materials);
        }
        state.pagination = {
          page: action.payload.page,
          limit: action.payload.limit,
          total: action.payload.total,
          hasMore: action.payload.hasMore,
        };
      })
      .addCase(fetchMaterials.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch materials';
      })
      
      // Fetch Material
      .addCase(fetchMaterial.fulfilled, (state, action) => {
        state.currentMaterial = action.payload;
      })
      
      // Search Materials
      .addCase(searchMaterials.pending, (state) => {
        state.isSearching = true;
        state.error = null;
      })
      .addCase(searchMaterials.fulfilled, (state, action) => {
        state.isSearching = false;
        state.searchResults = action.payload.materials;
      })
      .addCase(searchMaterials.rejected, (state, action) => {
        state.isSearching = false;
        state.error = action.error.message || 'Search failed';
      })
      
      // Fetch Recent Materials
      .addCase(fetchRecentMaterials.fulfilled, (state, action) => {
        state.recentMaterials = action.payload;
      })
      
      // Fetch Popular Materials
      .addCase(fetchPopularMaterials.fulfilled, (state, action) => {
        state.popularMaterials = action.payload;
      })
      
      // Fetch Bookmarked Materials
      .addCase(fetchBookmarkedMaterials.fulfilled, (state, action) => {
        state.bookmarkedMaterials = action.payload;
      })
      
      // Toggle Bookmark
      .addCase(toggleBookmark.fulfilled, (state, action) => {
        const { materialId, isBookmarked } = action.payload;
        
        // Update in materials array
        const material = state.materials.find(m => m.id === materialId);
        if (material) {
          material.isBookmarked = isBookmarked;
        }
        
        // Update in current material
        if (state.currentMaterial && state.currentMaterial.id === materialId) {
          state.currentMaterial.isBookmarked = isBookmarked;
        }
        
        // Update in search results
        const searchMaterial = state.searchResults.find(m => m.id === materialId);
        if (searchMaterial) {
          searchMaterial.isBookmarked = isBookmarked;
        }
      })
      
      // Update Progress
      .addCase(updateProgress.fulfilled, (state, action) => {
        const { materialId, progress } = action.payload;
        
        const material = state.materials.find(m => m.id === materialId);
        if (material) {
          material.progress = progress;
        }
        
        if (state.currentMaterial && state.currentMaterial.id === materialId) {
          state.currentMaterial.progress = progress;
        }
      })
      
      // Increment Views
      .addCase(incrementViews.fulfilled, (state, action) => {
        const materialId = action.payload;
        const material = state.materials.find(m => m.id === materialId);
        if (material) {
          material.views += 1;
        }
        
        if (state.currentMaterial && state.currentMaterial.id === materialId) {
          state.currentMaterial.views += 1;
        }
      });
  },
});

export const { 
  clearError, 
  setSearchQuery, 
  setFilters, 
  clearSearchResults, 
  resetPagination,
  setCurrentMaterial
} = materialsSlice.actions;

export default materialsSlice.reducer;
