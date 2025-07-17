// UI Redux slice for theme and layout state
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UIState, Task } from '../../types';

const initialState: UIState = {
  theme: {
    mode: (localStorage.getItem('themeMode') as 'light' | 'dark') || 'light',
    primaryColor: localStorage.getItem('primaryColor') || '#6366f1',
    accentColor: localStorage.getItem('accentColor') || '#ec4899',
  },
  sidebarOpen: true,
  taskModalOpen: false,
  selectedTask: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme.mode = state.theme.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', state.theme.mode);
    },
    setThemeMode: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme.mode = action.payload;
      localStorage.setItem('themeMode', action.payload);
    },
    setPrimaryColor: (state, action: PayloadAction<string>) => {
      state.theme.primaryColor = action.payload;
      localStorage.setItem('primaryColor', action.payload);
    },
    setAccentColor: (state, action: PayloadAction<string>) => {
      state.theme.accentColor = action.payload;
      localStorage.setItem('accentColor', action.payload);
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    openTaskModal: (state, action: PayloadAction<Task | null>) => {
      state.taskModalOpen = true;
      state.selectedTask = action.payload;
    },
    closeTaskModal: (state) => {
      state.taskModalOpen = false;
      state.selectedTask = null;
    },
    setSelectedTask: (state, action: PayloadAction<Task | null>) => {
      state.selectedTask = action.payload;
    },
  },
});

export const {
  toggleTheme,
  setThemeMode,
  setPrimaryColor,
  setAccentColor,
  toggleSidebar,
  setSidebarOpen,
  openTaskModal,
  closeTaskModal,
  setSelectedTask,
} = uiSlice.actions;

export default uiSlice.reducer;
