export const COLORS = {
  primary: '#2563eb',
  secondary: '#64748b',
  success: '#16a34a',
  error: '#dc2626',
  warning: '#d97706',
  info: '#0ea5e9',
};

export const SIZES = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const FONTS = {
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  semiBold: 'Inter-SemiBold',
  bold: 'Inter-Bold',
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
  },
  MATERIALS: {
    LIST: '/materials',
    DETAIL: '/materials/:id',
    SEARCH: '/materials/search',
  },
  CATEGORIES: {
    LIST: '/categories',
    DETAIL: '/categories/:id',
  },
};
