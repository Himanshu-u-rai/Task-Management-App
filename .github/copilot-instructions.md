# Copilot Instructions for Task Management App

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a collaborative Task Management App built with:
- **Frontend**: React 19 with TypeScript and Vite
- **UI Library**: Material-UI (MUI) v6 with custom theming
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Real-time**: Socket.io for live collaboration
- **Drag & Drop**: @dnd-kit for Kanban boards
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Forms**: React Hook Form with Yup validation

## Code Style Guidelines
- Use TypeScript with strict typing
- Follow React functional components with hooks
- Use Material-UI components consistently
- Implement responsive design patterns
- Use modern ES6+ syntax
- Follow clean code principles with proper separation of concerns

## Architecture Patterns
- Component-based architecture with atomic design principles
- Custom hooks for business logic
- Redux slices for state management
- Service layer for Firebase and Socket.io operations
- Context providers for theme and authentication

## Key Features to Implement
- User authentication with Firebase Auth
- Real-time collaboration with Socket.io
- Kanban board with drag-and-drop functionality
- Task management with CRUD operations
- Team collaboration features
- Responsive design with dark/light mode
- Advanced filtering and search capabilities

## Performance Considerations
- Use React.memo for expensive components
- Implement lazy loading for routes
- Optimize bundle size with code splitting
- Use proper dependency arrays in useEffect
- Implement proper error boundaries
