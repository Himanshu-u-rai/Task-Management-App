// Notifications Redux slice
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { 
  collection, 
  doc, 
  getDocs, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  limit 
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import type { Notification, NotificationsState } from '../../types';

const initialState: NotificationsState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
};

// Async thunks
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (userId: string) => {
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    
    const querySnapshot = await getDocs(q);
    const notifications: Notification[] = [];
    let unreadCount = 0;
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const notification = { 
        id: doc.id, 
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
      } as Notification;
      
      notifications.push(notification);
      if (!notification.read) {
        unreadCount++;
      }
    });
    
    return { notifications, unreadCount };
  }
);

export const markNotificationAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async (notificationId: string) => {
    const docRef = doc(db, 'notifications', notificationId);
    await updateDoc(docRef, { read: true });
    return notificationId;
  }
);

export const markAllNotificationsAsRead = createAsyncThunk(
  'notifications/markAllAsRead',
  async (userId: string) => {
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      where('read', '==', false)
    );
    
    const querySnapshot = await getDocs(q);
    const updatePromises = querySnapshot.docs.map(doc => 
      updateDoc(doc.ref, { read: true })
    );
    
    await Promise.all(updatePromises);
    return querySnapshot.docs.map(doc => doc.id);
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
      if (!action.payload.read) {
        state.unreadCount++;
      }
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      const index = state.notifications.findIndex(n => n.id === action.payload);
      if (index !== -1) {
        if (!state.notifications[index].read) {
          state.unreadCount--;
        }
        state.notifications.splice(index, 1);
      }
    },
    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload.notifications;
        state.unreadCount = action.payload.unreadCount;
      })
      .addCase(fetchNotifications.rejected, (state) => {
        state.loading = false;
      })
      
      // Mark as Read
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const index = state.notifications.findIndex(n => n.id === action.payload);
        if (index !== -1 && !state.notifications[index].read) {
          state.notifications[index].read = true;
          state.unreadCount--;
        }
      })
      
      // Mark All as Read
      .addCase(markAllNotificationsAsRead.fulfilled, (state, action) => {
        action.payload.forEach(notificationId => {
          const index = state.notifications.findIndex(n => n.id === notificationId);
          if (index !== -1 && !state.notifications[index].read) {
            state.notifications[index].read = true;
          }
        });
        state.unreadCount = 0;
      });
  },
});

export const { addNotification, removeNotification, clearNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;
