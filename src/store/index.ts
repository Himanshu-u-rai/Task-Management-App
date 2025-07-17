// Redux store configuration
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import projectsSlice from './slices/projectsSlice';
import tasksSlice from './slices/tasksSlice';
import uiSlice from './slices/uiSlice';
import notificationsSlice from './slices/notificationsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    projects: projectsSlice,
    tasks: tasksSlice,
    ui: uiSlice,
    notifications: notificationsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
        ignoredPaths: ['auth.user.createdAt', 'auth.user.lastLoginAt'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
