import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
  isDark: boolean;
  colors: {
    primary: string;
    background: string;
    text: string;
    textSecondary: string;
    border: string;
  };
}

const lightColors = {
  primary: '#2563eb',
  background: '#ffffff',
  text: '#0f172a',
  textSecondary: '#64748b',
  border: '#e2e8f0',
};

const darkColors = {
  primary: '#3b82f6',
  background: '#0f172a',
  text: '#f8fafc',
  textSecondary: '#94a3b8',
  border: '#334155',
};

const initialState: ThemeState = {
  mode: 'light',
  isDark: false,
  colors: lightColors,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      state.isDark = action.payload === 'dark';
      state.colors = state.isDark ? darkColors : lightColors;
    },
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
      state.mode = state.isDark ? 'dark' : 'light';
      state.colors = state.isDark ? darkColors : lightColors;
    },
  },
});

export const { setThemeMode, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
