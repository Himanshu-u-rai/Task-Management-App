// Mock authentication service for development
import type { User } from '../types';

// Mock users for development
const MOCK_USERS = [
  {
    id: '1',
    email: 'demo@example.com',
    displayName: 'Demo User',
    photoURL: undefined,
    createdAt: new Date(),
    lastLoginAt: new Date(),
  },
  {
    id: '2',
    email: 'test@example.com',
    displayName: 'Test User',
    photoURL: undefined,
    createdAt: new Date(),
    lastLoginAt: new Date(),
  },
];

export const mockAuthService = {
  signIn: async (email: string, password: string): Promise<User> => {
    // Simulate realistic API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const user = MOCK_USERS.find(u => u.email === email);
    if (!user || password.length < 6) {
      throw new Error('Invalid email or password');
    }
    
    // Store in localStorage for persistence
    localStorage.setItem('mockUser', JSON.stringify(user));
    return user;
  },

  signUp: async (email: string, _password: string, displayName: string): Promise<User> => {
    // Simulate realistic API delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Check if user already exists
    if (MOCK_USERS.find(u => u.email === email)) {
      throw new Error('User already exists');
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      email,
      displayName,
      photoURL: undefined,
      createdAt: new Date(),
      lastLoginAt: new Date(),
    };
    
    MOCK_USERS.push(newUser as any);
    localStorage.setItem('mockUser', JSON.stringify(newUser));
    return newUser;
  },

  signOut: async (): Promise<void> => {
    // Simulate sign out delay
    await new Promise(resolve => setTimeout(resolve, 800));
    localStorage.removeItem('mockUser');
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('mockUser');
    return userStr ? JSON.parse(userStr) : null;
  },

  resetPassword: async (email: string): Promise<void> => {
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const user = MOCK_USERS.find(u => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }
    
    // In a real app, this would send an email
    console.log('Password reset email sent to:', email);
  },
};
