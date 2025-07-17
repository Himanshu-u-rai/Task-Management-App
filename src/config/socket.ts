// Socket.io client configuration
import { io, Socket } from 'socket.io-client';
import { auth } from './firebase';

let socket: Socket | null = null;

export const connectSocket = () => {
  if (!socket) {
    socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001', {
      autoConnect: false,
      transports: ['websocket', 'polling'],
    });

    // Authenticate with Firebase token
    socket.on('connect', async () => {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        socket?.emit('authenticate', { token });
      }
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;

// Socket event types for TypeScript
export interface SocketEvents {
  // Task events
  'task:created': (data: { taskId: string; projectId: string; task: any }) => void;
  'task:updated': (data: { taskId: string; projectId: string; updates: any }) => void;
  'task:deleted': (data: { taskId: string; projectId: string }) => void;
  'task:moved': (data: { taskId: string; projectId: string; sourceColumn: string; destinationColumn: string; position: number }) => void;
  
  // Comment events
  'comment:added': (data: { taskId: string; comment: any }) => void;
  'comment:updated': (data: { commentId: string; updates: any }) => void;
  'comment:deleted': (data: { commentId: string }) => void;
  
  // Project events
  'project:updated': (data: { projectId: string; updates: any }) => void;
  'project:member_added': (data: { projectId: string; member: any }) => void;
  'project:member_removed': (data: { projectId: string; memberId: string }) => void;
  
  // Notification events
  'notification:new': (data: { notification: any }) => void;
  
  // Typing events
  'user:typing': (data: { taskId: string; userId: string; isTyping: boolean }) => void;
}
