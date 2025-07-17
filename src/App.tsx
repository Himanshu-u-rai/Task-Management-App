import { useState, useRef, useEffect } from 'react';

function App() {
  // Inject modern global Neumorphism styles with enhanced typography
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* Import Google Fonts for modern typography */
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
      
      /* Global reset and modern typography */
      * {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      /* Enhanced Neumorphism Classes */
      .neu-input {
        border: none !important;
        border-radius: 16px !important;
        box-shadow: var(--neu-pressed) !important;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        outline: none !important;
        font-weight: 500 !important;
        letter-spacing: 0.025em !important;
      }
      .neu-input:focus {
        box-shadow: inset 6px 6px 12px var(--neu-shadow-dark), inset -6px -6px 12px var(--neu-shadow-light) !important;
        transform: scale(1.02) !important;
      }
      
      .neu-button {
        border: none !important;
        border-radius: 16px !important;
        box-shadow: var(--neu-subtle) !important;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        cursor: pointer !important;
        font-weight: 600 !important;
        letter-spacing: 0.025em !important;
        position: relative !important;
        overflow: hidden !important;
      }
      .neu-button:hover {
        box-shadow: var(--neu-raised) !important;
        transform: translateY(-2px) !important;
      }
      .neu-button:active {
        box-shadow: var(--neu-pressed) !important;
        transform: translateY(0) !important;
      }
      
      /* Profile Image Cropper Animation */
      @keyframes pulse {
        0%, 100% {
          box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(0, 212, 255, 0.3);
          border-color: #00d4ff;
        }
        50% {
          box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.6), inset 0 0 30px rgba(0, 212, 255, 0.5);
          border-color: #00a3cc;
        }
      }
      .neu-button::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
        transition: all 0.6s;
        transform: translate(-50%, -50%);
        border-radius: 50%;
      }
      .neu-button:active::before {
        width: 300px;
        height: 300px;
      }
      
      .neu-card {
        border: none !important;
        border-radius: 20px !important;
        box-shadow: var(--neu-subtle) !important;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        backdrop-filter: blur(10px) !important;
      }
      .neu-card:hover {
        box-shadow: var(--neu-raised) !important;
        transform: translateY(-4px) !important;
      }
      
      /* Modern scrollbar styling */
      ::-webkit-scrollbar {
        width: 8px;
      }
      ::-webkit-scrollbar-track {
        background: var(--bg-secondary);
        border-radius: 10px;
      }
      ::-webkit-scrollbar-thumb {
        background: var(--accent-primary);
        border-radius: 10px;
        transition: all 0.3s ease;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: var(--accent-secondary);
      }
      
      /* Enhanced focus states */
      .focus-ring:focus {
        outline: 2px solid var(--accent-primary);
        outline-offset: 2px;
      }
      
      /* Range slider styling */
      .range-slider {
        -webkit-appearance: none;
        appearance: none;
        height: 6px;
        border-radius: 3px;
        background: var(--bg-tertiary);
        outline: none;
        transition: all 0.3s ease;
      }
      
      .range-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
        cursor: pointer;
        border: 2px solid white;
        box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
        transition: all 0.3s ease;
      }
      
      .range-slider::-webkit-slider-thumb:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.6);
      }
      
      .range-slider::-moz-range-thumb {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
        cursor: pointer;
        border: 2px solid white;
        box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
        transition: all 0.3s ease;
      }
      
      .range-slider::-moz-range-track {
        height: 6px;
        border-radius: 3px;
        background: var(--bg-tertiary);
        border: none;
      }
      
      /* Smooth transitions for all interactive elements */
      button, input, select, textarea {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  // Auto-save timer ref
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Enhanced State Management
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedTag, setSelectedTag] = useState('all');
  
  // Task Form States
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('medium');
  const [newTaskProject, setNewTaskProject] = useState('General');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [newTaskTags, setNewTaskTags] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState('');
  const [newTaskEstimatedHours, setNewTaskEstimatedHours] = useState(4);
  
  // Edit Task Modal State
  const [showEditTask, setShowEditTask] = useState(false);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editTaskTitle, setEditTaskTitle] = useState('');
  const [editTaskDescription, setEditTaskDescription] = useState('');
  const [editTaskPriority, setEditTaskPriority] = useState('medium');
  const [editTaskProject, setEditTaskProject] = useState('General');
  const [editTaskDueDate, setEditTaskDueDate] = useState('');
  const [editTaskStatus, setEditTaskStatus] = useState('todo');
  const [editTaskEstimatedHours, setEditTaskEstimatedHours] = useState(4);
  const [editTaskCompletedHours, setEditTaskCompletedHours] = useState(0);
  
  // Comment State
  const [newComment, setNewComment] = useState('');
  
  // Profile Editing States
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileFormData, setProfileFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    bio: '',
    location: '',
    website: '',
    phone: '',
    profileImage: null as string | null
  });

  // Image cropping states
  const [showImageCropper, setShowImageCropper] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState<string | null>(null);
  
  // Project Form States
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [newProjectColor, setNewProjectColor] = useState('#3498db');

  // Edit Project Modal State
  const [showEditProject, setShowEditProject] = useState(false);
  const [editProjectId, setEditProjectId] = useState<number | null>(null);
  const [editProjectName, setEditProjectName] = useState('');
  const [editProjectDescription, setEditProjectDescription] = useState('');
  const [editProjectColor, setEditProjectColor] = useState('#3498db');
  const [editProjectStartDate, setEditProjectStartDate] = useState('');
  const [editProjectEndDate, setEditProjectEndDate] = useState('');
  const [editProjectBudget, setEditProjectBudget] = useState(0);
  const [editProjectStatus, setEditProjectStatus] = useState('active');
  
  // Settings State with modern defaults
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    emailNotifications: true,
    pushNotifications: true,
    taskReminders: true,
    weeklyReports: false,
    autoSaveInterval: 5,
    defaultTaskPriority: 'medium',
    defaultProjectColor: '#3b82f6',
    compactView: false,
    showCompletedTasks: true,
    taskViewStyle: 'cards'
  });
  
  // Edit Project Handler
  const openEditProjectModal = (project: any) => {
    setEditProjectId(project.id);
    setEditProjectName(project.name);
    setEditProjectDescription(project.description);
    setEditProjectColor(project.color);
    setEditProjectStartDate(project.startDate);
    setEditProjectEndDate(project.endDate);
    setEditProjectBudget(project.budget);
    setEditProjectStatus(project.status);
    setShowEditProject(true);
  };

  const handleEditProject = () => {
    if (!editProjectName.trim()) return;
    setProjects(projects.map(p =>
      p.id === editProjectId
        ? {
            ...p,
            name: editProjectName,
            description: editProjectDescription,
            color: editProjectColor,
            startDate: editProjectStartDate,
            endDate: editProjectEndDate,
            budget: editProjectBudget,
            status: editProjectStatus
          }
        : p
    ));
    setShowEditProject(false);
    setEditProjectId(null);
    addNotification('success', `Project "${editProjectName}" updated successfully!`);
  };

  // Edit Task Handler
  const openEditTaskModal = (task: any) => {
    setEditTaskId(task.id);
    setEditTaskTitle(task.title);
    setEditTaskDescription(task.description);
    setEditTaskPriority(task.priority);
    setEditTaskProject(task.project);
    setEditTaskDueDate(task.dueDate);
    setEditTaskStatus(task.status);
    setEditTaskEstimatedHours(task.estimatedHours);
    setEditTaskCompletedHours(task.completedHours);
    setShowEditTask(true);
  };

  const handleEditTask = () => {
    if (!editTaskTitle.trim()) return;
    setTasks(tasks.map(t =>
      t.id === editTaskId
        ? {
            ...t,
            title: editTaskTitle,
            description: editTaskDescription,
            priority: editTaskPriority,
            project: editTaskProject,
            dueDate: editTaskDueDate,
            status: editTaskStatus,
            estimatedHours: editTaskEstimatedHours,
            completedHours: editTaskCompletedHours
          }
        : t
    ));
    setShowEditTask(false);
    setEditTaskId(null);
    addNotification('success', `Task "${editTaskTitle}" updated successfully!`);
  };

  // Settings Handler with Implementation
  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));

    // Apply theme changes immediately
    if (key === 'theme') {
      applyTheme(value);
    }

    // Apply auto-save interval changes
    if (key === 'autoSaveInterval') {
      setupAutoSave(value);
    }

    // Apply language changes (for demo purposes)
    if (key === 'language') {
      addNotification('info', `Language changed to ${getLanguageName(value)}`);
    }

    addNotification('success', 'Settings updated successfully!');
  };

  // Theme implementation with Modern Neumorphism
  const applyTheme = (theme: string) => {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      // Modern Dark Theme with refined colors
      root.style.setProperty('--bg-primary', '#0f172a');
      root.style.setProperty('--bg-secondary', '#1e293b');
      root.style.setProperty('--bg-tertiary', '#334155');
      root.style.setProperty('--text-primary', '#f8fafc');
      root.style.setProperty('--text-secondary', '#e2e8f0');
      root.style.setProperty('--text-muted', '#94a3b8');
      root.style.setProperty('--border-color', 'transparent');
      root.style.setProperty('--card-bg', '#1e293b');
      root.style.setProperty('--card-border', 'transparent');
      root.style.setProperty('--input-bg', '#1e293b');
      root.style.setProperty('--input-border', 'transparent');
      root.style.setProperty('--shadow-color', 'rgba(0,0,0,0.6)');
      root.style.setProperty('--hover-bg', '#334155');
      // Enhanced Neumorphism shadows for dark theme
      root.style.setProperty('--neu-shadow-dark', 'rgba(0, 0, 0, 0.5)');
      root.style.setProperty('--neu-shadow-light', 'rgba(255, 255, 255, 0.02)');
      root.style.setProperty('--neu-raised', '8px 8px 16px var(--neu-shadow-dark), -4px -4px 8px var(--neu-shadow-light)');
      root.style.setProperty('--neu-pressed', 'inset 4px 4px 8px var(--neu-shadow-dark), inset -2px -2px 4px var(--neu-shadow-light)');
      root.style.setProperty('--neu-subtle', '4px 4px 8px var(--neu-shadow-dark), -2px -2px 4px var(--neu-shadow-light)');
      // Modern accent colors
      root.style.setProperty('--accent-primary', '#3b82f6');
      root.style.setProperty('--accent-secondary', '#8b5cf6');
      root.style.setProperty('--accent-success', '#10b981');
      root.style.setProperty('--accent-warning', '#f59e0b');
      root.style.setProperty('--accent-error', '#ef4444');
      document.body.style.backgroundColor = '#0f172a';
      document.body.style.color = '#f8fafc';
    } else if (theme === 'auto') {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(isDarkMode ? 'dark' : 'light');
      return;
    } else {
      // Modern Light Theme with refined colors
      root.style.setProperty('--bg-primary', '#f8fafc');
      root.style.setProperty('--bg-secondary', '#f1f5f9');
      root.style.setProperty('--bg-tertiary', '#e2e8f0');
      root.style.setProperty('--text-primary', '#0f172a');
      root.style.setProperty('--text-secondary', '#334155');
      root.style.setProperty('--text-muted', '#64748b');
      root.style.setProperty('--border-color', 'transparent');
      root.style.setProperty('--card-bg', '#ffffff');
      root.style.setProperty('--card-border', 'transparent');
      root.style.setProperty('--input-bg', '#ffffff');
      root.style.setProperty('--input-border', 'transparent');
      root.style.setProperty('--shadow-color', 'rgba(148, 163, 184, 0.25)');
      root.style.setProperty('--hover-bg', '#f1f5f9');
      // Enhanced Neumorphism shadows for light theme
      root.style.setProperty('--neu-shadow-dark', 'rgba(148, 163, 184, 0.25)');
      root.style.setProperty('--neu-shadow-light', 'rgba(255, 255, 255, 0.9)');
      root.style.setProperty('--neu-raised', '8px 8px 16px var(--neu-shadow-dark), -4px -4px 8px var(--neu-shadow-light)');
      root.style.setProperty('--neu-pressed', 'inset 4px 4px 8px var(--neu-shadow-dark), inset -2px -2px 4px var(--neu-shadow-light)');
      root.style.setProperty('--neu-subtle', '4px 4px 8px var(--neu-shadow-dark), -2px -2px 4px var(--neu-shadow-light)');
      // Modern accent colors
      root.style.setProperty('--accent-primary', '#3b82f6');
      root.style.setProperty('--accent-secondary', '#8b5cf6');
      root.style.setProperty('--accent-success', '#10b981');
      root.style.setProperty('--accent-warning', '#f59e0b');
      root.style.setProperty('--accent-error', '#ef4444');
      document.body.style.backgroundColor = '#f8fafc';
      document.body.style.color = '#0f172a';
    }
  };

  // Auto-save implementation
  const setupAutoSave = (intervalMinutes: number) => {
    // Clear existing auto-save timer
    if (autoSaveTimerRef.current) {
      clearInterval(autoSaveTimerRef.current);
    }
    
    // Set new auto-save timer
    autoSaveTimerRef.current = setInterval(() => {
      // Save current state to localStorage
      localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
      localStorage.setItem('taskflow_projects', JSON.stringify(projects));
      localStorage.setItem('taskflow_settings', JSON.stringify(settings));
      addNotification('info', '💾 Auto-saved successfully');
    }, intervalMinutes * 60 * 1000);
  };

  // Language helper
  const getLanguageName = (code: string) => {
    const languages: Record<string, string> = {
      'en': 'English',
      'es': 'Español',
      'fr': 'Français',
      'de': 'Deutsch',
      'it': 'Italiano',
      'pt': 'Português',
      'zh': '中文',
      'ja': '日本語'
    };
    return languages[code] || 'English';
  };

  // Format date according to settings
  const formatDate = (dateString: string) => {
    if (!dateString) return 'No date';
    
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      timeZone: settings.timezone
    };

    switch (settings.dateFormat) {
      case 'DD/MM/YYYY':
        return date.toLocaleDateString('en-GB', options);
      case 'YYYY-MM-DD':
        return date.toISOString().split('T')[0];
      case 'DD MMM YYYY':
        return date.toLocaleDateString('en-US', { 
          ...options,
          day: '2-digit', 
          month: 'short', 
          year: 'numeric' 
        });
      case 'MM/DD/YYYY':
      default:
        return date.toLocaleDateString('en-US', options);
    }
  };

  // Format time according to settings
  // const formatTime = (date: Date) => {
  //   const options: Intl.DateTimeFormatOptions = {
  //     timeZone: settings.timezone,
  //     hour12: settings.timeFormat === '12h'
  //   };
  //   return date.toLocaleTimeString('en-US', options);
  // };

  const resetSettings = () => {
    setSettings({
      theme: 'light',
      language: 'en',
      timezone: 'UTC',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h',
      emailNotifications: true,
      pushNotifications: true,
      taskReminders: true,
      weeklyReports: false,
      autoSaveInterval: 5,
      defaultTaskPriority: 'medium',
      defaultProjectColor: '#3b82f6',
      compactView: false,
      showCompletedTasks: true,
      taskViewStyle: 'cards'
    });
    addNotification('info', 'Settings reset to defaults');
  };

  // Initialize settings and load saved data on component mount
  useEffect(() => {
    // Load saved data from localStorage
    const savedTasks = localStorage.getItem('taskflow_tasks');
    const savedProjects = localStorage.getItem('taskflow_projects');
    const savedSettings = localStorage.getItem('taskflow_settings');
    
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (e) {
        console.error('Failed to load saved tasks:', e);
      }
    }
    
    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects));
      } catch (e) {
        console.error('Failed to load saved projects:', e);
      }
    }
    
    if (savedSettings) {
      try {
        const loadedSettings = JSON.parse(savedSettings);
        setSettings(loadedSettings);
        // Apply loaded theme
        applyTheme(loadedSettings.theme);
        // Setup auto-save with loaded interval
        setupAutoSave(loadedSettings.autoSaveInterval);
      } catch (e) {
        console.error('Failed to load saved settings:', e);
        // Apply default theme if loading fails
        applyTheme('light');
        setupAutoSave(5);
      }
    } else {
      // Apply default settings
      applyTheme('light');
      setupAutoSave(5);
    }

    // Cleanup auto-save timer on component unmount
    return () => {
      if (autoSaveTimerRef.current) {
        clearInterval(autoSaveTimerRef.current);
      }
    };
  }, []);

  // User and notification state
  const [user] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '👤',
    role: 'Project Manager',
    department: 'Engineering',
    joinDate: '2023-01-15',
    bio: 'Experienced project manager with 8+ years in software development. Passionate about agile methodologies and team collaboration.',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
    phone: '+1 (555) 123-4567',
    profileImage: null as string | null // Add profile image field
  });

  // Team members data
  const [teamMembers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Project Manager', avatar: '👤' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Frontend Developer', avatar: '👩‍💻' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Backend Developer', avatar: '👨‍💻' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'UX Designer', avatar: '🎨' },
    { id: 5, name: 'David Brown', email: 'david@example.com', role: 'Security Specialist', avatar: '🔒' }
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'success', message: 'Task "Design Homepage" completed!', time: '2 minutes ago', read: false },
    { id: 2, type: 'info', message: 'New team member added to project', time: '1 hour ago', read: false },
    { id: 3, type: 'warning', message: 'Deadline approaching for "Mobile App"', time: '3 hours ago', read: true }
  ]);

  // Initialize profile form data
  useEffect(() => {
    setProfileFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      bio: user.bio,
      location: user.location,
      website: user.website,
      phone: user.phone,
      profileImage: user.profileImage
    });
  }, [user]);

  // Enhanced Data with detailed information
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Design Homepage Layout',
      description: 'Create wireframes and mockups for the new homepage design',
      priority: 'high',
      status: 'in-progress',
      project: 'Website Redesign',
      assignee: 'John Doe',
      dueDate: '2024-01-30',
      createdAt: '2024-01-15',
      estimatedHours: 8,
      completedHours: 5,
      tags: ['design', 'ui/ux', 'wireframes'],
      comments: [
        { id: 1, author: 'John Doe', text: 'Started wireframe sketches', timestamp: '2024-01-16T10:00:00Z' },
        { id: 2, author: 'Jane Smith', text: 'Looks good! Consider mobile-first approach', timestamp: '2024-01-17T14:30:00Z' }
      ]
    },
    {
      id: 2,
      title: 'API Integration',
      description: 'Integrate third-party payment gateway APIs',
      priority: 'high',
      status: 'todo',
      project: 'E-commerce Platform',
      assignee: 'Jane Smith',
      dueDate: '2024-02-05',
      createdAt: '2024-01-20',
      estimatedHours: 12,
      completedHours: 0,
      tags: ['backend', 'api', 'payment'],
      comments: []
    },
    {
      id: 3,
      title: 'Database Optimization',
      description: 'Optimize database queries for better performance',
      priority: 'medium',
      status: 'done',
      project: 'Performance Enhancement',
      assignee: 'Mike Johnson',
      dueDate: '2024-01-25',
      createdAt: '2024-01-10',
      estimatedHours: 6,
      completedHours: 6,
      tags: ['backend', 'database', 'performance'],
      comments: [
        { id: 1, author: 'Mike Johnson', text: 'Optimized all slow queries', timestamp: '2024-01-24T16:00:00Z' }
      ]
    },
    {
      id: 4,
      title: 'User Testing',
      description: 'Conduct usability testing with target users',
      priority: 'medium',
      status: 'in-progress',
      project: 'Mobile App',
      assignee: 'Sarah Wilson',
      dueDate: '2024-02-10',
      createdAt: '2024-01-22',
      estimatedHours: 10,
      completedHours: 3,
      tags: ['testing', 'ux', 'research'],
      comments: []
    },
    {
      id: 5,
      title: 'Security Audit',
      description: 'Comprehensive security review of the application',
      priority: 'high',
      status: 'todo',
      project: 'Security Enhancement',
      assignee: 'David Brown',
      dueDate: '2024-02-15',
      createdAt: '2024-01-25',
      estimatedHours: 16,
      completedHours: 0,
      tags: ['security', 'audit', 'compliance'],
      comments: []
    }
  ]);

  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Website Redesign',
      description: 'Complete overhaul of company website with modern design and improved UX',
      color: '#3498db',
      progress: 75,
      tasks: 8,
      members: 4,
      startDate: '2024-01-01',
      endDate: '2024-03-15',
      budget: 50000,
      status: 'active'
    },
    {
      id: 2,
      name: 'Mobile App',
      description: 'Native mobile application for iOS and Android platforms',
      color: '#e74c3c',
      progress: 45,
      tasks: 12,
      members: 6,
      startDate: '2024-01-15',
      endDate: '2024-05-30',
      budget: 120000,
      status: 'active'
    },
    {
      id: 3,
      name: 'E-commerce Platform',
      description: 'Full-featured e-commerce solution with payment integration',
      color: '#27ae60',
      progress: 30,
      tasks: 15,
      members: 8,
      startDate: '2024-02-01',
      endDate: '2024-08-15',
      budget: 200000,
      status: 'active'
    },
    {
      id: 4,
      name: 'Performance Enhancement',
      description: 'Optimize system performance and scalability',
      color: '#f39c12',
      progress: 90,
      tasks: 5,
      members: 3,
      startDate: '2023-12-01',
      endDate: '2024-01-31',
      budget: 30000,
      status: 'active'
    }
  ]);

  // Enhanced Functions
  const handleLogin = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoggedIn(true);
    setCurrentView('dashboard');
    setShowLogin(false);
    setLoading(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('home');
    setShowLogin(false);
  };

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    
    const newTask = {
      id: tasks.length + 1,
      title: newTaskTitle,
      description: newTaskDescription,
      priority: newTaskPriority || settings.defaultTaskPriority,
      status: 'todo',
      project: newTaskProject,
      assignee: newTaskAssignee || user.name,
      dueDate: newTaskDueDate,
      createdAt: new Date().toISOString().split('T')[0],
      estimatedHours: newTaskEstimatedHours,
      completedHours: 0,
      tags: newTaskTags ? newTaskTags.split(',').map(tag => tag.trim()) : [],
      comments: []
    };
    setTasks([...tasks, newTask]);
    setShowCreateTask(false);
    resetTaskForm();
    addNotification('success', `Task "${newTaskTitle}" created successfully!`);
  };

  const addProject = () => {
    if (!newProjectName.trim()) return;
    
    const newProject = {
      id: projects.length + 1,
      name: newProjectName,
      description: newProjectDescription,
      color: newProjectColor || settings.defaultProjectColor,
      progress: 0,
      tasks: 0,
      members: 1,
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      budget: 0,
      status: 'active'
    };
    setProjects([...projects, newProject]);
    setShowCreateProject(false);
    resetProjectForm();
    addNotification('success', `Project "${newProjectName}" created successfully!`);
  };

  const updateTaskStatus = (taskId: number, newStatus: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const updatedTask = { ...task, status: newStatus };
        if (newStatus === 'done' && task.status !== 'done') {
          updatedTask.completedHours = task.estimatedHours;
          addNotification('success', `Task "${task.title}" completed!`);
        }
        return updatedTask;
      }
      return task;
    }));
  };

  const deleteTask = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    setTasks(tasks.filter(t => t.id !== taskId));
    if (task) {
      addNotification('info', `Task "${task.title}" deleted`);
    }
  };

  const addNotification = (type: string, message: string) => {
    const newNotification = {
      id: notifications.length + 1,
      type,
      message,
      time: 'Just now',
      read: false
    };
    setNotifications([newNotification, ...notifications]);
    
    // Show browser notification if enabled
    if (settings.pushNotifications && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('TaskFlow', {
          body: message,
          icon: '/favicon.ico',
          tag: 'taskflow-notification'
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('TaskFlow', {
              body: message,
              icon: '/favicon.ico',
              tag: 'taskflow-notification'
            });
          }
        });
      }
    }
  };

  const markNotificationAsRead = (notificationId: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const resetTaskForm = () => {
    setNewTaskTitle('');
    setNewTaskDescription('');
    setNewTaskPriority(settings.defaultTaskPriority);
    setNewTaskProject('General');
    setNewTaskDueDate('');
    setNewTaskTags('');
    setNewTaskAssignee('');
    setNewTaskEstimatedHours(4);
  };

  const resetProjectForm = () => {
    setNewProjectName('');
    setNewProjectDescription('');
    setNewProjectColor(settings.defaultProjectColor);
  };

  const getFilteredTasks = () => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
      const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
      
      // Tag filtering
      const matchesTag = selectedTag === 'all' || 
                        (task.tags && task.tags.some(tag => 
                          tag.toLowerCase().includes(selectedTag.toLowerCase())
                        ));
      
      // Apply settings filters
      const showCompleted = settings.showCompletedTasks || task.status !== 'done';
      
      return matchesSearch && matchesStatus && matchesPriority && matchesTag && showCompleted;
    });
  };

  const calculateProjectProgress = (projectId: number) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return 0;
    const projectTasks = tasks.filter(task => task.project === project.name);
    if (projectTasks.length === 0) return 0;
    const completedTasks = projectTasks.filter(task => task.status === 'done').length;
    return Math.round((completedTasks / projectTasks.length) * 100);
  };

  // Helper function to get the actual theme being used
  // const getActualTheme = () => {
  //   if (settings.theme === 'auto') {
  //     return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  //   }
  //   return settings.theme;
  // };

  // Check for due tasks and send reminders
  useEffect(() => {
    if (!settings.taskReminders) return;
    
    const checkDueTasks = () => {
      const today = new Date().toISOString().split('T')[0];
      const dueTasks = tasks.filter(task => 
        task.status !== 'done' && 
        task.dueDate === today
      );
      
      dueTasks.forEach(task => {
        addNotification('warning', `Task "${task.title}" is due today!`);
      });
    };
    
    // Check immediately on component mount and when dependencies change
    if (tasks.length > 0) {
      checkDueTasks();
    }
    
    // Check every hour
    const interval = setInterval(checkDueTasks, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [tasks, settings.taskReminders]);

  // Modern Header Component with Enhanced Neumorphism
  const renderHeader = () => {
    // const actualTheme = getActualTheme();
    return (
    <header style={{
      background: 'var(--bg-secondary)',
      border: 'none',
      padding: '0',
      position: 'sticky',
      top: '20px',
      zIndex: 100,
      boxShadow: 'var(--neu-raised)',
      borderRadius: '32px',
      margin: '20px',
      backdropFilter: 'blur(20px)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 40px',
        position: 'relative'
      }}>
        
        {/* Enhanced Logo Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          zIndex: 1
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            boxShadow: 'var(--neu-subtle)',
            color: 'white',
            fontWeight: '800',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, rgba(255,255,255,0.2) 0%, transparent 100%)',
              borderRadius: '20px'
            }}></div>
            ✓
          </div>
          <div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '900',
              color: 'var(--text-primary)',
              margin: 0,
              letterSpacing: '-1.5px',
              background: `linear-gradient(135deg, var(--text-primary) 0%, var(--accent-primary) 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              TaskFlow
            </h1>
            <p style={{
              fontSize: '14px',
              color: 'var(--text-muted)',
              margin: 0,
              fontWeight: '600',
              letterSpacing: '0.5px',
              textTransform: 'uppercase'
            }}>
              Professional Workspace
            </p>
          </div>
        </div>

        {/* Compact Navigation */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: 'var(--bg-primary)',
          padding: '8px',
          borderRadius: '24px',
          boxShadow: 'var(--neu-pressed)',
          zIndex: 1,
          transition: 'all 0.3s ease',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'project', label: 'Projects', icon: '🚀' },
            { id: 'tasks', label: 'Tasks', icon: '✅' },
            { id: 'settings', label: 'Settings', icon: '⚙️' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className="neu-button focus-ring"
              title={item.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                background: currentView === item.id 
                  ? `linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)`
                  : 'var(--bg-secondary)',
                border: 'none',
                borderRadius: '16px',
                color: currentView === item.id ? 'white' : 'var(--text-primary)',
                fontSize: '14px',
                fontWeight: currentView === item.id ? '700' : '600',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: currentView === item.id 
                  ? '0 6px 16px rgba(59, 130, 246, 0.4)'
                  : 'var(--neu-subtle)',
                position: 'relative',
                overflow: 'hidden',
                textShadow: currentView === item.id ? '0 1px 2px rgba(0,0,0,0.3)' : 'none',
                minWidth: 'auto'
              }}
              onMouseEnter={(e) => {
                if (currentView !== item.id) {
                  (e.target as HTMLButtonElement).style.boxShadow = 'var(--neu-raised)';
                  (e.target as HTMLButtonElement).style.transform = 'translateY(-1px) scale(1.02)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentView !== item.id) {
                  (e.target as HTMLButtonElement).style.boxShadow = 'var(--neu-subtle)';
                  (e.target as HTMLButtonElement).style.transform = 'translateY(0) scale(1)';
                }
              }}
            >
              <span style={{ 
                fontSize: '18px',
                filter: currentView === item.id ? 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' : 'none'
              }}>
                {item.icon}
              </span>
              <span style={{ 
                letterSpacing: '0.3px',
                display: window.innerWidth > 768 ? 'block' : 'none'
              }}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* User Actions */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          {/* Notifications */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '16px',
                background: 'var(--bg-secondary)',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                boxShadow: 'var(--neu-subtle)'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.boxShadow = 'var(--neu-pressed)';
                (e.target as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.boxShadow = 'var(--neu-subtle)';
                (e.target as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              🔔
              {notifications.filter(n => !n.read).length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  color: 'white',
                  borderRadius: '50%',
                  width: '22px',
                  height: '22px',
                  fontSize: '11px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid var(--bg-secondary)',
                  boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)',
                  animation: 'pulse 2s infinite'
                }}>
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </button>
            
            {showNotifications && (
              <div className="notification-scroll" style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '12px',
                background: 'var(--card-bg)',
                border: 'none',
                borderRadius: '24px',
                boxShadow: 'var(--neu-raised)',
                width: '360px',
                maxHeight: '480px',
                overflowY: 'auto',
                zIndex: 1000,
                animation: 'slideIn 0.3s ease-out'
              }}>
                <div style={{ 
                  padding: '24px 24px 20px 24px', 
                  borderBottom: '1px solid var(--card-border)' 
                }}>
                  <h4 style={{ 
                    margin: 0, 
                    color: 'var(--text-primary)', 
                    fontSize: '18px',
                    fontWeight: '700',
                    letterSpacing: '-0.5px'
                  }}>
                    Notifications
                  </h4>
                  <p style={{
                    margin: '4px 0 0 0',
                    color: 'var(--text-muted)',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    {notifications.filter(n => !n.read).length} unread messages
                  </p>
                </div>
                {notifications.length === 0 ? (
                  <div style={{ 
                    padding: '32px 20px', 
                    textAlign: 'center', 
                    color: 'var(--text-muted)' 
                  }}>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔔</div>
                    <p style={{ margin: 0, fontSize: '14px' }}>No notifications</p>
                  </div>
                ) : (
                  notifications.slice(0, 5).map(notif => (
                    <div 
                      key={notif.id} 
                      style={{
                        padding: '16px 20px',
                        borderBottom: '1px solid var(--card-border)',
                        background: notif.read ? 'transparent' : 'var(--hover-bg)',
                        cursor: 'pointer',
                        transition: 'background 0.2s ease'
                      }}
                      onClick={() => markNotificationAsRead(notif.id)}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.background = 'var(--hover-bg)';
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.background = notif.read ? 'transparent' : 'var(--hover-bg)';
                      }}
                    >
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px'
                      }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          background: notif.type === 'success' 
                            ? 'linear-gradient(45deg, #4CAF50, #8BC34A)' 
                            : notif.type === 'error' 
                            ? 'linear-gradient(45deg, #F44336, #FF5722)' 
                            : 'linear-gradient(45deg, #2196F3, #03A9F4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                          flexShrink: 0
                        }}>
                          {notif.type === 'success' ? '✅' : notif.type === 'error' ? '❌' : 'ℹ️'}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{
                            margin: '0 0 4px 0',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: 'var(--text-primary)',
                            lineHeight: '1.4'
                          }}>
                            {notif.message}
                          </p>
                          <p style={{
                            margin: 0,
                            fontSize: '12px',
                            color: 'var(--text-muted)',
                            fontWeight: '400'
                          }}>
                            {notif.time}
                          </p>
                        </div>
                        {!notif.read && (
                          <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: settings.theme === 'dark' ? '#60a5fa' : '#3498db',
                            flexShrink: 0,
                            marginTop: '4px'
                          }} />
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Compact User Profile */}
          <div 
            onClick={() => setCurrentView('profile')}
            className="neu-button focus-ring"
            title={`${user.name} - ${user.role}`}
            style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 16px 8px 8px',
            background: 'var(--bg-secondary)',
            borderRadius: '24px',
            border: 'none',
            boxShadow: 'var(--neu-subtle)',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px) scale(1.02)';
            e.currentTarget.style.boxShadow = 'var(--neu-raised)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = 'var(--neu-subtle)';
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '16px',
              background: profileFormData.profileImage 
                ? `url(${profileFormData.profileImage})`
                : `linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '18px',
              fontWeight: '700',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              flexShrink: 0,
              flexGrow: 0,
              minWidth: '40px',
              minHeight: '40px',
              maxWidth: '40px',
              maxHeight: '40px',
              overflow: 'hidden'
            }}>
              {!profileFormData.profileImage && (
                <>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, rgba(255,255,255,0.3) 0%, transparent 100%)',
                    borderRadius: '16px'
                  }}></div>
                  {user.name.split(' ').map(n => n[0]).join('')}
                </>
              )}
            </div>
            <div style={{ 
              display: window.innerWidth > 1024 ? 'flex' : 'none', 
              flexDirection: 'column', 
              alignItems: 'flex-start' 
            }}>
              <span style={{
                color: 'var(--text-primary)',
                fontSize: '14px',
                fontWeight: '700',
                lineHeight: '1.2',
                letterSpacing: '-0.3px'
              }}>
                {user.name}
              </span>
              <span style={{
                color: 'var(--text-muted)',
                fontSize: '12px',
                fontWeight: '600',
                letterSpacing: '0.3px',
                textTransform: 'uppercase'
              }}>
                {user.role}
              </span>
            </div>
          </div>

          {/* Compact Logout Button */}
          <button
            onClick={handleLogout}
            className="neu-button focus-ring"
            title="Logout"
            style={{
              padding: '12px 20px',
              background: `linear-gradient(135deg, var(--accent-error) 0%, #dc2626 100%)`,
              border: 'none',
              borderRadius: '16px',
              color: 'white',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 6px 16px rgba(239, 68, 68, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
              letterSpacing: '0.3px',
              textTransform: 'uppercase',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.transform = 'translateY(-2px) scale(1.05)';
              (e.target as HTMLElement).style.boxShadow = '0 8px 20px rgba(239, 68, 68, 0.6), inset 0 1px 0 rgba(255,255,255,0.3)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.transform = 'translateY(0) scale(1)';
              (e.target as HTMLElement).style.boxShadow = '0 6px 16px rgba(239, 68, 68, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)';
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Enhanced Modern CSS Animations */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes slideIn {
          from { 
            opacity: 0; 
            transform: translateY(-20px) scale(0.95); 
            filter: blur(10px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
            filter: blur(0);
          }
        }
        
        @keyframes glow {
          0%, 100% { 
            box-shadow: 0 0 10px var(--accent-primary), 
                        0 0 20px var(--accent-primary), 
                        0 0 30px var(--accent-primary); 
          }
          50% { 
            box-shadow: 0 0 20px var(--accent-primary), 
                        0 0 40px var(--accent-primary), 
                        0 0 60px var(--accent-primary); 
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        /* Enhanced scrollbar styling */
        .notification-scroll::-webkit-scrollbar {
          width: 6px;
        }
        
        .notification-scroll::-webkit-scrollbar-track {
          background: var(--bg-tertiary);
          border-radius: 10px;
        }
        
        .notification-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          border-radius: 10px;
          transition: all 0.3s ease;
        }
        
        .notification-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, var(--accent-secondary), var(--accent-primary));
        }
        
        /* Backdrop filter support */
        .backdrop-blur {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        
        .notification-scroll::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.05);
          border-radius: 2px;
        }
        
        .notification-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 2px;
        }
        
        .notification-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
        }
      `}</style>
    </header>
    );
  };

  // Loading screen
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: settings.theme === 'dark' ? '4px solid #404040' : '4px solid #e3e3e3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{ fontSize: '18px', color: 'var(--text-muted)' }}>Signing you in...</p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  // Main dashboard when logged in
  if (isLoggedIn) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-secondary)',
        fontFamily: 'Arial, sans-serif',
        color: 'var(--text-primary)',
        transition: 'all 0.3s ease'
      }}>
        {renderHeader()}

        {/* Modern Task Creation Modal */}
        {showCreateTask && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <div style={{
              backgroundColor: 'var(--card-bg)',
              borderRadius: '24px',
              padding: '40px',
              width: '600px',
              maxWidth: '90vw',
              border: '1px solid var(--card-border)',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
              transform: 'scale(1)',
              animation: 'modalSlide 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
              {/* Header */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '32px'
              }}>
                <div>
                  <h3 style={{ 
                    margin: '0 0 8px 0', 
                    color: 'var(--text-primary)',
                    fontSize: '24px',
                    fontWeight: '800',
                    letterSpacing: '-0.5px'
                  }}>Create New Task</h3>
                  <p style={{
                    margin: 0,
                    color: 'var(--text-muted)',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>Add a new task to your workflow</p>
                </div>
                <button
                  onClick={() => setShowCreateTask(false)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    border: 'none',
                    background: settings.theme === 'dark' 
                      ? 'linear-gradient(135deg, var(--bg-tertiary) 0%, var(--hover-bg) 100%)'
                      : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--accent-error)';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = settings.theme === 'dark' 
                      ? 'linear-gradient(135deg, var(--bg-tertiary) 0%, var(--hover-bg) 100%)'
                      : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)';
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  ✕
                </button>
              </div>
              
              {/* Form */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Task Title */}
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    color: 'var(--text-primary)', 
                    fontSize: '14px', 
                    fontWeight: '600',
                    letterSpacing: '-0.1px'
                  }}>
                    Task Title *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter a descriptive task title..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      border: '2px solid var(--input-border)',
                      borderRadius: '12px',
                      fontSize: '16px',
                      boxSizing: 'border-box',
                      backgroundColor: 'var(--input-bg)',
                      color: 'var(--text-primary)',
                      fontFamily: 'Inter, system-ui, sans-serif',
                      transition: 'all 0.2s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent-primary)';
                      e.currentTarget.style.boxShadow = '0 0 0 4px var(--accent-primary)20';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--input-border)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
                
                {/* Task Description */}
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    color: 'var(--text-primary)', 
                    fontSize: '14px', 
                    fontWeight: '600',
                    letterSpacing: '-0.1px'
                  }}>
                    Description
                  </label>
                  <textarea
                    placeholder="Provide additional details about this task..."
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      border: '2px solid var(--input-border)',
                      borderRadius: '12px',
                      fontSize: '16px',
                      minHeight: '100px',
                      boxSizing: 'border-box',
                      resize: 'vertical',
                      backgroundColor: 'var(--input-bg)',
                      color: 'var(--text-primary)',
                      fontFamily: 'Inter, system-ui, sans-serif',
                      transition: 'all 0.2s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent-primary)';
                      e.currentTarget.style.boxShadow = '0 0 0 4px var(--accent-primary)20';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--input-border)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
                
                {/* Priority and Project Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      color: 'var(--text-primary)', 
                      fontSize: '14px', 
                      fontWeight: '600',
                      letterSpacing: '-0.1px'
                    }}>
                      Priority
                    </label>
                    <select
                      value={newTaskPriority}
                      onChange={(e) => setNewTaskPriority(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '16px 20px',
                        border: '2px solid var(--input-border)',
                        borderRadius: '12px',
                        fontSize: '16px',
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--text-primary)',
                        fontFamily: 'Inter, system-ui, sans-serif',
                        cursor: 'pointer',
                        outline: 'none'
                      }}
                    >
                      <option value="low">🟢 Low Priority</option>
                      <option value="medium">🟡 Medium Priority</option>
                      <option value="high">🔴 High Priority</option>
                    </select>
                  </div>
                  
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      color: 'var(--text-primary)', 
                      fontSize: '14px', 
                      fontWeight: '600',
                      letterSpacing: '-0.1px'
                    }}>
                      Project
                    </label>
                    <select
                      value={newTaskProject}
                      onChange={(e) => setNewTaskProject(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '16px 20px',
                        border: '2px solid var(--input-border)',
                        borderRadius: '12px',
                        fontSize: '16px',
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--text-primary)',
                        fontFamily: 'Inter, system-ui, sans-serif',
                        cursor: 'pointer',
                        outline: 'none'
                      }}
                    >
                      <option value="General">📋 General</option>
                      {projects.map(project => (
                        <option key={project.id} value={project.name}>🚀 {project.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Assignee and Hours Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      color: 'var(--text-primary)', 
                      fontSize: '14px', 
                      fontWeight: '600',
                      letterSpacing: '-0.1px'
                    }}>
                      Assignee
                    </label>
                    <select
                      value={newTaskAssignee}
                      onChange={(e) => setNewTaskAssignee(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '16px 20px',
                        border: '2px solid var(--input-border)',
                        borderRadius: '12px',
                        fontSize: '16px',
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--text-primary)',
                        fontFamily: 'Inter, system-ui, sans-serif',
                        cursor: 'pointer',
                        outline: 'none'
                      }}
                    >
                      <option value="">👤 Unassigned</option>
                      {teamMembers.map(member => (
                        <option key={member.id} value={member.id}>👤 {member.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      color: 'var(--text-primary)', 
                      fontSize: '14px', 
                      fontWeight: '600',
                      letterSpacing: '-0.1px'
                    }}>
                      Estimated Hours
                    </label>
                    <input
                      type="number"
                      placeholder="8"
                      value={newTaskEstimatedHours}
                      onChange={(e) => setNewTaskEstimatedHours(Number(e.target.value))}
                      min="0.5"
                      step="0.5"
                      style={{
                        width: '100%',
                        padding: '16px 20px',
                        border: '2px solid var(--input-border)',
                        borderRadius: '12px',
                        fontSize: '16px',
                        boxSizing: 'border-box',
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--text-primary)',
                        fontFamily: 'Inter, system-ui, sans-serif',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent-primary)';
                        e.currentTarget.style.boxShadow = '0 0 0 4px var(--accent-primary)20';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'var(--input-border)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>
                
                {/* Tags and Due Date Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      color: 'var(--text-primary)', 
                      fontSize: '14px', 
                      fontWeight: '600',
                      letterSpacing: '-0.1px'
                    }}>
                      Tags
                    </label>
                    <input
                      type="text"
                      placeholder="urgent, backend, bug-fix"
                      value={newTaskTags}
                      onChange={(e) => setNewTaskTags(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '16px 20px',
                        border: '2px solid var(--input-border)',
                        borderRadius: '12px',
                        fontSize: '16px',
                        boxSizing: 'border-box',
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--text-primary)',
                        fontFamily: 'Inter, system-ui, sans-serif',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent-primary)';
                        e.currentTarget.style.boxShadow = '0 0 0 4px var(--accent-primary)20';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'var(--input-border)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      color: 'var(--text-primary)', 
                      fontSize: '14px', 
                      fontWeight: '600',
                      letterSpacing: '-0.1px'
                    }}>
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={newTaskDueDate}
                      onChange={(e) => setNewTaskDueDate(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '16px 20px',
                        border: '2px solid var(--input-border)',
                        borderRadius: '12px',
                        fontSize: '16px',
                        boxSizing: 'border-box',
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--text-primary)',
                        fontFamily: 'Inter, system-ui, sans-serif',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent-primary)';
                        e.currentTarget.style.boxShadow = '0 0 0 4px var(--accent-primary)20';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'var(--input-border)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div style={{ 
                display: 'flex', 
                gap: '12px', 
                marginTop: '32px',
                paddingTop: '24px',
                borderTop: '1px solid var(--card-border)'
              }}>
                <button
                  onClick={() => setShowCreateTask(false)}
                  style={{
                    flex: 1,
                    padding: '16px 24px',
                    backgroundColor: 'transparent',
                    color: 'var(--text-muted)',
                    border: '2px solid var(--card-border)',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '600',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
                    e.currentTarget.style.borderColor = 'var(--text-muted)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = 'var(--card-border)';
                    e.currentTarget.style.color = 'var(--text-muted)';
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={addTask}
                  style={{
                    flex: 1,
                    padding: '16px 24px',
                    background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-primary)dd 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '700',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    boxShadow: '0 4px 12px var(--accent-primary)40',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px var(--accent-primary)50';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px var(--accent-primary)40';
                  }}
                >
                  ✨ Create Task
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Project Creation Modal */}
        {showCreateProject && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: 'var(--card-bg)',
              borderRadius: '12px',
              padding: '30px',
              width: '500px',
              maxWidth: '90vw',
              border: '1px solid var(--card-border)',
              boxShadow: '0 10px 25px var(--shadow-color)'
            }}>
              <h3 style={{ margin: '0 0 20px 0', color: 'var(--text-primary)' }}>Create New Project</h3>
              <input
                type="text"
                placeholder="Project name..."
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid var(--input-border)',
                  borderRadius: '6px',
                  marginBottom: '15px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  backgroundColor: 'var(--input-bg)',
                  color: 'var(--text-primary)'
                }}
              />
              <textarea
                placeholder="Project description..."
                value={newProjectDescription}
                onChange={(e) => setNewProjectDescription(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid var(--input-border)',
                  borderRadius: '6px',
                  marginBottom: '15px',
                  fontSize: '16px',
                  minHeight: '80px',
                  boxSizing: 'border-box',
                  resize: 'vertical',
                  backgroundColor: 'var(--input-bg)',
                  color: 'var(--text-primary)'
                }}
              />
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)' }}>Project Color</label>
                <input
                  type="color"
                  value={newProjectColor}
                  onChange={(e) => setNewProjectColor(e.target.value)}
                  style={{
                    width: '60px',
                    height: '40px',
                    border: '1px solid var(--input-border)',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={addProject}
                  style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: '#27ae60',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  Create Project
                </button>
                <button
                  onClick={() => setShowCreateProject(false)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: '#95a5a6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Project Modal */}
        {showEditProject && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: 'var(--card-bg)',
              borderRadius: '12px',
              padding: '30px',
              width: '500px',
              maxWidth: '90vw',
              border: '1px solid var(--card-border)',
              boxShadow: '0 10px 25px var(--shadow-color)'
            }}>
              <h3 style={{ margin: '0 0 20px 0', color: 'var(--text-primary)' }}>Edit Project</h3>
              <input
                type="text"
                placeholder="Project name..."
                value={editProjectName}
                onChange={(e) => setEditProjectName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid var(--input-border)',
                  borderRadius: '6px',
                  marginBottom: '15px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  backgroundColor: 'var(--input-bg)',
                  color: 'var(--text-primary)'
                }}
              />
              <textarea
                placeholder="Project description..."
                value={editProjectDescription}
                onChange={(e) => setEditProjectDescription(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid var(--input-border)',
                  borderRadius: '6px',
                  marginBottom: '15px',
                  fontSize: '16px',
                  minHeight: '80px',
                  boxSizing: 'border-box',
                  resize: 'vertical',
                  backgroundColor: 'var(--input-bg)',
                  color: 'var(--text-primary)'
                }}
              />
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)' }}>Project Color</label>
                <input
                  type="color"
                  value={editProjectColor}
                  onChange={(e) => setEditProjectColor(e.target.value)}
                  style={{
                    width: '60px',
                    height: '40px',
                    border: '1px solid var(--input-border)',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)' }}>Start Date</label>
                  <input
                    type="date"
                    value={editProjectStartDate}
                    onChange={(e) => setEditProjectStartDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid var(--input-border)',
                      borderRadius: '6px',
                      fontSize: '15px',
                      backgroundColor: 'var(--input-bg)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)' }}>End Date</label>
                  <input
                    type="date"
                    value={editProjectEndDate}
                    onChange={(e) => setEditProjectEndDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid var(--input-border)',
                      borderRadius: '6px',
                      fontSize: '15px',
                      backgroundColor: 'var(--input-bg)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)' }}>Budget ($)</label>
                <input
                  type="number"
                  min={0}
                  value={editProjectBudget}
                  onChange={(e) => setEditProjectBudget(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid var(--input-border)',
                    borderRadius: '6px',
                    fontSize: '15px',
                    backgroundColor: 'var(--input-bg)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)' }}>Status</label>
                <select
                  value={editProjectStatus}
                  onChange={(e) => setEditProjectStatus(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid var(--input-border)',
                    borderRadius: '6px',
                    fontSize: '15px',
                    backgroundColor: 'var(--input-bg)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="on-hold">On Hold</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={handleEditProject}
                  style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: '#27ae60',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setShowEditProject(false)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: '#95a5a6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Task Modal */}
        {showEditTask && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: 'var(--card-bg)',
              padding: '30px',
              borderRadius: '16px',
              width: '500px',
              maxWidth: '90vw',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 10px 25px var(--shadow-color)',
              border: '1px solid var(--card-border)'
            }}>
              <h2 style={{ marginBottom: '20px', color: 'var(--text-primary)' }}>✏️ Edit Task</h2>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)' }}>Task Title</label>
                <input
                  type="text"
                  value={editTaskTitle}
                  onChange={(e) => setEditTaskTitle(e.target.value)}
                  placeholder="Enter task title..."
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid var(--input-border)',
                    borderRadius: '8px',
                    fontSize: '15px',
                    backgroundColor: 'var(--input-bg)',
                    color: 'var(--text-primary)',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)' }}>Description</label>
                <textarea
                  value={editTaskDescription}
                  onChange={(e) => setEditTaskDescription(e.target.value)}
                  placeholder="Enter task description..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid var(--input-border)',
                    borderRadius: '8px',
                    fontSize: '15px',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                    backgroundColor: 'var(--input-bg)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)' }}>Priority</label>
                  <select
                    value={editTaskPriority}
                    onChange={(e) => setEditTaskPriority(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid var(--input-border)',
                      borderRadius: '8px',
                      fontSize: '15px',
                      backgroundColor: 'var(--input-bg)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <option value="low">🟢 Low</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="high">🔴 High</option>
                  </select>
                </div>
                
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)' }}>Status</label>
                  <select
                    value={editTaskStatus}
                    onChange={(e) => setEditTaskStatus(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid var(--input-border)',
                      borderRadius: '8px',
                      fontSize: '15px',
                      backgroundColor: 'var(--input-bg)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <option value="todo">📋 To Do</option>
                    <option value="in-progress">🚀 In Progress</option>
                    <option value="done">✅ Done</option>
                  </select>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)' }}>Project</label>
                  <select
                    value={editTaskProject}
                    onChange={(e) => setEditTaskProject(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid var(--input-border)',
                      borderRadius: '8px',
                      fontSize: '15px',
                      backgroundColor: 'var(--input-bg)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <option value="General">General</option>
                    {projects.map(project => (
                      <option key={project.id} value={project.name}>{project.name}</option>
                    ))}
                  </select>
                </div>
                
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)' }}>Due Date</label>
                  <input
                    type="date"
                    value={editTaskDueDate}
                    onChange={(e) => setEditTaskDueDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid var(--input-border)',
                      borderRadius: '8px',
                      fontSize: '15px',
                      backgroundColor: 'var(--input-bg)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)' }}>Estimated Hours</label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={editTaskEstimatedHours}
                    onChange={(e) => setEditTaskEstimatedHours(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid var(--input-border)',
                      borderRadius: '8px',
                      fontSize: '15px',
                      backgroundColor: 'var(--input-bg)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
                
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)' }}>Completed Hours</label>
                  <input
                    type="number"
                    min={0}
                    max={editTaskEstimatedHours}
                    value={editTaskCompletedHours}
                    onChange={(e) => setEditTaskCompletedHours(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid var(--input-border)',
                      borderRadius: '8px',
                      fontSize: '15px',
                      backgroundColor: 'var(--input-bg)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={handleEditTask}
                  style={{
                    flex: 1,
                    padding: '14px',
                    background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                >
                  💾 Save Changes
                </button>
                <button
                  onClick={() => setShowEditTask(false)}
                  style={{
                    flex: 1,
                    padding: '14px',
                    backgroundColor: '#95a5a6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Task Details Modal */}
        {showTaskDetails && selectedTask && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: 'var(--card-bg)',
              borderRadius: '12px',
              padding: '30px',
              width: '600px',
              maxWidth: '90vw',
              maxHeight: '80vh',
              overflowY: 'auto',
              border: '1px solid var(--card-border)',
              boxShadow: '0 10px 25px var(--shadow-color)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>{selectedTask.title}</h3>
                <button
                  onClick={() => setShowTaskDetails(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '20px',
                    cursor: 'pointer',
                    color: 'var(--text-muted)'
                  }}
                >
                  ✕
                </button>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{selectedTask.description}</p>
                
                {/* Tags Display */}
                {selectedTask.tags && selectedTask.tags.length > 0 && (
                  <div style={{ marginTop: '16px' }}>
                    <strong style={{ color: 'var(--text-primary)', fontSize: '14px' }}>Tags: </strong>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                      {selectedTask.tags.map((tag: string, index: number) => (
                        <span key={index} style={{
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '500',
                          backgroundColor: 'var(--input-bg)',
                          color: 'var(--text-primary)',
                          border: '1px solid var(--card-border)'
                        }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>Priority:</strong>
                  <span style={{
                    marginLeft: '10px',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    backgroundColor: selectedTask.priority === 'high' 
                      ? (settings.theme === 'dark' ? 'rgba(239, 68, 68, 0.2)' : '#ffebee')
                      : selectedTask.priority === 'medium' 
                        ? (settings.theme === 'dark' ? 'rgba(245, 158, 11, 0.2)' : '#fff3e0')
                        : (settings.theme === 'dark' ? 'rgba(16, 185, 129, 0.2)' : '#e8f5e8'),
                    color: selectedTask.priority === 'high' ? '#ef4444' : selectedTask.priority === 'medium' ? '#f59e0b' : '#10b981'
                  }}>
                    {selectedTask.priority.toUpperCase()}
                  </span>
                </div>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>Status:</strong>
                  <span style={{
                    marginLeft: '10px',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    backgroundColor: selectedTask.status === 'done' 
                      ? (settings.theme === 'dark' ? 'rgba(16, 185, 129, 0.2)' : '#e8f5e8')
                      : selectedTask.status === 'in-progress' 
                        ? (settings.theme === 'dark' ? 'rgba(245, 158, 11, 0.2)' : '#fff3e0')
                        : (settings.theme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : '#e3f2fd'),
                    color: selectedTask.status === 'done' ? '#10b981' : selectedTask.status === 'in-progress' ? '#f59e0b' : '#3b82f6'
                  }}>
                    {selectedTask.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>Project:</strong> 
                  <span style={{ color: 'var(--text-muted)', marginLeft: '8px' }}>{selectedTask.project}</span>
                </div>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>Assignee:</strong>
                  <span style={{ color: 'var(--text-muted)', marginLeft: '8px' }}>{selectedTask.assignee}</span>
                </div>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>Due Date:</strong>
                  <span style={{ color: 'var(--text-muted)', marginLeft: '8px' }}>{formatDate(selectedTask.dueDate)}</span>
                </div>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>Created:</strong>
                  <span style={{ color: 'var(--text-muted)', marginLeft: '8px' }}>{selectedTask.createdAt}</span>
                </div>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>Estimated Hours:</strong>
                  <span style={{ color: 'var(--text-muted)', marginLeft: '8px' }}>{selectedTask.estimatedHours}h</span>
                </div>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>Completed Hours:</strong>
                  <span style={{ color: 'var(--text-muted)', marginLeft: '8px' }}>{selectedTask.completedHours}h</span>
                </div>
              </div>
              
              {/* Comments Section */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>Comments</h4>
                
                {/* Comments List */}
                <div style={{ 
                  maxHeight: '200px', 
                  overflowY: 'auto',
                  marginBottom: '16px',
                  border: '1px solid var(--card-border)',
                  borderRadius: '8px',
                  padding: '12px'
                }}>
                  {selectedTask.comments && selectedTask.comments.length > 0 ? (
                    selectedTask.comments.map((comment: any, index: number) => (
                      <div key={index} style={{
                        padding: '8px 0',
                        borderBottom: index < selectedTask.comments.length - 1 ? '1px solid var(--card-border)' : 'none'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <strong style={{ fontSize: '12px', color: 'var(--text-primary)' }}>{comment.author}</strong>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{comment.timestamp}</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>{comment.text}</p>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px', fontStyle: 'italic', margin: 0 }}>
                      No comments yet. Be the first to add one!
                    </p>
                  )}
                </div>
                
                {/* Add Comment Form */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      border: '1px solid var(--input-border)',
                      borderRadius: '6px',
                      fontSize: '13px',
                      backgroundColor: 'var(--input-bg)',
                      color: 'var(--text-primary)'
                    }}
                  />
                  <button
                    onClick={() => {
                      if (newComment.trim()) {
                        const updatedTask = {
                          ...selectedTask,
                          comments: [
                            ...(selectedTask.comments || []),
                            {
                              author: user.name,
                              text: newComment.trim(),
                              timestamp: new Date().toLocaleDateString()
                            }
                          ]
                        };
                        setTasks(tasks.map(t => t.id === selectedTask.id ? updatedTask : t));
                        setSelectedTask(updatedTask);
                        setNewComment('');
                        addNotification('success', 'Comment added successfully!');
                      }
                    }}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#3498db',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}
                  >
                    Post
                  </button>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                {selectedTask.status !== 'done' && (
                  <button
                    onClick={() => {
                      updateTaskStatus(selectedTask.id, 'done');
                      setShowTaskDetails(false);
                    }}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#27ae60',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Mark Complete
                  </button>
                )}
                <button
                  onClick={() => {
                    deleteTask(selectedTask.id);
                    setShowTaskDetails(false);
                  }}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Delete Task
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div style={{ padding: '40px' }}>
          {currentView === 'dashboard' && (
            <>
              <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div>
                    <h2 style={{ color: 'var(--text-primary)', marginBottom: '10px' }}>Welcome back, {user.name}! 👋</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>Here's an overview of your projects and tasks</p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <button
                      onClick={() => setShowCreateTask(true)}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      ➕ Quick Task
                    </button>
                  </div>
                </div>

                {/* Search and Filter Bar */}
                <div style={{
                  backgroundColor: 'var(--card-bg)',
                  padding: '24px',
                  borderRadius: '16px',
                  boxShadow: 'var(--neu-subtle)',
                  marginBottom: '30px',
                  border: 'none'
                }}>
                  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
                      <input
                        type="text"
                        placeholder="🔍 Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '14px 20px',
                          border: 'none',
                          borderRadius: '12px',
                          fontSize: '15px',
                          boxSizing: 'border-box',
                          transition: 'all 0.2s ease',
                          outline: 'none',
                          backgroundColor: 'var(--input-bg)',
                          color: 'var(--text-primary)',
                          boxShadow: 'var(--neu-subtle)'
                        }}
                        onFocus={(e) => {
                          (e.target as HTMLElement).style.boxShadow = 'inset 3px 3px 6px var(--neu-shadow-dark), inset -3px -3px 6px var(--neu-shadow-light)';
                        }}
                        onBlur={(e) => {
                          (e.target as HTMLElement).style.boxShadow = 'var(--neu-subtle)';
                        }}
                      />
                    </div>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      style={{
                        padding: '14px 18px',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '15px',
                        minWidth: '140px',
                        outline: 'none',
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--text-primary)',
                        boxShadow: 'var(--neu-subtle)',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="all">All Status</option>
                      <option value="todo">To Do</option>
                      <option value="in-progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                    <select
                      value={filterPriority}
                      onChange={(e) => setFilterPriority(e.target.value)}
                      style={{
                        padding: '14px 18px',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '15px',
                        minWidth: '140px',
                        outline: 'none',
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--text-primary)',
                        boxShadow: 'var(--neu-subtle)',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="all">All Priority</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                    <select
                      value={selectedTag}
                      onChange={(e) => setSelectedTag(e.target.value)}
                      style={{
                        padding: '14px 18px',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '15px',
                        minWidth: '140px',
                        outline: 'none',
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--text-primary)',
                        boxShadow: 'var(--neu-subtle)',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="all">All Tags</option>
                      {Array.from(new Set(tasks.flatMap(task => task.tags || []))).map(tag => (
                        <option key={tag} value={tag}>{tag}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setFilterStatus('all');
                        setFilterPriority('all');
                        setSelectedTag('all');
                      }}
                      style={{
                        padding: '14px 20px',
                        backgroundColor: 'var(--card-bg)',
                        color: 'var(--text-primary)',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                        boxShadow: 'var(--neu-subtle)',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.boxShadow = 'inset 2px 2px 4px var(--neu-shadow-dark), inset -2px -2px 4px var(--neu-shadow-light)';
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.boxShadow = 'var(--neu-subtle)';
                      }}
                    >
                      Clear
                    </button>
                  </div>
                  {(searchQuery || filterStatus !== 'all' || filterPriority !== 'all' || selectedTag !== 'all') && (
                    <div style={{ marginTop: '15px', fontSize: '14px', color: 'var(--text-muted)' }}>
                      Showing <strong>{getFilteredTasks().length}</strong> of <strong>{tasks.length}</strong> tasks
                      {(searchQuery || filterStatus !== 'all' || filterPriority !== 'all' || selectedTag !== 'all') && (
                        <span style={{ color: '#3498db' }}> (filtered)</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Modern Stats Cards */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '24px', 
                marginBottom: '40px' 
              }}>
                <div style={{
                  background: 'var(--card-bg)',
                  color: 'var(--text-primary)',
                  padding: '32px',
                  borderRadius: '20px',
                  boxShadow: 'var(--neu-raised)',
                  textAlign: 'center',
                  border: '1px solid var(--card-border)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}>
                  {/* Gradient Overlay */}
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(135deg, var(--accent-primary)15 0%, transparent 70%)',
                    borderRadius: '50%',
                    transform: 'translate(30px, -30px)'
                  }} />
                  
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{
                      width: '72px',
                      height: '72px',
                      margin: '0 auto 20px',
                      background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-primary)cc 100%)',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px',
                      boxShadow: '0 8px 24px var(--accent-primary)40',
                      transform: 'rotate(-5deg)'
                    }}>📋</div>
                    
                    <h3 style={{ 
                      fontSize: '36px', 
                      margin: '0 0 8px 0', 
                      fontWeight: '900',
                      color: 'var(--text-primary)',
                      letterSpacing: '-1px'
                    }}>
                      {tasks.length}
                    </h3>
                    
                    <p style={{ 
                      margin: '0 0 12px 0', 
                      color: 'var(--text-primary)',
                      fontSize: '16px',
                      fontWeight: '600',
                      letterSpacing: '-0.2px'
                    }}>Total Tasks</p>
                    
                    <div style={{
                      padding: '8px 16px',
                      background: settings.theme === 'dark' 
                        ? 'linear-gradient(135deg, var(--bg-tertiary) 0%, var(--hover-bg) 100%)'
                        : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                      borderRadius: '12px',
                      border: '1px solid var(--card-border)',
                      display: 'inline-block'
                    }}>
                      <p style={{ 
                        margin: 0, 
                        fontSize: '13px', 
                        color: 'var(--text-muted)',
                        fontWeight: '600'
                      }}>
                        {getFilteredTasks().length} matching filters
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{
                  background: 'var(--card-bg)',
                  color: 'var(--text-primary)',
                  padding: '32px',
                  borderRadius: '20px',
                  boxShadow: 'var(--neu-raised)',
                  textAlign: 'center',
                  border: '1px solid var(--card-border)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}>
                  {/* Gradient Overlay */}
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(135deg, var(--accent-success)15 0%, transparent 70%)',
                    borderRadius: '50%',
                    transform: 'translate(30px, -30px)'
                  }} />
                  
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{
                      width: '72px',
                      height: '72px',
                      margin: '0 auto 20px',
                      background: 'linear-gradient(135deg, var(--accent-success) 0%, var(--accent-success)cc 100%)',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px',
                      boxShadow: '0 8px 24px var(--accent-success)40',
                      transform: 'rotate(5deg)'
                    }}>✅</div>
                    
                    <h3 style={{ 
                      fontSize: '36px', 
                      margin: '0 0 8px 0', 
                      fontWeight: '900',
                      color: 'var(--text-primary)',
                      letterSpacing: '-1px'
                    }}>
                      {tasks.filter(task => task.status === 'done').length}
                    </h3>
                    
                    <p style={{ 
                      margin: '0 0 12px 0', 
                      color: 'var(--text-primary)',
                      fontSize: '16px',
                      fontWeight: '600',
                      letterSpacing: '-0.2px'
                    }}>Completed</p>
                    
                    <div style={{
                      padding: '8px 16px',
                      background: settings.theme === 'dark' 
                        ? 'linear-gradient(135deg, var(--bg-tertiary) 0%, var(--hover-bg) 100%)'
                        : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                      borderRadius: '12px',
                      border: '1px solid var(--card-border)',
                      display: 'inline-block'
                    }}>
                      <p style={{ 
                        margin: 0, 
                        fontSize: '13px', 
                        color: 'var(--text-muted)',
                        fontWeight: '600'
                      }}>
                        {Math.round((tasks.filter(task => task.status === 'done').length / tasks.length) * 100)}% completion rate
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{
                  background: 'var(--card-bg)',
                  color: 'var(--text-primary)',
                  padding: '32px',
                  borderRadius: '20px',
                  boxShadow: 'var(--neu-raised)',
                  textAlign: 'center',
                  border: '1px solid var(--card-border)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}>
                  {/* Gradient Overlay */}
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(135deg, var(--accent-warning)15 0%, transparent 70%)',
                    borderRadius: '50%',
                    transform: 'translate(30px, -30px)'
                  }} />
                  
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{
                      width: '72px',
                      height: '72px',
                      margin: '0 auto 20px',
                      background: 'linear-gradient(135deg, var(--accent-warning) 0%, var(--accent-warning)cc 100%)',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px',
                      boxShadow: '0 8px 24px var(--accent-warning)40',
                      transform: 'rotate(-3deg)'
                    }}>🚀</div>
                    
                    <h3 style={{ 
                      fontSize: '36px', 
                      margin: '0 0 8px 0', 
                      fontWeight: '900',
                      color: 'var(--text-primary)',
                      letterSpacing: '-1px'
                    }}>
                      {tasks.filter(task => task.status === 'in-progress').length}
                    </h3>
                    
                    <p style={{ 
                      margin: '0 0 12px 0', 
                      color: 'var(--text-primary)',
                      fontSize: '16px',
                      fontWeight: '600',
                      letterSpacing: '-0.2px'
                    }}>In Progress</p>
                    
                    <div style={{
                      padding: '8px 16px',
                      background: settings.theme === 'dark' 
                        ? 'linear-gradient(135deg, var(--bg-tertiary) 0%, var(--hover-bg) 100%)'
                        : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                      borderRadius: '12px',
                      border: '1px solid var(--card-border)',
                      display: 'inline-block'
                    }}>
                      <p style={{ 
                        margin: 0, 
                        fontSize: '13px', 
                        color: 'var(--text-muted)',
                        fontWeight: '600'
                      }}>
                        Active work items
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{
                  background: 'var(--card-bg)',
                  color: 'var(--text-primary)',
                  padding: '32px',
                  borderRadius: '20px',
                  boxShadow: 'var(--neu-raised)',
                  textAlign: 'center',
                  border: '1px solid var(--card-border)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}>
                  {/* Gradient Overlay */}
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(135deg, var(--accent-secondary)15 0%, transparent 70%)',
                    borderRadius: '50%',
                    transform: 'translate(30px, -30px)'
                  }} />
                  
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{
                      width: '72px',
                      height: '72px',
                      margin: '0 auto 20px',
                      background: 'linear-gradient(135deg, var(--accent-secondary) 0%, var(--accent-secondary)cc 100%)',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px',
                      boxShadow: '0 8px 24px var(--accent-secondary)40',
                      transform: 'rotate(7deg)'
                    }}>👥</div>
                    
                    <h3 style={{ 
                      fontSize: '36px', 
                      margin: '0 0 8px 0', 
                      fontWeight: '900',
                      color: 'var(--text-primary)',
                      letterSpacing: '-1px'
                    }}>
                      {projects.length}
                    </h3>
                    
                    <p style={{ 
                      margin: '0 0 12px 0', 
                      color: 'var(--text-primary)',
                      fontSize: '16px',
                      fontWeight: '600',
                      letterSpacing: '-0.2px'
                    }}>Projects</p>
                    
                    <div style={{
                      padding: '8px 16px',
                      background: settings.theme === 'dark' 
                        ? 'linear-gradient(135deg, var(--bg-tertiary) 0%, var(--hover-bg) 100%)'
                        : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                      borderRadius: '12px',
                      border: '1px solid var(--card-border)',
                      display: 'inline-block'
                    }}>
                      <p style={{ 
                        margin: 0, 
                        fontSize: '13px', 
                        color: 'var(--text-muted)',
                        fontWeight: '600'
                      }}>
                        {projects.filter(p => p.status === 'active').length} active projects
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tasks and Projects Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                <div style={{
                  backgroundColor: 'var(--card-bg)',
                  borderRadius: '24px',
                  boxShadow: 'var(--neu-raised)',
                  overflow: 'hidden',
                  border: 'none'
                }}>
                  <div style={{ padding: '20px', borderBottom: '1px solid var(--card-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>
                        Recent Tasks ({getFilteredTasks().length})
                      </h3>
                      <button 
                        onClick={() => setCurrentView('tasks')}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#3498db',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          transition: 'background-color 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2980b9'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3498db'}
                      >
                        View All →
                      </button>
                    </div>
                  </div>
                  <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {getFilteredTasks().slice(0, 5).map(task => (
                      <div key={task.id} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        padding: '20px',
                        borderBottom: '1px solid var(--card-border)',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onClick={() => {
                        setSelectedTask(task);
                        setShowTaskDetails(true);
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--hover-bg)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ margin: '0 0 5px 0', color: 'var(--text-primary)', fontWeight: '500' }}>
                            {task.title}
                          </h4>
                          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>
                            {task.project} • Due: {task.dueDate || 'No due date'} • {task.estimatedHours}h estimated
                          </p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            backgroundColor: task.priority === 'high' 
                              ? (settings.theme === 'dark' ? 'rgba(239, 68, 68, 0.2)' : '#ffebee')
                              : task.priority === 'medium' 
                                ? (settings.theme === 'dark' ? 'rgba(245, 158, 11, 0.2)' : '#fff3e0')
                                : (settings.theme === 'dark' ? 'rgba(16, 185, 129, 0.2)' : '#e8f5e8'),
                            color: task.priority === 'high' ? '#ef4444' : task.priority === 'medium' ? '#f59e0b' : '#10b981'
                          }}>
                            {task.priority.toUpperCase()}
                          </span>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            backgroundColor: task.status === 'done' 
                              ? (settings.theme === 'dark' ? 'rgba(16, 185, 129, 0.2)' : '#e8f5e8')
                              : task.status === 'in-progress' 
                                ? (settings.theme === 'dark' ? 'rgba(245, 158, 11, 0.2)' : '#fff3e0')
                                : (settings.theme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : '#e3f2fd'),
                            color: task.status === 'done' ? '#10b981' : task.status === 'in-progress' ? '#f59e0b' : '#3b82f6'
                          }}>
                            {task.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </div>
                      </div>
                    ))}
                    {getFilteredTasks().length === 0 && (
                      <div style={{ textAlign: 'center', padding: '40px' }}>
                        <h4 style={{ color: 'var(--text-muted)', margin: '0 0 10px 0' }}>No tasks found</h4>
                        <p style={{ color: 'var(--text-muted)', margin: 0 }}>Try adjusting your search or filters</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{
                    backgroundColor: 'var(--card-bg)',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px var(--shadow-color)',
                    padding: '20px',
                    border: '1px solid var(--card-border)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Active Projects</h3>
                      <button 
                        onClick={() => setShowCreateProject(true)}
                        style={{
                          padding: '8px 12px',
                          backgroundColor: '#27ae60',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        + New
                      </button>
                    </div>
                    {projects.slice(0, 3).map(project => {
                      const progress = calculateProjectProgress(project.id);
                      return (
                        <div key={project.id} style={{ marginBottom: '20px', cursor: 'pointer' }}
                          onClick={() => setCurrentView('projects')}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <h4 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '14px', fontWeight: '500' }}>
                              {project.name}
                            </h4>
                            <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-muted)' }}>
                              {progress}%
                            </span>
                          </div>
                          <div style={{ 
                            height: '8px', 
                            backgroundColor: settings.theme === 'dark' ? '#404040' : '#ecf0f1', 
                            borderRadius: '4px',
                            overflow: 'hidden',
                            marginBottom: '8px'
                          }}>
                            <div style={{ 
                              height: '100%', 
                              width: `${progress}%`, 
                              backgroundColor: project.color || '#3498db',
                              transition: 'width 0.3s ease'
                            }}></div>
                          </div>
                          <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>
                            {tasks.filter(t => t.project === project.name).length} tasks • {project.members} members
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{
                    backgroundColor: 'var(--card-bg)',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px var(--shadow-color)',
                    padding: '20px',
                    border: '1px solid var(--card-border)'
                  }}>
                    <h3 style={{ margin: '0 0 20px 0', color: 'var(--text-primary)' }}>Quick Actions</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <button 
                        onClick={() => setShowCreateTask(true)}
                        style={{
                          padding: '12px 16px',
                          backgroundColor: '#3498db',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          textAlign: 'left',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        ➕ Create Task
                      </button>
                      <button 
                        onClick={() => setShowCreateProject(true)}
                        style={{
                          padding: '12px 16px',
                          backgroundColor: '#27ae60',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          textAlign: 'left',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        👥 New Project
                      </button>
                      <button 
                        onClick={() => setCurrentView('settings')}
                        style={{
                          padding: '12px 16px',
                          backgroundColor: '#95a5a6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          textAlign: 'left',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        ⚙️ Settings
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Other views would be implemented here */}
          {currentView === 'project' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                  <h2 style={{ color: 'var(--text-primary)', marginBottom: '10px' }}>Project Management</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '16px', margin: 0 }}>Track and manage all your active projects</p>
                </div>
                <button
                  onClick={() => setShowCreateProject(true)}
                  style={{
                    padding: '12px 24px',
                    background: 'var(--card-bg)',
                    color: 'var(--text-primary)',
                    border: 'none',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: 'var(--neu-raised)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.boxShadow = 'var(--neu-pressed)';
                    (e.target as HTMLElement).style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.boxShadow = 'var(--neu-raised)';
                    (e.target as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >
                  🚀 New Project
                </button>
              </div>

              {/* Project Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
              }}>
                <div style={{
                  backgroundColor: 'var(--card-bg)',
                  padding: '24px',
                  borderRadius: '16px',
                  boxShadow: 'var(--neu-subtle)',
                  textAlign: 'center',
                  border: 'none'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>📊</div>
                  <h3 style={{ fontSize: '24px', margin: '0 0 8px 0', color: 'var(--text-primary)' }}>{projects.length}</h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>Active Projects</p>
                </div>
                
                <div style={{
                  backgroundColor: 'var(--card-bg)',
                  padding: '24px',
                  borderRadius: '16px',
                  boxShadow: 'var(--neu-subtle)',
                  textAlign: 'center',
                  border: 'none'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>💰</div>
                  <h3 style={{ fontSize: '24px', margin: '0 0 8px 0', color: 'var(--text-primary)' }}>
                    ${projects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}
                  </h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>Total Budget</p>
                </div>
                
                <div style={{
                  backgroundColor: 'var(--card-bg)',
                  padding: '24px',
                  borderRadius: '16px',
                  boxShadow: 'var(--neu-subtle)',
                  textAlign: 'center',
                  border: 'none'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>👥</div>
                  <h3 style={{ fontSize: '24px', margin: '0 0 8px 0', color: 'var(--text-primary)' }}>
                    {projects.reduce((sum, p) => sum + p.members, 0)}
                  </h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>Team Members</p>
                </div>
                
                <div style={{
                  backgroundColor: 'var(--card-bg)',
                  padding: '24px',
                  borderRadius: '16px',
                  boxShadow: 'var(--neu-subtle)',
                  textAlign: 'center',
                  border: 'none'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>📈</div>
                  <h3 style={{ fontSize: '24px', margin: '0 0 8px 0', color: 'var(--text-primary)' }}>
                    {Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)}%
                  </h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>Avg Progress</p>
                </div>
              </div>

              {/* Projects Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                gap: '24px'
              }}>
                {projects.map(project => {
                  const projectTasks = tasks.filter(task => task.project === project.name);
                  const completedTasks = projectTasks.filter(task => task.status === 'done').length;
                  const actualProgress = projectTasks.length > 0 ? Math.round((completedTasks / projectTasks.length) * 100) : 0;
                  
                  return (
                    <div
                      key={project.id}
                      style={{
                        background: 'var(--card-bg)',
                        borderRadius: '16px',
                        padding: '0',
                        boxShadow: 'var(--neu-subtle)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        border: 'none',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '6px 6px 12px var(--neu-shadow-dark), -6px -6px 12px var(--neu-shadow-light)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'var(--neu-subtle)';
                      }}
                    >
                      {/* Subtle Header */}
                      <div style={{
                        background: 'var(--card-bg)',
                        borderRadius: '16px 16px 0 0',
                        padding: '20px 20px 16px 20px',
                        position: 'relative',
                        overflow: 'hidden',
                        borderBottom: `1px solid ${project.color}20`
                      }}>
                        {/* Decorative Elements */}
                        <div style={{
                          position: 'absolute',
                          top: '-20px',
                          right: '-20px',
                          width: '60px',
                          height: '60px',
                          background: `radial-gradient(circle, ${project.color}20 0%, transparent 70%)`,
                          borderRadius: '50%'
                        }} />
                        
                        <div style={{ position: 'relative', zIndex: 2 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                            <div style={{
                              width: '40px',
                              height: '40px',
                              background: `linear-gradient(135deg, ${project.color} 0%, ${project.color}cc 100%)`,
                              borderRadius: '10px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: `0 4px 12px ${project.color}40`,
                              fontSize: '16px'
                            }}>
                              🚀
                            </div>
                            <span style={{
                              padding: '5px 10px',
                              background: settings.theme === 'dark' 
                                ? 'rgba(255, 255, 255, 0.1)' 
                                : 'rgba(255, 255, 255, 0.9)',
                              color: project.color,
                              borderRadius: '12px',
                              fontSize: '10px',
                              fontWeight: '700',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              boxShadow: settings.theme === 'dark' 
                                ? '0 2px 6px rgba(0, 0, 0, 0.3)' 
                                : '0 2px 6px rgba(0, 0, 0, 0.1)',
                              backdropFilter: 'blur(10px)'
                            }}>
                              {project.status}
                            </span>
                          </div>
                          
                          <h3 style={{
                            margin: '0 0 8px 0',
                            color: 'var(--text-primary)',
                            fontSize: '18px',
                            fontWeight: '800',
                            lineHeight: '1.2',
                            letterSpacing: '-0.3px',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {project.name}
                          </h3>
                          
                          <p style={{
                            color: 'var(--text-muted)',
                            fontSize: '13px',
                            lineHeight: '1.4',
                            margin: 0,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            fontWeight: '400'
                          }}>
                            {project.description}
                          </p>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div style={{ padding: '18px' }}>
                        {/* Progress Section with Modern Design */}
                        <div style={{ marginBottom: '16px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <span style={{ 
                              fontSize: '12px', 
                              fontWeight: '700', 
                              color: 'var(--text-primary)',
                              letterSpacing: '-0.1px'
                            }}>
                              Progress
                            </span>
                            <span style={{ 
                              fontSize: '11px', 
                              fontWeight: '700', 
                              color: project.color
                            }}>
                              {actualProgress}%
                            </span>
                          </div>
                          <div style={{
                            width: '100%',
                            height: '6px',
                            backgroundColor: settings.theme === 'dark' ? 'var(--bg-tertiary)' : '#f1f5f9',
                            borderRadius: '12px',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              width: `${actualProgress}%`,
                              height: '100%',
                              background: `linear-gradient(90deg, ${project.color} 0%, ${project.color}cc 100%)`,
                              borderRadius: '12px',
                              transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                            }} />
                          </div>
                        </div>

                        {/* Compact Stats Grid */}
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr 1fr',
                          gap: '12px',
                          marginBottom: '20px'
                        }}>
                          <div style={{ 
                            textAlign: 'center',
                            padding: '12px 8px',
                            background: settings.theme === 'dark' 
                              ? 'linear-gradient(135deg, var(--bg-tertiary) 0%, var(--hover-bg) 100%)'
                              : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                            borderRadius: '12px',
                            border: '1px solid var(--card-border)'
                          }}>
                            <div style={{ 
                              fontSize: '20px', 
                              fontWeight: '900', 
                              color: 'var(--text-primary)', 
                              marginBottom: '4px',
                              letterSpacing: '-0.5px'
                            }}>
                              {projectTasks.length}
                            </div>
                            <div style={{ 
                              fontSize: '11px', 
                              color: 'var(--text-muted)',
                              fontWeight: '600',
                              textTransform: 'uppercase',
                              letterSpacing: '0.3px'
                            }}>
                              Tasks
                            </div>
                          </div>
                          <div style={{ 
                            textAlign: 'center',
                            padding: '12px 8px',
                            background: settings.theme === 'dark' 
                              ? 'linear-gradient(135deg, var(--bg-tertiary) 0%, var(--hover-bg) 100%)'
                              : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                            borderRadius: '12px',
                            border: '1px solid var(--card-border)'
                          }}>
                            <div style={{ 
                              fontSize: '20px', 
                              fontWeight: '900', 
                              color: 'var(--text-primary)', 
                              marginBottom: '4px',
                              letterSpacing: '-0.5px'
                            }}>
                              {project.members}
                            </div>
                            <div style={{ 
                              fontSize: '11px', 
                              color: 'var(--text-muted)',
                              fontWeight: '600',
                              textTransform: 'uppercase',
                              letterSpacing: '0.3px'
                            }}>
                              Members
                            </div>
                          </div>
                          <div style={{ 
                            textAlign: 'center',
                            padding: '12px 8px',
                            background: settings.theme === 'dark' 
                              ? 'linear-gradient(135deg, var(--bg-tertiary) 0%, var(--hover-bg) 100%)'
                              : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                            borderRadius: '12px',
                            border: '1px solid var(--card-border)'
                          }}>
                            <div style={{ 
                              fontSize: '20px', 
                              fontWeight: '900', 
                              color: 'var(--text-primary)', 
                              marginBottom: '4px',
                              letterSpacing: '-0.5px'
                            }}>
                              ${(project.budget / 1000).toFixed(0)}k
                            </div>
                            <div style={{ 
                              fontSize: '11px', 
                              color: 'var(--text-muted)',
                              fontWeight: '600',
                              textTransform: 'uppercase',
                              letterSpacing: '0.3px'
                            }}>
                              Budget
                            </div>
                          </div>
                        </div>

                        {/* Compact Timeline */}
                        <div style={{ 
                          marginBottom: '16px',
                          padding: '12px',
                          background: settings.theme === 'dark' 
                            ? 'linear-gradient(135deg, var(--bg-tertiary) 0%, var(--hover-bg) 100%)'
                            : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                          borderRadius: '10px',
                          border: '1px solid var(--card-border)'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{
                                width: '28px',
                                height: '28px',
                                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '12px'
                              }}>
                                🚀
                              </div>
                              <div>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '1px' }}>Start</div>
                                <div style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: '700' }}>
                                  {new Date(project.startDate).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '1px', textAlign: 'right' }}>End</div>
                                <div style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: '700', textAlign: 'right' }}>
                                  {new Date(project.endDate).toLocaleDateString()}
                                </div>
                              </div>
                              <div style={{
                                width: '28px',
                                height: '28px',
                                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '12px'
                              }}>
                                🏁
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Compact Action Buttons */}
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentView('tasks');
                              setSearchQuery('');
                              setFilterStatus('all');
                              setFilterPriority('all');
                              setTimeout(() => {
                                const projectInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
                                if (projectInput) {
                                  projectInput.value = project.name;
                                  setSearchQuery(project.name);
                                }
                              }, 100);
                            }}
                            style={{
                              flex: 1,
                              padding: '10px 14px',
                              background: `linear-gradient(135deg, ${project.color} 0%, ${project.color}dd 100%)`,
                              color: 'white',
                              border: 'none',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              fontSize: '11px',
                              fontWeight: '700',
                              transition: 'all 0.2s ease',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '4px',
                              boxShadow: `0 3px 8px ${project.color}40`,
                              letterSpacing: '0.2px'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'translateY(-1px)';
                              e.currentTarget.style.boxShadow = `0 4px 12px ${project.color}50`;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = `0 3px 8px ${project.color}40`;
                            }}
                          >
                            📋 Tasks
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setNewTaskProject(project.name);
                              setShowCreateTask(true);
                            }}
                            style={{
                              padding: '10px',
                              backgroundColor: 'var(--card-bg)',
                              color: project.color,
                              border: `2px solid ${project.color}30`,
                              borderRadius: '8px',
                              cursor: 'pointer',
                              fontSize: '11px',
                              fontWeight: '700',
                              transition: 'all 0.2s ease',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = project.color;
                              e.currentTarget.style.color = 'white';
                              e.currentTarget.style.transform = 'translateY(-1px)';
                              e.currentTarget.style.boxShadow = `0 3px 8px ${project.color}40`;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'var(--card-bg)';
                              e.currentTarget.style.color = project.color;
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.08)';
                            }}
                          >
                            ➕
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditProjectModal(project);
                            }}
                            style={{
                              padding: '10px',
                              backgroundColor: 'var(--card-bg)',
                              color: '#f39c12',
                              border: '2px solid rgba(243, 156, 18, 0.3)',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              fontSize: '11px',
                              fontWeight: '700',
                              transition: 'all 0.2s ease',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#f39c12';
                              e.currentTarget.style.color = 'white';
                              e.currentTarget.style.transform = 'translateY(-1px)';
                              e.currentTarget.style.boxShadow = '0 3px 8px rgba(243, 156, 18, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'var(--card-bg)';
                              e.currentTarget.style.color = '#f39c12';
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.08)';
                            }}
                          >
                            ✏️
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {projects.length === 0 && (
                <div style={{
                  backgroundColor: 'var(--card-bg)',
                  borderRadius: '20px',
                  padding: '60px 40px',
                  textAlign: 'center',
                  boxShadow: '0 8px 25px var(--shadow-color)',
                  border: '1px solid var(--card-border)'
                }}>
                  <div style={{ fontSize: '64px', marginBottom: '20px', opacity: 0.7 }}>🚀</div>
                  <h3 style={{ color: 'var(--text-primary)', marginBottom: '12px', fontSize: '24px' }}>No projects yet</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '32px', fontSize: '16px', lineHeight: '1.6' }}>
                    Start organizing your work by creating your first project. Projects help you group related tasks and track progress.
                  </p>
                  <button
                    onClick={() => setShowCreateProject(true)}
                    style={{
                      padding: '16px 32px',
                      background: 'linear-gradient(135deg, #27ae60 0%, #219a52 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '600',
                      boxShadow: '0 4px 12px rgba(39, 174, 96, 0.3)'
                    }}
                  >
                    🚀 Create Your First Project
                  </button>
                </div>
              )}
            </div>
          )}

          {currentView === 'tasks' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                  <h2 style={{ color: 'var(--text-primary)', marginBottom: '10px' }}>All Tasks</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '16px', margin: 0 }}>Manage and track all your tasks</p>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  {/* View Toggle */}
                  <div style={{ display: 'flex', background: 'var(--input-bg)', borderRadius: '8px', border: '1px solid var(--card-border)' }}>
                    <button
                      onClick={() => updateSetting('taskViewStyle', 'kanban')}
                      style={{
                        padding: '8px 12px',
                        backgroundColor: settings.taskViewStyle === 'kanban' ? '#3498db' : 'transparent',
                        color: settings.taskViewStyle === 'kanban' ? 'white' : 'var(--text-primary)',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      📋 Kanban
                    </button>
                    <button
                      onClick={() => updateSetting('taskViewStyle', 'list')}
                      style={{
                        padding: '8px 12px',
                        backgroundColor: settings.taskViewStyle === 'list' ? '#3498db' : 'transparent',
                        color: settings.taskViewStyle === 'list' ? 'white' : 'var(--text-primary)',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      📃 List
                    </button>
                    <button
                      onClick={() => updateSetting('taskViewStyle', 'cards')}
                      style={{
                        padding: '8px 12px',
                        backgroundColor: settings.taskViewStyle === 'cards' ? '#3498db' : 'transparent',
                        color: settings.taskViewStyle === 'cards' ? 'white' : 'var(--text-primary)',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      🎴 Cards
                    </button>
                  </div>
                  
                  <button
                    onClick={() => setShowCreateTask(true)}
                    style={{
                      padding: '12px 24px',
                      background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 12px rgba(52, 152, 219, 0.3)'
                    }}
                  >
                    ➕ New Task
                  </button>
                </div>
              </div>

              {/* Enhanced Search and Filter */}
              <div style={{
                backgroundColor: 'var(--card-bg)',
                padding: '24px',
                borderRadius: '16px',
                boxShadow: 'var(--neu-subtle)',
                marginBottom: '30px',
                border: 'none'
              }}>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
                    <input
                      type="text"
                      placeholder="🔍 Search tasks by title or description..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '14px 20px',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '15px',
                        boxSizing: 'border-box',
                        transition: 'all 0.2s ease',
                        outline: 'none',
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--text-primary)',
                        boxShadow: 'var(--neu-subtle)'
                      }}
                      onFocus={(e) => {
                        (e.target as HTMLElement).style.boxShadow = 'inset 3px 3px 6px var(--neu-shadow-dark), inset -3px -3px 6px var(--neu-shadow-light)';
                      }}
                      onBlur={(e) => {
                        (e.target as HTMLElement).style.boxShadow = 'var(--neu-subtle)';
                      }}
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    style={{
                      padding: '14px 18px',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '15px',
                      minWidth: '140px',
                      outline: 'none',
                      backgroundColor: 'var(--input-bg)',
                      color: 'var(--text-primary)',
                      boxShadow: 'var(--neu-subtle)',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="all">All Status</option>
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Completed</option>
                  </select>
                  <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    style={{
                      padding: '14px 18px',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '15px',
                      minWidth: '140px',
                      outline: 'none',
                      backgroundColor: 'var(--input-bg)',
                      color: 'var(--text-primary)',
                      boxShadow: 'var(--neu-subtle)',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="all">All Priority</option>
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                  <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    style={{
                      padding: '14px 18px',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '15px',
                      minWidth: '140px',
                      outline: 'none',
                      backgroundColor: 'var(--input-bg)',
                      color: 'var(--text-primary)',
                      boxShadow: 'var(--neu-subtle)',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="all">All Tags</option>
                    {Array.from(new Set(tasks.flatMap(task => task.tags || []))).map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setFilterStatus('all');
                      setFilterPriority('all');
                      setSelectedTag('all');
                    }}
                    style={{
                      padding: '14px 20px',
                      backgroundColor: 'var(--card-bg)',
                      color: 'var(--text-primary)',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500',
                      boxShadow: 'var(--neu-subtle)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.boxShadow = 'inset 2px 2px 4px var(--neu-shadow-dark), inset -2px -2px 4px var(--neu-shadow-light)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.boxShadow = 'var(--neu-subtle)';
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
                <div style={{ marginTop: '15px', fontSize: '14px', color: 'var(--text-muted)' }}>
                  Showing <strong>{getFilteredTasks().length}</strong> of <strong>{tasks.length}</strong> tasks
                  {(searchQuery || filterStatus !== 'all' || filterPriority !== 'all' || selectedTag !== 'all') && (
                    <span style={{ color: '#3498db' }}> (filtered)</span>
                  )}
                </div>
              </div>

              {/* Task Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
              }}>
                <div style={{
                  backgroundColor: 'var(--card-bg)',
                  padding: '24px',
                  borderRadius: '16px',
                  boxShadow: '0 4px 6px var(--shadow-color)',
                  textAlign: 'center',
                  border: '1px solid var(--card-border)'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>📋</div>
                  <h3 style={{ fontSize: '24px', margin: '0 0 8px 0', color: 'var(--text-primary)' }}>{getFilteredTasks().length}</h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>Active Tasks</p>
                </div>
                
                <div style={{
                  backgroundColor: 'var(--card-bg)',
                  padding: '24px',
                  borderRadius: '16px',
                  boxShadow: '0 4px 6px var(--shadow-color)',
                  textAlign: 'center',
                  border: '1px solid var(--card-border)'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>✅</div>
                  <h3 style={{ fontSize: '24px', margin: '0 0 8px 0', color: 'var(--text-primary)' }}>
                    {tasks.filter(t => t.status === 'done').length}
                  </h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>Completed</p>
                </div>
                
                <div style={{
                  backgroundColor: 'var(--card-bg)',
                  padding: '24px',
                  borderRadius: '16px',
                  boxShadow: '0 4px 6px var(--shadow-color)',
                  textAlign: 'center',
                  border: '1px solid var(--card-border)'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>🚀</div>
                  <h3 style={{ fontSize: '24px', margin: '0 0 8px 0', color: 'var(--text-primary)' }}>
                    {tasks.filter(t => t.status === 'in-progress').length}
                  </h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>In Progress</p>
                </div>
                
                <div style={{
                  backgroundColor: 'var(--card-bg)',
                  padding: '24px',
                  borderRadius: '16px',
                  boxShadow: '0 4px 6px var(--shadow-color)',
                  textAlign: 'center',
                  border: '1px solid var(--card-border)'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>⏱️</div>
                  <h3 style={{ fontSize: '24px', margin: '0 0 8px 0', color: 'var(--text-primary)' }}>
                    {tasks.reduce((sum, t) => sum + t.estimatedHours, 0)}h
                  </h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>Total Hours</p>
                </div>
              </div>

              {/* Tasks Grid */}
              <div style={{
                display: settings.taskViewStyle === 'list' ? 'flex' : 'grid',
                flexDirection: settings.taskViewStyle === 'list' ? 'column' : undefined,
                gridTemplateColumns: settings.taskViewStyle === 'cards' 
                  ? (settings.compactView ? 'repeat(auto-fill, minmax(280px, 1fr))' : 'repeat(auto-fill, minmax(320px, 1fr))')
                  : settings.taskViewStyle === 'kanban' 
                    ? 'repeat(3, 1fr)' 
                    : undefined,
                gap: settings.compactView ? '16px' : '24px'
              }}>
                {settings.taskViewStyle === 'kanban' ? (
                  // Kanban Board View
                  <>
                    {['todo', 'in-progress', 'done'].map(status => (
                      <div key={status} style={{
                        background: 'var(--card-bg)',
                        borderRadius: '16px',
                        padding: '20px',
                        boxShadow: '0 4px 6px var(--shadow-color)',
                        minHeight: '400px',
                        border: '1px solid var(--card-border)'
                      }}>
                        <h3 style={{
                          margin: '0 0 20px 0',
                          color: 'var(--text-primary)',
                          textAlign: 'center',
                          padding: '10px',
                          background: status === 'todo' ? '#3498db15' : status === 'in-progress' ? '#f59e0b15' : '#10b98115',
                          borderRadius: '10px',
                          textTransform: 'capitalize'
                        }}>
                          {status === 'in-progress' ? 'In Progress' : status.replace('-', ' ')} 
                          ({getFilteredTasks().filter(t => t.status === status).length})
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {getFilteredTasks().filter(t => t.status === status).map(task => {
                            const priorityColor = task.priority === 'high' ? '#ef4444' : task.priority === 'medium' ? '#f59e0b' : '#10b981';
                            
                            return (
                              <div key={task.id} style={{
                                background: 'var(--card-bg)',
                                borderRadius: '12px',
                                padding: '16px',
                                border: '1px solid var(--card-border)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                boxShadow: '0 2px 4px var(--shadow-color)'
                              }}
                              onClick={() => {
                                setSelectedTask(task);
                                setShowTaskDetails(true);
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px var(--shadow-color)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 2px 4px var(--shadow-color)';
                              }}>
                                <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                                  {task.title}
                                </h4>
                                <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                                  {task.description.length > 60 ? task.description.substring(0, 60) + '...' : task.description}
                                </p>
                                
                                {/* Tags */}
                                {task.tags && task.tags.length > 0 && (
                                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
                                    {task.tags.slice(0, 3).map((tag, tagIndex) => (
                                      <span key={tagIndex} style={{
                                        padding: '2px 6px',
                                        borderRadius: '6px',
                                        fontSize: '10px',
                                        fontWeight: '500',
                                        backgroundColor: 'var(--input-bg)',
                                        color: 'var(--text-muted)',
                                        border: '1px solid var(--card-border)'
                                      }}>
                                        #{tag}
                                      </span>
                                    ))}
                                    {task.tags.length > 3 && (
                                      <span style={{
                                        padding: '2px 6px',
                                        borderRadius: '6px',
                                        fontSize: '10px',
                                        fontWeight: '500',
                                        color: 'var(--text-muted)'
                                      }}>
                                        +{task.tags.length - 3}
                                      </span>
                                    )}
                                  </div>
                                )}
                                
                                {/* Assignee */}
                                {task.assignee && (
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                    <div style={{
                                      width: '16px',
                                      height: '16px',
                                      borderRadius: '50%',
                                      backgroundColor: '#3498db',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontSize: '8px',
                                      color: 'white',
                                      fontWeight: '600'
                                    }}>
                                      {teamMembers.find(m => m.id.toString() === task.assignee)?.name?.[0] || 'U'}
                                    </div>
                                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                      {teamMembers.find(m => m.id.toString() === task.assignee)?.name || 'Unassigned'}
                                    </span>
                                  </div>
                                )}
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <span style={{
                                    padding: '4px 8px',
                                    borderRadius: '8px',
                                    fontSize: '9px',
                                    fontWeight: '600',
                                    backgroundColor: task.priority === 'high' 
                                      ? (settings.theme === 'dark' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)')
                                      : task.priority === 'medium' 
                                        ? (settings.theme === 'dark' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.1)')
                                        : (settings.theme === 'dark' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)'),
                                    color: priorityColor,
                                    textTransform: 'uppercase'
                                  }}>
                                    {task.priority}
                                  </span>
                                  <div style={{ display: 'flex', gap: '4px' }}>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        openEditTaskModal(task);
                                      }}
                                      style={{
                                        padding: '4px 6px',
                                        backgroundColor: '#f59e0b',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '9px',
                                        fontWeight: '600'
                                      }}
                                    >
                                      ✏️
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </>
                ) : settings.taskViewStyle === 'list' ? (
                  // List View
                  <div style={{
                    background: 'var(--card-bg)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 6px var(--shadow-color)',
                    border: '1px solid var(--card-border)'
                  }}>
                    {getFilteredTasks().map((task, index) => {
                      const priorityColor = task.priority === 'high' ? '#ef4444' : task.priority === 'medium' ? '#f59e0b' : '#10b981';
                      const statusColor = task.status === 'done' ? '#10b981' : task.status === 'in-progress' ? '#f59e0b' : '#3b82f6';
                      
                      return (
                        <div key={task.id} style={{
                          padding: settings.compactView ? '12px 20px' : '16px 24px',
                          borderBottom: index < getFilteredTasks().length - 1 ? '1px solid var(--card-border)' : 'none',
                          cursor: 'pointer',
                          transition: 'background 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px',
                          backgroundColor: 'transparent'
                        }}
                        onClick={() => {
                          setSelectedTask(task);
                          setShowTaskDetails(true);
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--hover-bg)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                        }}>
                          <div style={{
                            width: '32px',
                            height: '32px',
                            background: `linear-gradient(135deg, ${statusColor} 0%, ${statusColor}cc 100%)`,
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px'
                          }}>
                            {task.status === 'done' ? '✅' : task.status === 'in-progress' ? '🚀' : '📋'}
                          </div>
                          
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <h4 style={{ 
                              margin: '0 0 4px 0', 
                              fontSize: settings.compactView ? '14px' : '16px', 
                              fontWeight: '600', 
                              color: 'var(--text-primary)',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>
                              {task.title}
                            </h4>
                            <p style={{ 
                              margin: '0 0 4px 0', 
                              fontSize: settings.compactView ? '11px' : '13px', 
                              color: 'var(--text-muted)',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>
                              {task.description}
                            </p>
                            
                            {/* Tags and Assignee in list view */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              {task.tags && task.tags.length > 0 && (
                                <div style={{ display: 'flex', gap: '4px' }}>
                                  {task.tags.slice(0, 2).map((tag, tagIndex) => (
                                    <span key={tagIndex} style={{
                                      padding: '2px 4px',
                                      borderRadius: '4px',
                                      fontSize: '9px',
                                      fontWeight: '500',
                                      backgroundColor: 'var(--input-bg)',
                                      color: 'var(--text-muted)',
                                      border: '1px solid var(--card-border)'
                                    }}>
                                      #{tag}
                                    </span>
                                  ))}
                                  {task.tags.length > 2 && (
                                    <span style={{
                                      fontSize: '9px',
                                      color: 'var(--text-muted)'
                                    }}>
                                      +{task.tags.length - 2}
                                    </span>
                                  )}
                                </div>
                              )}
                              
                              {task.assignee && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <div style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    backgroundColor: '#3498db',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '6px',
                                    color: 'white',
                                    fontWeight: '600'
                                  }}>
                                    {teamMembers.find(m => m.id.toString() === task.assignee)?.name?.[0] || 'U'}
                                  </div>
                                  <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>
                                    {teamMembers.find(m => m.id.toString() === task.assignee)?.name || 'Unassigned'}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{
                              padding: '4px 8px',
                              borderRadius: '8px',
                              fontSize: '10px',
                              fontWeight: '600',
                              backgroundColor: task.priority === 'high' 
                                ? (settings.theme === 'dark' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)')
                                : task.priority === 'medium' 
                                  ? (settings.theme === 'dark' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.1)')
                                  : (settings.theme === 'dark' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)'),
                              color: priorityColor,
                              textTransform: 'uppercase'
                            }}>
                              {task.priority}
                            </span>
                            
                            <span style={{ 
                              fontSize: '12px', 
                              color: 'var(--text-muted)',
                              minWidth: '60px',
                              textAlign: 'center'
                            }}>
                              {formatDate(task.dueDate)}
                            </span>
                            
                            <div style={{ display: 'flex', gap: '4px' }}>
                              {task.status !== 'done' && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateTaskStatus(task.id, 'done');
                                  }}
                                  style={{
                                    padding: '6px 8px',
                                    backgroundColor: '#10b981',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '9px',
                                    fontWeight: '600',
                                    transition: 'all 0.2s ease'
                                  }}
                                >
                                  ✓
                                </button>
                              )}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openEditTaskModal(task);
                                }}
                                style={{
                                  padding: '6px 8px',
                                  backgroundColor: '#f59e0b',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  fontSize: '9px',
                                  fontWeight: '600',
                                  transition: 'all 0.2s ease'
                                }}
                              >
                                ✏️
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteTask(task.id);
                                }}
                                style={{
                                  padding: '6px 8px',
                                  backgroundColor: '#ef4444',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  fontSize: '9px',
                                  fontWeight: '600',
                                  transition: 'all 0.2s ease'
                                }}
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  // Enhanced Cards View with modern styling
                  getFilteredTasks().map(task => {
                  const priorityColor = task.priority === 'high' ? 'var(--accent-error)' : task.priority === 'medium' ? 'var(--accent-warning)' : 'var(--accent-success)';
                  const statusColor = task.status === 'done' ? 'var(--accent-success)' : task.status === 'in-progress' ? 'var(--accent-warning)' : 'var(--accent-primary)';
                  
                  return (
                    <div
                      key={task.id}
                      className="neu-card"
                      style={{
                        background: 'var(--card-bg)',
                        borderRadius: '24px',
                        padding: '0',
                        boxShadow: 'var(--neu-subtle)',
                        cursor: 'pointer',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        border: 'none',
                        position: 'relative',
                        overflow: 'hidden',
                        backdropFilter: 'blur(10px)'
                      }}
                      onClick={() => {
                        setSelectedTask(task);
                        setShowTaskDetails(true);
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                        e.currentTarget.style.boxShadow = 'var(--neu-raised)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = 'var(--neu-subtle)';
                      }}
                    >
                      {/* Enhanced Header with gradient overlay */}
                      <div style={{
                        background: `linear-gradient(135deg, var(--card-bg) 0%, var(--bg-secondary) 100%)`,
                        borderRadius: '24px 24px 0 0',
                        padding: '28px 28px 20px 28px',
                        position: 'relative',
                        overflow: 'hidden',
                        borderBottom: `2px solid ${priorityColor}30`
                      }}>
                        {/* Modern decorative elements */}
                        <div style={{
                          position: 'absolute',
                          top: '-30px',
                          right: '-30px',
                          width: '80px',
                          height: '80px',
                          background: `radial-gradient(circle, ${priorityColor}15 0%, transparent 70%)`,
                          borderRadius: '50%',
                          filter: 'blur(20px)'
                        }} />
                        <div style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          width: '6px',
                          height: '6px',
                          background: priorityColor,
                          borderRadius: '50%',
                          boxShadow: `0 0 10px ${priorityColor}`
                        }} />
                        
                        <div style={{ position: 'relative', zIndex: 2 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                            <div style={{
                              width: '48px',
                              height: '48px',
                              background: `linear-gradient(135deg, ${statusColor} 0%, ${statusColor}dd 100%)`,
                              borderRadius: '16px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: `0 8px 20px ${statusColor}40, inset 0 1px 0 rgba(255,255,255,0.2)`,
                              fontSize: '20px',
                              border: `2px solid rgba(255,255,255,0.1)`,
                              position: 'relative',
                              overflow: 'hidden'
                            }}>
                              <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(45deg, rgba(255,255,255,0.2) 0%, transparent 100%)',
                                borderRadius: '16px'
                              }}></div>
                              {task.status === 'done' ? '✅' : task.status === 'in-progress' ? '🚀' : '📋'}
                            </div>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <span style={{
                                padding: '8px 14px',
                                background: `linear-gradient(135deg, ${priorityColor}20 0%, ${priorityColor}10 100%)`,
                                color: priorityColor,
                                borderRadius: '12px',
                                fontSize: '10px',
                                fontWeight: '700',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                boxShadow: settings.theme === 'dark' 
                                  ? '0 2px 6px rgba(0, 0, 0, 0.3)' 
                                  : '0 2px 6px rgba(0, 0, 0, 0.1)',
                                backdropFilter: 'blur(10px)',
                                border: `1px solid ${priorityColor}30`
                              }}>
                                {task.priority}
                              </span>
                            </div>
                          </div>
                          
                          <h3 style={{
                            margin: '0 0 12px 0',
                            color: 'var(--text-primary)',
                            fontSize: '20px',
                            fontWeight: '800',
                            lineHeight: '1.2',
                            letterSpacing: '-0.5px',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {task.title}
                          </h3>
                          
                          <p style={{
                            color: 'var(--text-muted)',
                            fontSize: '14px',
                            lineHeight: '1.5',
                            margin: 0,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            fontWeight: '500'
                          }}>
                            {task.description}
                          </p>
                        </div>
                      </div>

                      {/* Enhanced Content Section */}
                      <div style={{ padding: '24px' }}>
                        {/* Modern Info Grid */}
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '12px',
                          marginBottom: '20px'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '12px 14px',
                            background: 'var(--bg-secondary)',
                            borderRadius: '14px',
                            boxShadow: 'var(--neu-pressed)',
                            border: 'none'
                          }}>
                            <span style={{ fontSize: '14px' }}>📁</span>
                            <span style={{ 
                              fontSize: '12px', 
                              color: 'var(--text-secondary)',
                              fontWeight: '600',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>
                              {task.project}
                            </span>
                          </div>
                          
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '12px 14px',
                            background: 'var(--bg-secondary)',
                            borderRadius: '14px',
                            boxShadow: 'var(--neu-pressed)',
                            border: 'none'
                          }}>
                            <span style={{ fontSize: '14px' }}>📅</span>
                            <span style={{ 
                              fontSize: '12px', 
                              color: 'var(--text-secondary)',
                              fontWeight: '600',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>
                              {formatDate(task.dueDate)}
                            </span>
                          </div>
                        </div>

                        {/* Enhanced Progress Section */}
                        <div style={{ marginBottom: '20px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <span style={{ 
                              fontSize: '13px', 
                              fontWeight: '700', 
                              color: 'var(--text-primary)',
                              letterSpacing: '-0.2px'
                            }}>
                              Progress
                            </span>
                            <span style={{ 
                              fontSize: '12px', 
                              fontWeight: '800', 
                              color: statusColor,
                              padding: '4px 8px',
                              background: `${statusColor}15`,
                              borderRadius: '8px'
                            }}>
                              {task.completedHours}/{task.estimatedHours}h
                            </span>
                          </div>
                          <div style={{
                            width: '100%',
                            height: '8px',
                            backgroundColor: settings.theme === 'dark' ? 'var(--bg-tertiary)' : '#f1f5f9',
                            borderRadius: '12px',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              width: `${Math.min((task.completedHours / task.estimatedHours) * 100, 100)}%`,
                              height: '100%',
                              background: `linear-gradient(90deg, ${statusColor} 0%, ${statusColor}cc 100%)`,
                              borderRadius: '12px',
                              transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                            }} />
                          </div>
                        </div>

                        {/* Status and Actions */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{
                            padding: '6px 12px',
                            borderRadius: '16px',
                            fontSize: '10px',
                            fontWeight: '700',
                            backgroundColor: `${statusColor}15`,
                            color: statusColor,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            {task.status === 'in-progress' ? 'IN PROGRESS' : task.status.replace('-', ' ')}
                          </span>
                          
                          <div style={{ display: 'flex', gap: '6px' }}>
                            {task.status !== 'done' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateTaskStatus(task.id, 'done');
                                }}
                                style={{
                                  padding: '6px 10px',
                                  backgroundColor: '#10b981',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '8px',
                                  cursor: 'pointer',
                                  fontSize: '10px',
                                  fontWeight: '600',
                                  transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = '#059669';
                                  e.currentTarget.style.transform = 'translateY(-1px)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = '#10b981';
                                  e.currentTarget.style.transform = 'translateY(0)';
                                }}
                              >
                                ✓
                              </button>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openEditTaskModal(task);
                              }}
                              style={{
                                padding: '6px 10px',
                                backgroundColor: '#f59e0b',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '10px',
                                fontWeight: '600',
                                transition: 'all 0.3s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#d97706';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#f59e0b';
                                e.currentTarget.style.transform = 'translateY(0)';
                              }}
                            >
                              ✏️
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteTask(task.id);
                              }}
                              style={{
                                padding: '6px 10px',
                                backgroundColor: '#ef4444',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '10px',
                                fontWeight: '600',
                                transition: 'all 0.3s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#dc2626';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#ef4444';
                                e.currentTarget.style.transform = 'translateY(0)';
                              }}
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
                )}
              </div>

              {getFilteredTasks().length === 0 && (
                <div style={{
                  backgroundColor: 'var(--card-bg)',
                  borderRadius: '20px',
                  padding: '60px 40px',
                  textAlign: 'center',
                  boxShadow: '0 8px 25px var(--shadow-color)',
                  gridColumn: '1 / -1',
                  border: '1px solid var(--card-border)'
                }}>
                  <div style={{ fontSize: '64px', marginBottom: '20px', opacity: 0.7 }}>
                    {tasks.length === 0 ? '📋' : '🔍'}
                  </div>
                  <h3 style={{ color: 'var(--text-primary)', marginBottom: '12px', fontSize: '24px' }}>
                    {tasks.length === 0 ? 'No tasks yet' : 'No tasks found'}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '32px', fontSize: '16px', lineHeight: '1.6' }}>
                    {tasks.length === 0 
                      ? "Start organizing your work by creating your first task. Break down your projects into manageable pieces."
                      : "No tasks match your current filters. Try adjusting your search criteria or clear the filters."
                    }
                  </p>
                  {tasks.length === 0 ? (
                    <button
                      onClick={() => setShowCreateTask(true)}
                      style={{
                        padding: '16px 32px',
                        background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: '600',
                        boxShadow: '0 4px 12px rgba(52, 152, 219, 0.3)'
                      }}
                    >
                      📋 Create Your First Task
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setFilterStatus('all');
                        setFilterPriority('all');
                      }}
                      style={{
                        padding: '16px 32px',
                        background: 'linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: '600',
                        boxShadow: '0 4px 12px rgba(149, 165, 166, 0.3)'
                      }}
                    >
                      🔄 Clear All Filters
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {currentView === 'profile' && (
            <div>
              {/* Modern Header with Gradient Background */}
              <div style={{
                background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                borderRadius: '32px',
                padding: '40px',
                marginBottom: '40px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
              }}>
                {/* Background Pattern */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                  opacity: 0.3
                }} />
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 1
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    {/* Enhanced Profile Avatar with Image Upload */}
                    <div style={{
                      position: 'relative',
                      cursor: editingProfile ? 'pointer' : 'default'
                    }}
                    onClick={() => {
                      if (editingProfile) {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/*';
                        input.onchange = (e) => {
                          const file = (e.target as HTMLInputElement).files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                              const imageUrl = e.target?.result as string;
                              setSelectedImageFile(imageUrl);
                              setShowImageCropper(true);
                            };
                            reader.readAsDataURL(file);
                          }
                        };
                        input.click();
                      }
                    }}>
                      <div style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '32px',
                        background: profileFormData.profileImage
                          ? `url(${profileFormData.profileImage})`
                          : 'rgba(255, 255, 255, 0.2)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                        backdropFilter: 'blur(20px)',
                        border: '3px solid rgba(255, 255, 255, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '48px',
                        fontWeight: '800',
                        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.2)',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        minWidth: '120px',
                        minHeight: '120px',
                        maxWidth: '120px',
                        maxHeight: '120px',
                        flexShrink: 0,
                        flexGrow: 0
                      }}>
                        {!profileFormData.profileImage && (
                          <>
                            <div style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: 'linear-gradient(45deg, rgba(255,255,255,0.2) 0%, transparent 100%)',
                              borderRadius: '32px'
                            }}></div>
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </>
                        )}
                        
                        {editingProfile && (
                          <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.5)',
                            borderRadius: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: 0,
                            transition: 'opacity 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.opacity = '1';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.opacity = '0';
                          }}>
                            <div style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              gap: '4px'
                            }}>
                              <span style={{ fontSize: '24px' }}>📷</span>
                              <span style={{ fontSize: '10px', fontWeight: '600', textAlign: 'center' }}>
                                {user.profileImage || profileFormData.profileImage ? 'Change Photo' : 'Add Photo'}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {editingProfile && (user.profileImage || profileFormData.profileImage) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setProfileFormData({...profileFormData, profileImage: null});
                          }}
                          style={{
                            position: 'absolute',
                            top: '-8px',
                            left: '-8px',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                            border: '3px solid white',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                          title="Remove photo"
                        >
                          <span style={{ fontSize: '12px', color: 'white' }}>×</span>
                        </button>
                      )}
                    </div>
                    
                    <div>
                      <h1 style={{ 
                        margin: '0 0 8px 0', 
                        color: 'white', 
                        fontSize: '36px',
                        fontWeight: '800',
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                        letterSpacing: '-1px'
                      }}>
                        {editingProfile ? profileFormData.name : user.name}
                      </h1>
                      
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        marginBottom: '12px'
                      }}>
                        <span style={{ 
                          color: 'rgba(255, 255, 255, 0.9)', 
                          fontSize: '18px',
                          fontWeight: '600'
                        }}>
                          {editingProfile ? profileFormData.role : user.role}
                        </span>
                        <span style={{
                          background: 'rgba(255, 255, 255, 0.2)',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600',
                          color: 'white',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          {editingProfile ? profileFormData.department : user.department}
                        </span>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '16px' }}>📍</span>
                          <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>
                            {editingProfile ? profileFormData.location : user.location}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '16px' }}>📅</span>
                          <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>
                            Joined {new Date(user.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setEditingProfile(!editingProfile)}
                    style={{
                      padding: '16px 32px',
                      background: editingProfile 
                        ? 'rgba(255, 255, 255, 0.9)' 
                        : 'rgba(255, 255, 255, 0.2)',
                      color: editingProfile ? 'var(--accent-primary)' : 'white',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {editingProfile ? (
                      <>
                        <span style={{ fontSize: '18px' }}>💾</span>
                        Save Profile
                      </>
                    ) : (
                      <>
                        <span style={{ fontSize: '18px' }}>✏️</span>
                        Edit Profile
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Enhanced Three Column Layout */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'minmax(350px, 1fr) 2fr minmax(300px, 1fr)', 
                gap: '32px',
                marginBottom: '40px'
              }}>
                
                {/* Left Column - Personal Info */}
                <div style={{
                  backgroundColor: 'var(--card-bg)',
                  borderRadius: '28px',
                  padding: '32px',
                  boxShadow: 'var(--neu-raised)',
                  border: 'none',
                  height: 'fit-content'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '28px',
                    paddingBottom: '16px',
                    borderBottom: '2px solid var(--bg-secondary)'
                  }}>
                    <span style={{ fontSize: '24px' }}>📋</span>
                    <h3 style={{ 
                      margin: 0,
                      color: 'var(--text-primary)', 
                      fontSize: '20px',
                      fontWeight: '700'
                    }}>
                      Personal Information
                    </h3>
                  </div>

                  <div style={{ display: 'grid', gap: '24px' }}>
                    {/* Full Name */}
                    <div style={{
                      padding: '20px',
                      backgroundColor: 'var(--bg-secondary)',
                      borderRadius: '16px',
                      border: '1px solid var(--card-border)',
                      transition: 'all 0.3s ease'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '16px' }}>👤</span>
                        <label style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>
                          Full Name
                        </label>
                      </div>
                      {editingProfile ? (
                        <input
                          type="text"
                          value={profileFormData.name}
                          onChange={(e) => setProfileFormData({...profileFormData, name: e.target.value})}
                          className="neu-input"
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '14px',
                            backgroundColor: 'var(--input-bg)',
                            color: 'var(--text-primary)',
                            boxSizing: 'border-box',
                            fontWeight: '500'
                          }}
                          placeholder="Enter your full name"
                        />
                      ) : (
                        <p style={{ margin: 0, fontSize: '15px', color: 'var(--text-primary)', fontWeight: '600' }}>
                          {user.name}
                        </p>
                      )}
                    </div>

                    {/* Job Title/Role */}
                    <div style={{
                      padding: '20px',
                      backgroundColor: 'var(--bg-secondary)',
                      borderRadius: '16px',
                      border: '1px solid var(--card-border)',
                      transition: 'all 0.3s ease'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '16px' }}>💼</span>
                        <label style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>
                          Job Title
                        </label>
                      </div>
                      {editingProfile ? (
                        <input
                          type="text"
                          value={profileFormData.role}
                          onChange={(e) => setProfileFormData({...profileFormData, role: e.target.value})}
                          className="neu-input"
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '14px',
                            backgroundColor: 'var(--input-bg)',
                            color: 'var(--text-primary)',
                            boxSizing: 'border-box',
                            fontWeight: '500'
                          }}
                          placeholder="e.g. Senior Developer, Project Manager"
                        />
                      ) : (
                        <p style={{ margin: 0, fontSize: '15px', color: 'var(--text-primary)', fontWeight: '600' }}>
                          {user.role}
                        </p>
                      )}
                    </div>

                    {/* Department */}
                    <div style={{
                      padding: '20px',
                      backgroundColor: 'var(--bg-secondary)',
                      borderRadius: '16px',
                      border: '1px solid var(--card-border)',
                      transition: 'all 0.3s ease'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '16px' }}>🏢</span>
                        <label style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>
                          Department
                        </label>
                      </div>
                      {editingProfile ? (
                        <input
                          type="text"
                          value={profileFormData.department}
                          onChange={(e) => setProfileFormData({...profileFormData, department: e.target.value})}
                          className="neu-input"
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '14px',
                            backgroundColor: 'var(--input-bg)',
                            color: 'var(--text-primary)',
                            boxSizing: 'border-box',
                            fontWeight: '500'
                          }}
                          placeholder="e.g. Engineering, Marketing, Sales"
                        />
                      ) : (
                        <p style={{ margin: 0, fontSize: '15px', color: 'var(--text-primary)', fontWeight: '600' }}>
                          {user.department}
                        </p>
                      )}
                    </div>

                    {/* Location */}
                    <div style={{
                      padding: '20px',
                      backgroundColor: 'var(--bg-secondary)',
                      borderRadius: '16px',
                      border: '1px solid var(--card-border)',
                      transition: 'all 0.3s ease'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '16px' }}>📍</span>
                        <label style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>
                          Location
                        </label>
                      </div>
                      {editingProfile ? (
                        <input
                          type="text"
                          value={profileFormData.location}
                          onChange={(e) => setProfileFormData({...profileFormData, location: e.target.value})}
                          className="neu-input"
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '14px',
                            backgroundColor: 'var(--input-bg)',
                            color: 'var(--text-primary)',
                            boxSizing: 'border-box',
                            fontWeight: '500'
                          }}
                          placeholder="e.g. New York, Remote, San Francisco"
                        />
                      ) : (
                        <p style={{ margin: 0, fontSize: '15px', color: 'var(--text-primary)', fontWeight: '600' }}>
                          {user.location}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div style={{
                      padding: '20px',
                      backgroundColor: 'var(--bg-secondary)',
                      borderRadius: '16px',
                      border: '1px solid var(--card-border)',
                      transition: 'all 0.3s ease'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '16px' }}>✉️</span>
                        <label style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>
                          Email Address
                        </label>
                      </div>
                      {editingProfile ? (
                        <input
                          type="email"
                          value={profileFormData.email}
                          onChange={(e) => setProfileFormData({...profileFormData, email: e.target.value})}
                          className="neu-input"
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '14px',
                            backgroundColor: 'var(--input-bg)',
                            color: 'var(--text-primary)',
                            boxSizing: 'border-box',
                            fontWeight: '500'
                          }}
                        />
                      ) : (
                        <p style={{ margin: 0, fontSize: '15px', color: 'var(--text-primary)', fontWeight: '600' }}>
                          {user.email}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div style={{
                      padding: '20px',
                      backgroundColor: 'var(--bg-secondary)',
                      borderRadius: '16px',
                      border: '1px solid var(--card-border)',
                      transition: 'all 0.3s ease'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '16px' }}>📞</span>
                        <label style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>
                          Phone Number
                        </label>
                      </div>
                      {editingProfile ? (
                        <input
                          type="tel"
                          value={profileFormData.phone}
                          onChange={(e) => setProfileFormData({...profileFormData, phone: e.target.value})}
                          className="neu-input"
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '14px',
                            backgroundColor: 'var(--input-bg)',
                            color: 'var(--text-primary)',
                            boxSizing: 'border-box',
                            fontWeight: '500'
                          }}
                        />
                      ) : (
                        <p style={{ margin: 0, fontSize: '15px', color: 'var(--text-primary)', fontWeight: '600' }}>
                          {user.phone || 'Not provided'}
                        </p>
                      )}
                    </div>

                    {/* Website */}
                    <div style={{
                      padding: '20px',
                      backgroundColor: 'var(--bg-secondary)',
                      borderRadius: '16px',
                      border: '1px solid var(--card-border)',
                      transition: 'all 0.3s ease'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '16px' }}>🌐</span>
                        <label style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>
                          Website
                        </label>
                      </div>
                      {editingProfile ? (
                        <input
                          type="url"
                          value={profileFormData.website}
                          onChange={(e) => setProfileFormData({...profileFormData, website: e.target.value})}
                          className="neu-input"
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '14px',
                            backgroundColor: 'var(--input-bg)',
                            color: 'var(--text-primary)',
                            boxSizing: 'border-box',
                            fontWeight: '500'
                          }}
                        />
                      ) : (
                        <p style={{ margin: 0, fontSize: '15px', color: 'var(--text-primary)', fontWeight: '600' }}>
                          {user.website ? (
                            <a 
                              href={user.website} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              style={{ 
                                color: 'var(--accent-primary)', 
                                textDecoration: 'none',
                                fontWeight: '600'
                              }}
                            >
                              {user.website}
                            </a>
                          ) : (
                            'Not provided'
                          )}
                        </p>
                      )}
                    </div>
                  </div>

                  {editingProfile && (
                    <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '2px solid var(--bg-secondary)' }}>
                      <div style={{ display: 'flex', gap: '12px', justifyContent: 'stretch' }}>
                        <button
                          onClick={() => {
                            setEditingProfile(false);
                            setProfileFormData({
                              name: user.name,
                              email: user.email,
                              role: user.role,
                              department: user.department,
                              bio: user.bio,
                              location: user.location,
                              website: user.website,
                              phone: user.phone,
                              profileImage: user.profileImage
                            });
                          }}
                          style={{
                            flex: 1,
                            padding: '14px 20px',
                            backgroundColor: 'var(--bg-secondary)',
                            color: 'var(--text-primary)',
                            border: '2px solid var(--card-border)',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '600',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            // Update user object with the form data
                            user.name = profileFormData.name;
                            user.email = profileFormData.email;
                            user.role = profileFormData.role;
                            user.department = profileFormData.department;
                            user.bio = profileFormData.bio;
                            user.location = profileFormData.location;
                            user.website = profileFormData.website;
                            user.phone = profileFormData.phone;
                            user.profileImage = profileFormData.profileImage;
                            
                            addNotification('success', 'Profile updated successfully!');
                            setEditingProfile(false);
                          }}
                          style={{
                            flex: 1,
                            padding: '14px 20px',
                            background: 'linear-gradient(135deg, var(--accent-success) 0%, #219a52 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '600',
                            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Middle Column - Bio & Professional Info */}
                <div style={{
                  backgroundColor: 'var(--card-bg)',
                  borderRadius: '28px',
                  padding: '32px',
                  boxShadow: 'var(--neu-raised)',
                  border: 'none'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '28px',
                    paddingBottom: '16px',
                    borderBottom: '2px solid var(--bg-secondary)'
                  }}>
                    <span style={{ fontSize: '24px' }}>👨‍💼</span>
                    <h3 style={{ 
                      margin: 0,
                      color: 'var(--text-primary)', 
                      fontSize: '20px',
                      fontWeight: '700'
                    }}>
                      Professional Profile
                    </h3>
                  </div>

                  {/* Bio Section */}
                  <div style={{
                    padding: '24px',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '20px',
                    border: '1px solid var(--card-border)',
                    marginBottom: '24px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                      <span style={{ fontSize: '18px' }}>💭</span>
                      <label style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '600' }}>
                        About Me
                      </label>
                    </div>
                    {editingProfile ? (
                      <textarea
                        value={profileFormData.bio}
                        onChange={(e) => setProfileFormData({...profileFormData, bio: e.target.value})}
                        rows={6}
                        className="neu-input"
                        style={{
                          width: '100%',
                          padding: '16px 20px',
                          border: 'none',
                          borderRadius: '16px',
                          fontSize: '15px',
                          backgroundColor: 'var(--input-bg)',
                          color: 'var(--text-primary)',
                          fontFamily: 'inherit',
                          resize: 'vertical',
                          boxSizing: 'border-box',
                          lineHeight: '1.6',
                          fontWeight: '500'
                        }}
                        placeholder="Tell us about yourself, your experience, and what drives you..."
                      />
                    ) : (
                      <p style={{ 
                        margin: 0, 
                        fontSize: '16px', 
                        color: 'var(--text-primary)', 
                        lineHeight: '1.7',
                        fontWeight: '500'
                      }}>
                        {user.bio || 'No bio provided yet. Share something about yourself!'}
                      </p>
                    )}
                  </div>

                  {/* Professional Stats */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '16px'
                  }}>
                    <div style={{
                      padding: '20px',
                      backgroundColor: 'var(--bg-secondary)',
                      borderRadius: '16px',
                      textAlign: 'center',
                      border: '1px solid var(--card-border)',
                      transition: 'all 0.3s ease'
                    }}>
                      <div style={{ fontSize: '24px', marginBottom: '8px' }}>🎯</div>
                      <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>
                        {Math.round((tasks.filter(t => t.assignee === user.name && t.status === 'done').length / Math.max(tasks.filter(t => t.assignee === user.name).length, 1)) * 100)}%
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>Success Rate</div>
                    </div>
                    <div style={{
                      padding: '20px',
                      backgroundColor: 'var(--bg-secondary)',
                      borderRadius: '16px',
                      textAlign: 'center',
                      border: '1px solid var(--card-border)',
                      transition: 'all 0.3s ease'
                    }}>
                      <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚡</div>
                      <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>
                        {tasks.filter(t => t.assignee === user.name).reduce((sum, t) => sum + t.completedHours, 0) / Math.max(tasks.filter(t => t.assignee === user.name).reduce((sum, t) => sum + t.estimatedHours, 0), 1) > 1 ? '🔥' : '💪'}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>Productivity</div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Quick Stats */}
                <div style={{
                  backgroundColor: 'var(--card-bg)',
                  borderRadius: '28px',
                  padding: '32px',
                  boxShadow: 'var(--neu-raised)',
                  border: 'none',
                  height: 'fit-content'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '28px',
                    paddingBottom: '16px',
                    borderBottom: '2px solid var(--bg-secondary)'
                  }}>
                    <span style={{ fontSize: '24px' }}>📊</span>
                    <h3 style={{ 
                      margin: 0,
                      color: 'var(--text-primary)', 
                      fontSize: '20px',
                      fontWeight: '700'
                    }}>
                      Activity Stats
                    </h3>
                  </div>

                  <div style={{ display: 'grid', gap: '16px' }}>
                    {[
                      {
                        icon: '📋',
                        value: tasks.filter(t => t.assignee === user.name).length,
                        label: 'Total Tasks',
                        color: 'var(--accent-primary)'
                      },
                      {
                        icon: '✅',
                        value: tasks.filter(t => t.assignee === user.name && t.status === 'done').length,
                        label: 'Completed',
                        color: 'var(--accent-success)'
                      },
                      {
                        icon: '🚀',
                        value: tasks.filter(t => t.assignee === user.name && t.status === 'in-progress').length,
                        label: 'In Progress',
                        color: 'var(--accent-warning)'
                      },
                      {
                        icon: '⏱️',
                        value: `${tasks.filter(t => t.assignee === user.name).reduce((sum, t) => sum + t.completedHours, 0)}h`,
                        label: 'Hours Logged',
                        color: 'var(--accent-secondary)'
                      }
                    ].map((stat, index) => (
                      <div key={index} style={{
                        padding: '20px',
                        backgroundColor: 'var(--bg-secondary)',
                        borderRadius: '16px',
                        border: '1px solid var(--card-border)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = 'var(--neu-raised)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div>
                            <div style={{ 
                              fontSize: '24px', 
                              fontWeight: '800', 
                              color: 'var(--text-primary)',
                              marginBottom: '4px'
                            }}>
                              {stat.value}
                            </div>
                            <div style={{ 
                              fontSize: '13px', 
                              color: 'var(--text-muted)', 
                              fontWeight: '600',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
                            }}>
                              {stat.label}
                            </div>
                          </div>
                          <div style={{ 
                            fontSize: '32px',
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                          }}>
                            {stat.icon}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Achievement Badges Section */}
              <div style={{
                backgroundColor: 'var(--card-bg)',
                borderRadius: '28px',
                padding: '32px',
                boxShadow: 'var(--neu-raised)',
                border: 'none'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '28px'
                }}>
                  <span style={{ fontSize: '24px' }}>🏆</span>
                  <h3 style={{ 
                    margin: 0,
                    color: 'var(--text-primary)', 
                    fontSize: '20px',
                    fontWeight: '700'
                  }}>
                    Achievement Badges
                  </h3>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '20px'
                }}>
                  {[
                    {
                      title: 'Task Master',
                      description: 'Completed 5+ tasks',
                      icon: '🎯',
                      earned: tasks.filter(t => t.assignee === user.name && t.status === 'done').length >= 5,
                      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                    },
                    {
                      title: 'Team Player',
                      description: 'Active in 3+ projects',
                      icon: '🤝',
                      earned: new Set(tasks.filter(t => t.assignee === user.name).map(t => t.project)).size >= 3,
                      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                    },
                    {
                      title: 'Time Keeper',
                      description: 'Logged 20+ hours',
                      icon: '⏰',
                      earned: tasks.filter(t => t.assignee === user.name).reduce((sum, t) => sum + t.completedHours, 0) >= 20,
                      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
                    },
                    {
                      title: 'High Achiever',
                      description: '90%+ success rate',
                      icon: '🌟',
                      earned: (tasks.filter(t => t.assignee === user.name && t.status === 'done').length / Math.max(tasks.filter(t => t.assignee === user.name).length, 1)) >= 0.9,
                      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
                    }
                  ].map((badge, index) => (
                    <div key={index} style={{
                      padding: '24px',
                      background: badge.earned ? badge.gradient : 'var(--bg-secondary)',
                      borderRadius: '20px',
                      textAlign: 'center',
                      border: badge.earned ? 'none' : '2px dashed var(--card-border)',
                      opacity: badge.earned ? 1 : 0.6,
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      if (badge.earned) {
                        e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 12px 25px rgba(0,0,0,0.2)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}>
                      {badge.earned && (
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'rgba(255,255,255,0.1)',
                          borderRadius: '20px'
                        }} />
                      )}
                      <div style={{ 
                        fontSize: '40px', 
                        marginBottom: '12px',
                        position: 'relative',
                        zIndex: 1
                      }}>
                        {badge.icon}
                      </div>
                      <h4 style={{ 
                        margin: '0 0 8px 0', 
                        fontSize: '16px', 
                        fontWeight: '700',
                        color: badge.earned ? 'white' : 'var(--text-primary)',
                        position: 'relative',
                        zIndex: 1
                      }}>
                        {badge.title}
                      </h4>
                      <p style={{ 
                        margin: 0, 
                        fontSize: '12px', 
                        color: badge.earned ? 'rgba(255,255,255,0.9)' : 'var(--text-muted)',
                        fontWeight: '500',
                        position: 'relative',
                        zIndex: 1
                      }}>
                        {badge.description}
                      </p>
                      {badge.earned && (
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          background: 'rgba(255,255,255,0.9)',
                          borderRadius: '50%',
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px'
                        }}>
                          ✓
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Image Cropper Modal */}
          {showImageCropper && selectedImageFile && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{
                backgroundColor: 'var(--card-bg)',
                borderRadius: '24px',
                padding: '32px',
                maxWidth: '600px',
                width: '90%',
                maxHeight: '80vh',
                overflow: 'auto',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
                border: '1px solid var(--card-border)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '24px',
                  paddingBottom: '16px',
                  borderBottom: '2px solid var(--bg-secondary)'
                }}>
                  <h3 style={{
                    margin: 0,
                    color: 'var(--text-primary)',
                    fontSize: '20px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <span style={{ fontSize: '24px' }}>✂️</span>
                    Crop Your Profile Photo
                  </h3>
                  <button
                    onClick={() => {
                      setShowImageCropper(false);
                      setSelectedImageFile(null);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '24px',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      padding: '8px',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--text-muted)';
                    }}
                  >
                    ×
                  </button>
                </div>

                {/* Image Preview and Crop Controls */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px'
                }}>
                  {/* Preview Container - Perfect Square */}
                  <div style={{
                    position: 'relative',
                    width: '400px',
                    height: '400px',
                    margin: '0 auto',
                    border: '3px solid var(--accent-primary)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    backgroundColor: 'var(--bg-secondary)',
                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)'
                  }}>
                    <img
                      src={selectedImageFile}
                      alt="Profile preview"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center center'
                      }}
                    />
                    
                    {/* Enhanced Crop Overlay with Perfect Circle */}
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '220px',
                      height: '220px',
                      border: '4px solid #00d4ff',
                      borderRadius: '50%',
                      boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(0, 212, 255, 0.3)',
                      pointerEvents: 'none',
                      animation: 'pulse 2s infinite'
                    }} />
                    
                    {/* Inner Guide Circle */}
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '220px',
                      height: '220px',
                      border: '2px dashed rgba(255, 255, 255, 0.8)',
                      borderRadius: '50%',
                      pointerEvents: 'none'
                    }} />
                    
                    {/* Center Crosshair */}
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '40px',
                      height: '4px',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '2px',
                      pointerEvents: 'none'
                    }} />
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '4px',
                      height: '40px',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '2px',
                      pointerEvents: 'none'
                    }} />
                  </div>

                  {/* Enhanced Crop Instructions */}
                  <div style={{
                    textAlign: 'center',
                    padding: '20px',
                    background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
                    borderRadius: '16px',
                    border: '2px solid rgba(0, 212, 255, 0.2)',
                    boxShadow: '0 8px 20px rgba(0, 212, 255, 0.1)'
                  }}>
                    <div style={{
                      fontSize: '24px',
                      marginBottom: '8px'
                    }}>✨</div>
                    <p style={{
                      margin: '0 0 8px 0',
                      color: 'var(--text-primary)',
                      fontSize: '16px',
                      fontWeight: '700'
                    }}>
                      Perfect Profile Photo Cropping
                    </p>
                    <p style={{
                      margin: 0,
                      color: 'var(--text-muted)',
                      fontSize: '14px',
                      lineHeight: '1.5'
                    }}>
                      Your image will be automatically cropped to a perfect square and optimized for display in circular frames. The center portion will be used for the best visual result.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div style={{
                    display: 'flex',
                    gap: '16px',
                    justifyContent: 'center'
                  }}>
                    <button
                      onClick={() => {
                        setShowImageCropper(false);
                        setSelectedImageFile(null);
                      }}
                      style={{
                        padding: '14px 24px',
                        backgroundColor: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        border: '2px solid var(--card-border)',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--card-bg)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      Cancel
                    </button>
                    
                    <button
                      onClick={() => {
                        // Create a canvas to crop the image
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        const img = new Image();
                        
                        img.onload = () => {
                          // Set ultra-high resolution canvas for perfect quality
                          const targetSize = 600; // Higher resolution for crisp display
                          canvas.width = targetSize;
                          canvas.height = targetSize;
                          
                          // Calculate perfect center square crop
                          const sourceSize = Math.min(img.width, img.height);
                          const startX = (img.width - sourceSize) / 2;
                          const startY = (img.height - sourceSize) / 2;
                          
                          // Enable maximum quality rendering
                          if (ctx) {
                            ctx.imageSmoothingEnabled = true;
                            ctx.imageSmoothingQuality = 'high';
                            
                            // Clear with transparent background
                            ctx.clearRect(0, 0, targetSize, targetSize);
                            
                            // Apply perfect square crop with anti-aliasing
                            ctx.drawImage(
                              img,
                              startX, startY, sourceSize, sourceSize, // Perfect center square source
                              0, 0, targetSize, targetSize           // Full canvas destination
                            );
                            
                            // Convert to ultra-high quality JPEG
                            const croppedImage = canvas.toDataURL('image/jpeg', 0.98);
                            setProfileFormData(prev => ({
                              ...prev,
                              profileImage: croppedImage
                            }));
                            setShowImageCropper(false);
                            setSelectedImageFile(null);
                          }
                        };
                        
                        img.crossOrigin = 'anonymous'; // Ensure cross-origin compatibility
                        img.src = selectedImageFile;
                      }}
                      style={{
                        padding: '14px 24px',
                        background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600',
                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
                      }}
                    >
                      <span style={{ fontSize: '16px' }}>✓</span>
                      Use This Photo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentView === 'settings' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                  <h2 style={{ color: 'var(--text-primary)', marginBottom: '10px' }}>⚙️ Settings</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '16px', margin: 0 }}>Customize your TaskFlow experience</p>
                </div>
                <button
                  onClick={resetSettings}
                  style={{
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: 'var(--neu-subtle)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLButtonElement;
                    target.style.transform = 'translateY(-2px)';
                    target.style.boxShadow = 'var(--neu-raised)';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLButtonElement;
                    target.style.transform = 'translateY(0)';
                    target.style.boxShadow = 'var(--neu-subtle)';
                  }}
                >
                  🔄 Reset to Defaults
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
                
                {/* Appearance Settings */}
                <div style={{
                  backgroundColor: 'var(--card-bg)',
                  borderRadius: '16px',
                  padding: '30px',
                  boxShadow: 'var(--neu-subtle)',
                  border: 'none',
                  transition: 'all 0.3s ease'
                }}>
                  <h3 style={{ 
                    color: 'var(--text-primary)', 
                    marginBottom: '20px', 
                    fontSize: '20px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    🎨 Appearance
                  </h3>
                  
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: '600' }}>
                      Theme
                    </label>
                    <select
                      value={settings.theme}
                      onChange={(e) => updateSetting('theme', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '15px',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--text-primary)',
                        boxShadow: 'var(--neu-subtle)'
                      }}
                    >
                      <option value="light">🌞 Light Mode</option>
                      <option value="dark">🌙 Dark Mode</option>
                      <option value="auto">🔄 Auto (System)</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: '600' }}>
                      Task View Style
                    </label>
                    <select
                      value={settings.taskViewStyle}
                      onChange={(e) => updateSetting('taskViewStyle', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '15px',
                        outline: 'none',
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--text-primary)',
                        transition: 'all 0.3s ease',
                        boxShadow: 'var(--neu-subtle)'
                      }}
                    >
                      <option value="cards">🗃️ Cards View</option>
                      <option value="list">📋 List View</option>
                      <option value="kanban">📊 Kanban Board</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: '600' }}>
                      Default Project Color
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <input
                        type="color"
                        value={settings.defaultProjectColor}
                        onChange={(e) => updateSetting('defaultProjectColor', e.target.value)}
                        style={{
                          width: '50px',
                          height: '40px',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          boxShadow: 'var(--neu-subtle)'
                        }}
                      />
                      <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                        {settings.defaultProjectColor}
                      </span>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '12px',
                    marginBottom: '16px',
                    boxShadow: 'var(--neu-subtle)',
                    border: 'none'
                  }}>
                    <div>
                      <span style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '14px' }}>
                        Compact View
                      </span>
                      <p style={{ color: 'var(--text-muted)', fontSize: '12px', margin: '4px 0 0 0' }}>
                        Show more items in less space
                      </p>
                    </div>
                    <label style={{ 
                      position: 'relative', 
                      display: 'inline-block', 
                      width: '50px', 
                      height: '24px' 
                    }}>
                      <input
                        type="checkbox"
                        checked={settings.compactView}
                        onChange={(e) => updateSetting('compactView', e.target.checked)}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />
                      <span style={{
                        position: 'absolute',
                        cursor: 'pointer',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: settings.compactView ? '#3498db' : '#ccc',
                        transition: '0.3s',
                        borderRadius: '24px'
                      }}>
                        <span style={{
                          position: 'absolute',
                          content: '',
                          height: '18px',
                          width: '18px',
                          left: settings.compactView ? '29px' : '3px',
                          bottom: '3px',
                          backgroundColor: 'white',
                          transition: '0.3s',
                          borderRadius: '50%'
                        }} />
                      </span>
                    </label>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '12px',
                    boxShadow: 'var(--neu-subtle)',
                    border: 'none'
                  }}>
                    <div>
                      <span style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '14px' }}>
                        Show Completed Tasks
                      </span>
                      <p style={{ color: 'var(--text-muted)', fontSize: '12px', margin: '4px 0 0 0' }}>
                        Display completed tasks in lists
                      </p>
                    </div>
                    <label style={{ 
                      position: 'relative', 
                      display: 'inline-block', 
                      width: '50px', 
                      height: '24px' 
                    }}>
                      <input
                        type="checkbox"
                        checked={settings.showCompletedTasks}
                        onChange={(e) => updateSetting('showCompletedTasks', e.target.checked)}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />
                      <span style={{
                        position: 'absolute',
                        cursor: 'pointer',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: settings.showCompletedTasks ? '#3498db' : '#ccc',
                        transition: '0.3s',
                        borderRadius: '24px'
                      }}>
                        <span style={{
                          position: 'absolute',
                          content: '',
                          height: '18px',
                          width: '18px',
                          left: settings.showCompletedTasks ? '29px' : '3px',
                          bottom: '3px',
                          backgroundColor: 'white',
                          transition: '0.3s',
                          borderRadius: '50%'
                        }} />
                      </span>
                    </label>
                  </div>
                </div>

                {/* Localization Settings */}
                <div style={{
                  backgroundColor: 'var(--card-bg)',
                  borderRadius: '16px',
                  padding: '30px',
                  boxShadow: 'var(--neu-subtle)',
                  border: 'none',
                  transition: 'all 0.3s ease'
                }}>
                  <h3 style={{ 
                    color: 'var(--text-primary)', 
                    marginBottom: '20px', 
                    fontSize: '20px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    🌍 Localization
                  </h3>
                  
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: '600' }}>
                      Language
                    </label>
                    <select
                      value={settings.language}
                      onChange={(e) => updateSetting('language', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '15px',
                        outline: 'none',
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--text-primary)',
                        boxShadow: 'var(--neu-subtle)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <option value="en">🇺🇸 English</option>
                      <option value="es">🇪🇸 Español</option>
                      <option value="fr">🇫🇷 Français</option>
                      <option value="de">🇩🇪 Deutsch</option>
                      <option value="it">🇮🇹 Italiano</option>
                      <option value="pt">🇵🇹 Português</option>
                      <option value="zh">🇨🇳 中文</option>
                      <option value="ja">🇯🇵 日本語</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: '600' }}>
                      Timezone
                    </label>
                    <select
                      value={settings.timezone}
                      onChange={(e) => updateSetting('timezone', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '15px',
                        outline: 'none',
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--text-primary)',
                        boxShadow: 'var(--neu-subtle)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <option value="UTC">🌍 UTC</option>
                      <option value="America/New_York">🗽 Eastern Time</option>
                      <option value="America/Chicago">🌆 Central Time</option>
                      <option value="America/Denver">🏔️ Mountain Time</option>
                      <option value="America/Los_Angeles">🌴 Pacific Time</option>
                      <option value="Europe/London">🏰 London</option>
                      <option value="Europe/Paris">🗼 Paris</option>
                      <option value="Asia/Tokyo">🗾 Tokyo</option>
                      <option value="Asia/Shanghai">🏮 Shanghai</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: '600' }}>
                      Date Format
                    </label>
                    <select
                      value={settings.dateFormat}
                      onChange={(e) => updateSetting('dateFormat', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '15px',
                        outline: 'none',
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--text-primary)',
                        boxShadow: 'var(--neu-subtle)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <option value="MM/DD/YYYY">📅 MM/DD/YYYY (US)</option>
                      <option value="DD/MM/YYYY">📅 DD/MM/YYYY (EU)</option>
                      <option value="YYYY-MM-DD">📅 YYYY-MM-DD (ISO)</option>
                      <option value="DD MMM YYYY">📅 DD MMM YYYY</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: '600' }}>
                      Time Format
                    </label>
                    <select
                      value={settings.timeFormat}
                      onChange={(e) => updateSetting('timeFormat', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '15px',
                        outline: 'none',
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--text-primary)',
                        boxShadow: 'var(--neu-subtle)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <option value="12h">🕐 12-hour (AM/PM)</option>
                      <option value="24h">🕐 24-hour</option>
                    </select>
                  </div>
                </div>

                {/* Notifications Settings */}
                <div style={{
                  backgroundColor: 'var(--card-bg)',
                  borderRadius: '16px',
                  padding: '30px',
                  boxShadow: 'var(--neu-subtle)',
                  border: 'none',
                  transition: 'all 0.3s ease'
                }}>
                  <h3 style={{ 
                    color: 'var(--text-primary)', 
                    marginBottom: '20px', 
                    fontSize: '20px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    🔔 Notifications
                  </h3>
                  
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive updates via email' },
                    { key: 'pushNotifications', label: 'Push Notifications', description: 'Browser notifications for updates' },
                    { key: 'taskReminders', label: 'Task Reminders', description: 'Reminders for due tasks' },
                    { key: 'weeklyReports', label: 'Weekly Reports', description: 'Weekly progress summaries' }
                  ].map((item, index) => (
                    <div key={item.key} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '16px',
                      backgroundColor: 'var(--bg-secondary)',
                      borderRadius: '12px',
                      marginBottom: index < 3 ? '16px' : '0',
                      boxShadow: 'var(--neu-subtle)',
                      border: 'none'
                    }}>
                      <div>
                        <span style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '14px' }}>
                          {item.label}
                        </span>
                        <p style={{ color: 'var(--text-muted)', fontSize: '12px', margin: '4px 0 0 0' }}>
                          {item.description}
                        </p>
                      </div>
                      <label style={{ 
                        position: 'relative', 
                        display: 'inline-block', 
                        width: '50px', 
                        height: '24px' 
                      }}>
                        <input
                          type="checkbox"
                          checked={settings[item.key as keyof typeof settings] as boolean}
                          onChange={(e) => updateSetting(item.key, e.target.checked)}
                          style={{ opacity: 0, width: 0, height: 0 }}
                        />
                        <span style={{
                          position: 'absolute',
                          cursor: 'pointer',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: (settings[item.key as keyof typeof settings] as boolean) ? '#3498db' : '#ccc',
                          transition: '0.3s',
                          borderRadius: '24px'
                        }}>
                          <span style={{
                            position: 'absolute',
                            content: '',
                            height: '18px',
                            width: '18px',
                            left: (settings[item.key as keyof typeof settings] as boolean) ? '29px' : '3px',
                            bottom: '3px',
                            backgroundColor: 'white',
                            transition: '0.3s',
                            borderRadius: '50%'
                          }} />
                        </span>
                      </label>
                    </div>
                  ))}
                </div>

                {/* Productivity Settings */}
                <div style={{
                  backgroundColor: 'var(--card-bg)',
                  borderRadius: '16px',
                  padding: '30px',
                  boxShadow: 'var(--neu-subtle)',
                  border: 'none',
                  transition: 'all 0.3s ease'
                }}>
                  <h3 style={{ 
                    color: 'var(--text-primary)', 
                    marginBottom: '20px', 
                    fontSize: '20px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    ⚡ Productivity
                  </h3>
                  
                    <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: '600' }}>
                      Auto-Save Interval
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <input
                        type="range"
                        min="1"
                        max="30"
                        value={settings.autoSaveInterval}
                        onChange={(e) => updateSetting('autoSaveInterval', parseInt(e.target.value))}
                        style={{
                          flex: 1,
                          height: '6px',
                          borderRadius: '3px',
                          background: 'var(--bg-tertiary)',
                          outline: 'none',
                          WebkitAppearance: 'none',
                          appearance: 'none'
                        }}
                        className="range-slider"
                      />
                      <span style={{ 
                        color: '#3498db', 
                        fontWeight: '600', 
                        fontSize: '14px',
                        minWidth: '60px',
                        textAlign: 'center'
                      }}>
                        {settings.autoSaveInterval} min
                      </span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '12px', margin: '8px 0 0 0' }}>
                      How often to automatically save your work
                    </p>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: '600' }}>
                      Default Task Priority
                    </label>
                    <select
                      value={settings.defaultTaskPriority}
                      onChange={(e) => updateSetting('defaultTaskPriority', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '15px',
                        outline: 'none',
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--text-primary)',
                        boxShadow: 'var(--neu-subtle)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <option value="low">🟢 Low Priority</option>
                      <option value="medium">🟡 Medium Priority</option>
                      <option value="high">🔴 High Priority</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Footer Info */}
              <div style={{
                marginTop: '40px',
                padding: '30px',
                backgroundColor: 'var(--card-bg)',
                borderRadius: '16px',
                boxShadow: 'var(--neu-subtle)',
                border: 'none',
                textAlign: 'center'
              }}>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '18px', fontWeight: '600' }}>
                  📊 Application Information
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                  <div>
                    <strong style={{ color: '#3498db' }}>Version</strong>
                    <p style={{ color: 'var(--text-muted)', margin: '4px 0' }}>v2.1.0</p>
                  </div>
                  <div>
                    <strong style={{ color: '#27ae60' }}>Last Updated</strong>
                    <p style={{ color: 'var(--text-muted)', margin: '4px 0' }}>July 17, 2025</p>
                  </div>
                  <div>
                    <strong style={{ color: '#e74c3c' }}>Storage Used</strong>
                    <p style={{ color: 'var(--text-muted)', margin: '4px 0' }}>2.4 MB</p>
                  </div>
                  <div>
                    <strong style={{ color: '#f39c12' }}>Active Since</strong>
                    <p style={{ color: 'var(--text-muted)', margin: '4px 0' }}>January 2024</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Home page when not logged in
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        padding: '20px 40px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#2c3e50'
        }}>
          📋 TaskManager Pro
        </div>
        <button
          onClick={() => setShowLogin(true)}
          style={{
            padding: '12px 24px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Sign In
        </button>
      </header>

      {/* Main Content */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px 20px'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: '#2c3e50',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          Manage Your Tasks Like a Pro
        </h1>
        <p style={{
          fontSize: '20px',
          color: 'var(--text-muted)',
          marginBottom: '40px',
          textAlign: 'center',
          maxWidth: '600px',
          lineHeight: '1.6'
        }}>
          Streamline your workflow with our powerful task management platform. 
          Collaborate with teams, track progress, and achieve your goals efficiently.
        </p>
        <button
          onClick={() => setShowLogin(true)}
          style={{
            padding: '15px 30px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '18px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)'
          }}
        >
          Get Started
        </button>
      </main>

      {/* Login Modal */}
      {showLogin && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
            width: '400px',
            maxWidth: '90vw'
          }}>
            <h2 style={{ color: '#2c3e50', marginBottom: '30px', textAlign: 'center' }}>Welcome Back!</h2>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)' }}>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid var(--input-border)',
                  borderRadius: '6px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  backgroundColor: 'var(--input-bg)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>
            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)' }}>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid var(--input-border)',
                  borderRadius: '6px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  backgroundColor: 'var(--input-bg)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleLogin}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  cursor: 'pointer'
                }}
              >
                Sign In
              </button>
              <button
                onClick={() => setShowLogin(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: '#95a5a6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
