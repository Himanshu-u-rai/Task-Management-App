// Mock data service for development
import type { Project, Task } from '../types';

// Mock projects data
const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Task Management App',
    description: 'Building a collaborative task management application with React and Firebase',
    color: '#6366f1',
    createdBy: '1',
    members: [
      {
        userId: '1',
        email: 'demo@example.com',
        displayName: 'Demo User',
        role: 'owner',
        joinedAt: new Date(),
      },
      {
        userId: '2',
        email: 'test@example.com',
        displayName: 'Test User',
        role: 'member',
        joinedAt: new Date(),
      },
    ],
    columns: [
      { id: 'todo', name: 'To Do', position: 0, color: '#6b7280' },
      { id: 'in-progress', name: 'In Progress', position: 1, color: '#3b82f6' },
      { id: 'in-review', name: 'In Review', position: 2, color: '#f59e0b' },
      { id: 'completed', name: 'Completed', position: 3, color: '#10b981' },
    ],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Mobile App Design',
    description: 'Creating mockups and prototypes for the mobile version',
    color: '#ec4899',
    createdBy: '1',
    members: [
      {
        userId: '1',
        email: 'demo@example.com',
        displayName: 'Demo User',
        role: 'owner',
        joinedAt: new Date(),
      },
    ],
    columns: [
      { id: 'todo', name: 'Backlog', position: 0, color: '#6b7280' },
      { id: 'in-progress', name: 'Design', position: 1, color: '#3b82f6' },
      { id: 'in-review', name: 'Review', position: 2, color: '#f59e0b' },
      { id: 'completed', name: 'Done', position: 3, color: '#10b981' },
    ],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Documentation',
    description: 'Writing comprehensive documentation for the project',
    color: '#10b981',
    createdBy: '2',
    members: [
      {
        userId: '2',
        email: 'test@example.com',
        displayName: 'Test User',
        role: 'owner',
        joinedAt: new Date(),
      },
      {
        userId: '1',
        email: 'demo@example.com',
        displayName: 'Demo User',
        role: 'admin',
        joinedAt: new Date(),
      },
    ],
    columns: [
      { id: 'todo', name: 'To Do', position: 0, color: '#6b7280' },
      { id: 'in-progress', name: 'Writing', position: 1, color: '#3b82f6' },
      { id: 'in-review', name: 'Review', position: 2, color: '#f59e0b' },
      { id: 'completed', name: 'Published', position: 3, color: '#10b981' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date(),
  },
];

// Mock tasks data
const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Set up project structure',
    description: 'Initialize the React project with TypeScript and configure build tools',
    projectId: '1',
    columnId: 'completed',
    position: 0,
    priority: 'high',
    status: 'completed',
    assigneeId: '1',
    createdBy: '1',
    dueDate: new Date('2024-01-20'),
    tags: ['setup', 'configuration'],
    attachments: [],
    checklist: [
      { id: '1', text: 'Initialize React project', completed: true, createdAt: new Date() },
      { id: '2', text: 'Configure TypeScript', completed: true, createdAt: new Date() },
      { id: '3', text: 'Set up build tools', completed: true, createdAt: new Date() },
    ],
    estimatedHours: 4,
    actualHours: 3.5,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    title: 'Implement authentication',
    description: 'Add Firebase authentication with email/password and social login',
    projectId: '1',
    columnId: 'in-progress',
    position: 0,
    priority: 'high',
    status: 'in-progress',
    assigneeId: '1',
    createdBy: '1',
    dueDate: new Date('2024-02-15'),
    tags: ['auth', 'firebase', 'security'],
    attachments: [],
    checklist: [
      { id: '1', text: 'Set up Firebase Auth', completed: true, createdAt: new Date() },
      { id: '2', text: 'Implement email/password auth', completed: true, createdAt: new Date() },
      { id: '3', text: 'Add social login', completed: false, createdAt: new Date() },
      { id: '4', text: 'Add password reset', completed: false, createdAt: new Date() },
    ],
    estimatedHours: 8,
    actualHours: 6,
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Design Kanban board',
    description: 'Create the drag-and-drop Kanban board interface',
    projectId: '1',
    columnId: 'todo',
    position: 0,
    priority: 'medium',
    status: 'todo',
    assigneeId: '2',
    createdBy: '1',
    dueDate: new Date('2024-02-20'),
    tags: ['ui', 'kanban', 'dnd'],
    attachments: [],
    checklist: [],
    estimatedHours: 12,
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date(),
  },
];

export const mockDataService = {
  // Projects
  fetchProjects: async (userId: string): Promise<Project[]> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return MOCK_PROJECTS.filter(project => 
      project.members.some(member => member.userId === userId)
    );
  },

  fetchProject: async (projectId: string): Promise<Project | null> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return MOCK_PROJECTS.find(project => project.id === projectId) || null;
  },

  createProject: async (projectData: any): Promise<Project> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const newProject: Project = {
      id: Date.now().toString(),
      ...projectData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    MOCK_PROJECTS.push(newProject);
    return newProject;
  },

  updateProject: async (projectId: string, updates: any): Promise<Project> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const projectIndex = MOCK_PROJECTS.findIndex(p => p.id === projectId);
    if (projectIndex === -1) throw new Error('Project not found');
    
    MOCK_PROJECTS[projectIndex] = {
      ...MOCK_PROJECTS[projectIndex],
      ...updates,
      updatedAt: new Date(),
    };
    return MOCK_PROJECTS[projectIndex];
  },

  // Tasks
  fetchTasks: async (projectId: string): Promise<Task[]> => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    return MOCK_TASKS.filter(task => task.projectId === projectId);
  },

  createTask: async (taskData: any): Promise<Task> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const newTask: Task = {
      id: Date.now().toString(),
      ...taskData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    MOCK_TASKS.push(newTask);
    return newTask;
  },

  updateTask: async (taskId: string, updates: any): Promise<Task> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const taskIndex = MOCK_TASKS.findIndex(t => t.id === taskId);
    if (taskIndex === -1) throw new Error('Task not found');
    
    MOCK_TASKS[taskIndex] = {
      ...MOCK_TASKS[taskIndex],
      ...updates,
      updatedAt: new Date(),
    };
    return MOCK_TASKS[taskIndex];
  },

  deleteTask: async (taskId: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const taskIndex = MOCK_TASKS.findIndex(t => t.id === taskId);
    if (taskIndex === -1) throw new Error('Task not found');
    MOCK_TASKS.splice(taskIndex, 1);
  },
};
