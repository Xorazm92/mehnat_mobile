import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import themeSlice from './slices/themeSlice';
import categoriesSlice from './slices/categoriesSlice';
import materialsSlice from './slices/materialsSlice';
import downloadSlice from './slices/downloadSlice';
import bannersSlice from './slices/bannersSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice,
    categories: categoriesSlice,
    materials: materialsSlice,
    downloads: downloadSlice,
    banners: bannersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
