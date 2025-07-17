# TaskFlow - Collaborative Task Management App

A modern, real-time collaborative task management application built with React, Firebase, and Socket.io.

## ✨ Features

### 🔐 Authentication & User Management
- **Firebase Authentication** with email/password
- User registration and login
- Password reset functionality
- Profile management
- Secure session handling

### 📊 Project & Task Management
- **Multi-project dashboard** with visual project cards
- **Kanban-style boards** with drag-and-drop functionality
- Task creation, editing, and deletion
- Task priority levels (Low, Medium, High, Urgent)
- Due dates and time tracking
- File attachments and checklists
- Task comments and mentions
- Advanced filtering and search

### 🤝 Team Collaboration
- Project member management
- Real-time updates with Socket.io
- @mentions in comments
- Activity logs and notifications
- Role-based permissions

### 🎨 Modern UI/UX
- **Material-UI (MUI)** components with custom theming
- **Dark/Light mode** toggle
- Responsive design for web and mobile
- Smooth animations and transitions
- Clean, modern interface with glass-morphism effects

### 🔄 Real-time Features
- Live task updates across all connected users
- Real-time notifications
- Collaborative editing indicators
- Instant synchronization

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Material-UI (MUI) v6** for UI components
- **Redux Toolkit** for state management
- **React Router v6** for navigation
- **React Hook Form** with Yup validation
- **@dnd-kit** for drag-and-drop functionality
- **Date-fns** for date utilities

### Backend Services
- **Firebase Auth** for authentication
- **Firebase Firestore** for database
- **Firebase Storage** for file uploads
- **Socket.io** for real-time communication

### Development Tools
- **Vite** for fast development and building
- **TypeScript** for type safety
- **ESLint** for code linting

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase project
- (Optional) Socket.io server for real-time features

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd task-management-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=your-app-id
   VITE_SOCKET_URL=http://localhost:3001
   ```

4. **Firebase Setup**
   - Create a new Firebase project
   - Enable Authentication with Email/Password
   - Create a Firestore database
   - Enable Storage for file uploads
   - Update security rules as needed

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (AppBar, Sidebar)
│   ├── projects/       # Project-related components
│   ├── tasks/          # Task-related components
│   └── ui/             # Common UI components
├── contexts/           # React contexts (Auth, Theme)
├── config/             # Configuration files (Firebase, Socket.io)
├── pages/              # Page components
├── store/              # Redux store and slices
├── theme/              # Material-UI theme configuration
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🎯 Key Components

### Authentication Flow
- Login/Register pages with form validation
- Protected routes for authenticated users
- Persistent authentication state
- Automatic token refresh

### Dashboard
- Project overview with statistics
- Quick action buttons
- Recent activity feed
- Team member status

### Kanban Board
- Drag-and-drop task management
- Customizable columns
- Real-time updates
- Task filtering and search

### Task Management
- Rich task editor with attachments
- Priority and due date setting
- Checklist functionality
- Comment system with mentions

## 🔧 Configuration

### Firebase Security Rules

**Firestore Rules:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Project access control
    match /projects/{projectId} {
      allow read, write: if request.auth != null && 
        request.auth.uid in resource.data.members;
    }
    
    // Task access control
    match /tasks/{taskId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Socket.io Server (Optional)
For real-time features, you'll need a Socket.io server. A basic implementation:

```javascript
const io = require('socket.io')(3001, {
  cors: { origin: "http://localhost:5173" }
});

io.on('connection', (socket) => {
  socket.on('task:updated', (data) => {
    socket.broadcast.emit('task:updated', data);
  });
});
```

## 🎨 Theming

The app supports both light and dark themes with custom Material-UI theming:

- **Light Theme**: Clean, minimal design with soft shadows
- **Dark Theme**: Modern dark interface with accent colors
- **Custom Colors**: Configurable primary and accent colors
- **Responsive**: Optimized for all screen sizes

## 📱 Progressive Web App (PWA)

The app is PWA-ready with:
- Service worker for offline functionality
- App manifest for installation
- Mobile-optimized interface
- Push notifications (when implemented)

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Firebase Hosting
```bash
npm run build
firebase deploy
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔮 Roadmap

- [ ] Calendar view for tasks
- [ ] Gantt chart for project timelines
- [ ] Advanced reporting and analytics
- [ ] Mobile app (React Native)
- [ ] Integration with third-party tools
- [ ] AI-powered task recommendations
- [ ] Voice commands
- [ ] Advanced permissions system

## 🐛 Known Issues

- Real-time features require Socket.io server setup
- File upload size limited by Firebase Storage rules
- Some animations may be slower on lower-end devices

## 📞 Support

For support, please open an issue on GitHub or contact the development team.

---

**Made with ❤️ using React, Firebase, and Material-UI**
