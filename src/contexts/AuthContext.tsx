// Authentication context provider
import React, { createContext, useContext, useEffect, type ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { auth, db } from '../config/firebase';
import { mockAuthService } from '../services/mockAuth';
import { setUser, setLoading } from '../store/slices/authSlice';
import type { User } from '../types';
import type { AppDispatch } from '../store';

// Check if we should use mock auth
const USE_MOCK_AUTH = import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_AUTH === 'true';

interface AuthContextType {
  // Add any auth-specific methods if needed
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setLoading(true));

    if (USE_MOCK_AUTH) {
      // For mock auth, check localStorage for existing user
      const user = mockAuthService.getCurrentUser();
      dispatch(setUser(user));
      dispatch(setLoading(false));
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const user: User = {
              id: firebaseUser.uid,
              email: firebaseUser.email!,
              displayName: userData.displayName || firebaseUser.displayName || '',
              photoURL: userData.photoURL || firebaseUser.photoURL || undefined,
              createdAt: userData.createdAt?.toDate() || new Date(),
              lastLoginAt: new Date(),
            };
            
            dispatch(setUser(user));
          } else {
            // Create user document if it doesn't exist
            const user: User = {
              id: firebaseUser.uid,
              email: firebaseUser.email!,
              displayName: firebaseUser.displayName || '',
              photoURL: firebaseUser.photoURL || undefined,
              createdAt: new Date(),
              lastLoginAt: new Date(),
            };
            
            dispatch(setUser(user));
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          dispatch(setUser(null));
        }
      } else {
        dispatch(setUser(null));
      }
      
      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
