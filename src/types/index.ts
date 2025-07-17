// TypeScript type definitions for the application
export type TaskStatus = 'todo' | 'in-progress' | 'in-review' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Date;
  lastLoginAt: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  createdBy: string;
  members: ProjectMember[];
  columns: Column[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectMember {
  userId: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: Date;
}

export interface Column {
  id: string;
  name: string;
  position: number;
  color?: string;
  limit?: number;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  projectId: string;
  columnId: string;
  position: number;
  priority: TaskPriority;
  status: TaskStatus;
  assigneeId?: string;
  assignee?: User;
  createdBy: string;
  creator?: User;
  dueDate?: Date;
  tags: string[];
  attachments: Attachment[];
  checklist: ChecklistItem[];
  estimatedHours?: number;
  actualHours?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedBy: string;
  uploadedAt: Date;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export interface Comment {
  id: string;
  taskId: string;
  content: string;
  authorId: string;
  author?: User;
  mentions: string[];
  parentId?: string; // For replies
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'task_assigned' | 'task_updated' | 'comment_added' | 'mention' | 'due_date_reminder';
  title: string;
  message: string;
  read: boolean;
  data: Record<string, any>;
  createdAt: Date;
}

export interface ActivityLog {
  id: string;
  projectId: string;
  taskId?: string;
  userId: string;
  user?: User;
  action: string;
  details: Record<string, any>;
  createdAt: Date;
}

// Theme and UI types
export interface Theme {
  mode: 'light' | 'dark';
  primaryColor: string;
  accentColor: string;
}

// Form types
export interface CreateProjectForm {
  name: string;
  description: string;
  color: string;
  members: string[];
}

export interface CreateTaskForm {
  title: string;
  description?: string;
  priority: TaskPriority;
  status?: TaskStatus;
  assigneeId?: string;
  dueDate?: Date;
  tags: string[];
  estimatedHours?: number;
  projectId?: string;
  columnId?: string;
  position?: number;
  createdBy?: string;
}

export interface UpdateTaskForm extends Partial<CreateTaskForm> {
  id?: string;
  status?: TaskStatus;
  columnId?: string;
  position?: number;
  order?: number;
}

// Filter and search types
export interface TaskFilters {
  assignee?: string;
  priority?: Task['priority'][];
  status?: Task['status'][];
  tags?: string[];
  dueDateRange?: {
    start?: Date;
    end?: Date;
  };
  search?: string;
}

// Drag and drop types
export interface DragEndEvent {
  active: {
    id: string;
    data: {
      current: {
        type: 'task';
        task: Task;
      };
    };
  };
  over: {
    id: string;
    data: {
      current: {
        type: 'column';
        columnId: string;
      };
    };
  } | null;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Redux state types
export interface RootState {
  auth: AuthState;
  projects: ProjectsState;
  tasks: TasksState;
  ui: UIState;
  notifications: NotificationsState;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface ProjectsState {
  projects: Project[];
  currentProject: Project | null;
  loading: boolean;
  error: string | null;
}

export interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filters: TaskFilters;
}

export interface UIState {
  theme: Theme;
  sidebarOpen: boolean;
  taskModalOpen: boolean;
  selectedTask: Task | null;
}

export interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
}
