import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BannerProps } from '../../components/Banner';

export interface BannerData extends BannerProps {
  id: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  targetAudience?: string[];
  clickCount?: number;
  impressionCount?: number;
  createdAt: string;
  updatedAt: string;
}

interface BannersState {
  banners: BannerData[];
  activeBanners: BannerData[];
  isLoading: boolean;
  error: string | null;
}

const initialState: BannersState = {
  banners: [],
  activeBanners: [],
  isLoading: false,
  error: null,
};

// Mock data for development
const mockBanners: BannerData[] = [
  {
    id: '1',
    title: 'Yangi Kurs: Temir Yo\'l Xavfsizligi',
    subtitle: 'Yangilik',
    description: 'Temir yo\'l xavfsizligi bo\'yicha yangi onlayn kurs mavjud. Hoziroq ro\'yxatdan o\'ting!',
    type: 'gradient',
    gradientColors: ['#059669', '#10b981'],
    buttonText: 'Kursga yozilish',
    buttonIcon: 'arrow-forward',
    priority: 'high',
    isActive: true,
    clickCount: 0,
    impressionCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    onPress: () => console.log('Banner 1 pressed'),
    onButtonPress: () => console.log('Banner 1 button pressed'),
  },
  {
    id: '2',
    title: 'Texnik Xizmat Ko\'rsatish',
    subtitle: 'E\'lon',
    description: 'Tizim texnik xizmat ko\'rsatish uchun 15:00-16:00 oralig\'ida ishlamaydi.',
    type: 'announcement',
    priority: 'medium',
    buttonText: 'Batafsil',
    buttonIcon: 'information-circle',
    isActive: true,
    clickCount: 0,
    impressionCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Yangi Materiallar Qo\'shildi',
    subtitle: 'Yangilik',
    description: 'Lokomotiv boshqaruvi bo\'yicha 50+ yangi material qo\'shildi.',
    type: 'gradient',
    gradientColors: ['#7c3aed', '#a855f7'],
    buttonText: 'Ko\'rish',
    buttonIcon: 'eye',
    priority: 'medium',
    isActive: true,
    clickCount: 0,
    impressionCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Mobil Ilova Yangilandi',
    subtitle: 'Yangilik',
    description: 'Yangi funksiyalar va yaxshilanishlar bilan tanishing.',
    type: 'gradient',
    gradientColors: ['#2563eb', '#3b82f6'],
    buttonText: 'Yangiliklar',
    buttonIcon: 'sparkles',
    priority: 'low',
    isActive: true,
    clickCount: 0,
    impressionCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Async thunks
export const fetchBanners = createAsyncThunk(
  'banners/fetchBanners',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In real app, this would be an API call
      // const response = await api.get('/banners');
      // return response.data;
      
      return mockBanners;
    } catch (error) {
      return rejectWithValue('Failed to fetch banners');
    }
  }
);

export const trackBannerImpression = createAsyncThunk(
  'banners/trackImpression',
  async (bannerId: string, { getState, rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // In real app, this would be an API call
      // await api.post(`/banners/${bannerId}/impression`);
      
      return bannerId;
    } catch (error) {
      return rejectWithValue('Failed to track impression');
    }
  }
);

export const trackBannerClick = createAsyncThunk(
  'banners/trackClick',
  async (bannerId: string, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // In real app, this would be an API call
      // await api.post(`/banners/${bannerId}/click`);
      
      return bannerId;
    } catch (error) {
      return rejectWithValue('Failed to track click');
    }
  }
);

const bannersSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateActiveBanners: (state) => {
      const now = new Date().toISOString();
      state.activeBanners = state.banners.filter(banner => {
        if (!banner.isActive) return false;
        if (banner.startDate && banner.startDate > now) return false;
        if (banner.endDate && banner.endDate < now) return false;
        return true;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch banners
      .addCase(fetchBanners.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action: PayloadAction<BannerData[]>) => {
        state.isLoading = false;
        state.banners = action.payload;
        // Update active banners
        const now = new Date().toISOString();
        state.activeBanners = action.payload.filter(banner => {
          if (!banner.isActive) return false;
          if (banner.startDate && banner.startDate > now) return false;
          if (banner.endDate && banner.endDate < now) return false;
          return true;
        });
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Track impression
      .addCase(trackBannerImpression.fulfilled, (state, action: PayloadAction<string>) => {
        const banner = state.banners.find(b => b.id === action.payload);
        if (banner) {
          banner.impressionCount = (banner.impressionCount || 0) + 1;
        }
      })
      // Track click
      .addCase(trackBannerClick.fulfilled, (state, action: PayloadAction<string>) => {
        const banner = state.banners.find(b => b.id === action.payload);
        if (banner) {
          banner.clickCount = (banner.clickCount || 0) + 1;
        }
      });
  },
});

export const { clearError, updateActiveBanners } = bannersSlice.actions;
export default bannersSlice.reducer;
