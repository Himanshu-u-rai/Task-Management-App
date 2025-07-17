// Authentication Redux slice
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { mockAuthService } from '../../services/mockAuth';
import type { User, AuthState } from '../../types';
import { connectSocket, disconnectSocket } from '../../config/socket';

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// Check if we should use mock auth (for development without Firebase setup)
const USE_MOCK_AUTH = import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_AUTH === 'true';

// Async thunks
export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }: { email: string; password: string }) => {
    if (USE_MOCK_AUTH) {
      return await mockAuthService.signIn(email, password);
    }
    
    const result = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', result.user.uid));
    
    if (userDoc.exists()) {
      return { ...userDoc.data(), id: result.user.uid } as User;
    } else {
      throw new Error('User document not found');
    }
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ email, password, displayName }: { email: string; password: string; displayName: string }) => {
    if (USE_MOCK_AUTH) {
      return await mockAuthService.signUp(email, password, displayName);
    }
    
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update Firebase Auth profile
    await updateProfile(result.user, { displayName });
    
    // Create user document in Firestore
    const userData: User = {
      id: result.user.uid,
      email: result.user.email!,
      displayName,
      photoURL: result.user.photoURL || undefined,
      createdAt: new Date(),
      lastLoginAt: new Date(),
    };
    
    await setDoc(doc(db, 'users', result.user.uid), userData);
    
    return userData;
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    if (USE_MOCK_AUTH) {
      await mockAuthService.signOut();
      disconnectSocket();
      return;
    }
    
    await signOut(auth);
    disconnectSocket();
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (email: string) => {
    if (USE_MOCK_AUTH) {
      await mockAuthService.resetPassword(email);
      return email;
    }
    
    await sendPasswordResetEmail(auth, email);
    return email;
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateProfile',
  async ({ displayName, photoURL }: { displayName?: string; photoURL?: string }) => {
    const user = auth.currentUser;
    if (!user) throw new Error('No user logged in');
    
    await updateProfile(user, { displayName, photoURL });
    
    // Update Firestore document
    const updates: Partial<User> = {};
    if (displayName) updates.displayName = displayName;
    if (photoURL) updates.photoURL = photoURL;
    
    await setDoc(doc(db, 'users', user.uid), updates, { merge: true });
    
    return { ...updates, id: user.uid };
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign In
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        // Connect socket when user signs in
        connectSocket();
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Sign in failed';
      })
      
      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        // Connect socket when user signs up
        connectSocket();
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Sign up failed';
      })
      
      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Logout failed';
      })
      
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Password reset failed';
      })
      
      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user) {
          state.user = { ...state.user, ...action.payload };
        }
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Profile update failed';
      });
  },
});

export const { setUser, clearError, setLoading } = authSlice.actions;
export default authSlice.reducer;
