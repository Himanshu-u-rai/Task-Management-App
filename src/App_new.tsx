import React, { useState } from 'react';

function App() {
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
  
  // Task Form States
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('medium');
  const [newTaskProject, setNewTaskProject] = useState('General');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  
  // Project Form States
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [newProjectColor, setNewProjectColor] = useState('#3498db');

  // User and notification state
  const [user] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '👤',
    role: 'Project Manager',
    department: 'Engineering',
    joinDate: '2023-01-15'
  });

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'success', message: 'Task "Design Homepage" completed!', time: '2 minutes ago', read: false },
    { id: 2, type: 'info', message: 'New team member added to project', time: '1 hour ago', read: false },
    { id: 3, type: 'warning', message: 'Deadline approaching for "Mobile App"', time: '3 hours ago', read: true }
  ]);

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
      completedHours: 5
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
      completedHours: 0
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
      completedHours: 6
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
      completedHours: 3
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
      completedHours: 0
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
      priority: newTaskPriority,
      status: 'todo',
      project: newTaskProject,
      assignee: user.name,
      dueDate: newTaskDueDate,
      createdAt: new Date().toISOString().split('T')[0],
      estimatedHours: 4,
      completedHours: 0
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
      color: newProjectColor,
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
  };

  const markNotificationAsRead = (notificationId: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const resetTaskForm = () => {
    setNewTaskTitle('');
    setNewTaskDescription('');
    setNewTaskPriority('medium');
    setNewTaskProject('General');
    setNewTaskDueDate('');
  };

  const resetProjectForm = () => {
    setNewProjectName('');
    setNewProjectDescription('');
    setNewProjectColor('#3498db');
  };

  const updateUserProfile = (field: string, value: string) => {
    // In a real app, this would update the user state
    addNotification('success', 'Profile updated successfully!');
  };

  const getFilteredTasks = () => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
      const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  };

  const getTasksByStatus = (status: string) => {
    return getFilteredTasks().filter(task => task.status === status);
  };

  const calculateProjectProgress = (projectId: number) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return 0;
    const projectTasks = tasks.filter(task => task.project === project.name);
    if (projectTasks.length === 0) return 0;
    const completedTasks = projectTasks.filter(task => task.status === 'done').length;
    return Math.round((completedTasks / projectTasks.length) * 100);
  };

  // Header Component
  const renderHeader = () => (
    <div style={{
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
      <nav style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <button
          onClick={() => setCurrentView('dashboard')}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            color: currentView === 'dashboard' ? '#3498db' : '#666'
          }}
        >
          📊 Dashboard
        </button>
        <button
          onClick={() => setCurrentView('project')}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            color: currentView === 'project' ? '#3498db' : '#666'
          }}
        >
          📁 Projects
        </button>
        <button
          onClick={() => setCurrentView('profile')}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            color: currentView === 'profile' ? '#3498db' : '#666'
          }}
        >
          👤 Profile
        </button>
        <button
          onClick={() => setCurrentView('settings')}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            color: currentView === 'settings' ? '#3498db' : '#666'
          }}
        >
          ⚙️ Settings
        </button>
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Logout
        </button>
      </nav>
    </div>
  );

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
            border: '4px solid #e3e3e3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{ fontSize: '18px', color: '#666' }}>Signing you in...</p>
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
        backgroundColor: '#f8f9fa',
        fontFamily: 'Arial, sans-serif'
      }}>
        {renderHeader()}

        {/* Task Creation Modal */}
        {showCreateTask && (
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
              borderRadius: '12px',
              padding: '30px',
              width: '500px',
              maxWidth: '90vw'
            }}>
              <h3 style={{ margin: '0 0 20px 0', color: '#2c3e50' }}>Create New Task</h3>
              <input
                type="text"
                placeholder="Task title..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  marginBottom: '15px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
              <textarea
                placeholder="Task description..."
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  marginBottom: '15px',
                  fontSize: '16px',
                  minHeight: '80px',
                  boxSizing: 'border-box',
                  resize: 'vertical'
                }}
              />
              <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '16px'
                  }}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <select
                  value={newTaskProject}
                  onChange={(e) => setNewTaskProject(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '16px'
                  }}
                >
                  <option value="General">General</option>
                  {projects.map(project => (
                    <option key={project.id} value={project.name}>{project.name}</option>
                  ))}
                </select>
              </div>
              <input
                type="date"
                value={newTaskDueDate}
                onChange={(e) => setNewTaskDueDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  marginBottom: '20px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={addTask}
                  style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  Create Task
                </button>
                <button
                  onClick={() => setShowCreateTask(false)}
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
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '30px',
              width: '500px',
              maxWidth: '90vw'
            }}>
              <h3 style={{ margin: '0 0 20px 0', color: '#2c3e50' }}>Create New Project</h3>
              <input
                type="text"
                placeholder="Project name..."
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  marginBottom: '15px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
              <textarea
                placeholder="Project description..."
                value={newProjectDescription}
                onChange={(e) => setNewProjectDescription(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  marginBottom: '15px',
                  fontSize: '16px',
                  minHeight: '80px',
                  boxSizing: 'border-box',
                  resize: 'vertical'
                }}
              />
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Project Color</label>
                <input
                  type="color"
                  value={newProjectColor}
                  onChange={(e) => setNewProjectColor(e.target.value)}
                  style={{
                    width: '60px',
                    height: '40px',
                    border: '1px solid #ddd',
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
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '30px',
              width: '600px',
              maxWidth: '90vw',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, color: '#2c3e50' }}>{selectedTask.title}</h3>
                <button
                  onClick={() => setShowTaskDetails(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '20px',
                    cursor: 'pointer',
                    color: '#666'
                  }}
                >
                  ✕
                </button>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <p style={{ color: '#666', lineHeight: '1.6' }}>{selectedTask.description}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <strong style={{ color: '#2c3e50' }}>Priority:</strong>
                  <span style={{
                    marginLeft: '10px',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    backgroundColor: selectedTask.priority === 'high' ? '#ffebee' : selectedTask.priority === 'medium' ? '#fff3e0' : '#e8f5e8',
                    color: selectedTask.priority === 'high' ? '#d32f2f' : selectedTask.priority === 'medium' ? '#f57c00' : '#388e3c'
                  }}>
                    {selectedTask.priority.toUpperCase()}
                  </span>
                </div>
                <div>
                  <strong style={{ color: '#2c3e50' }}>Status:</strong>
                  <span style={{
                    marginLeft: '10px',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    backgroundColor: selectedTask.status === 'done' ? '#e8f5e8' : selectedTask.status === 'in-progress' ? '#fff3e0' : '#e3f2fd',
                    color: selectedTask.status === 'done' ? '#388e3c' : selectedTask.status === 'in-progress' ? '#f57c00' : '#1976d2'
                  }}>
                    {selectedTask.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
                <div>
                  <strong style={{ color: '#2c3e50' }}>Project:</strong> {selectedTask.project}
                </div>
                <div>
                  <strong style={{ color: '#2c3e50' }}>Assignee:</strong> {selectedTask.assignee}
                </div>
                <div>
                  <strong style={{ color: '#2c3e50' }}>Due Date:</strong> {selectedTask.dueDate || 'No due date'}
                </div>
                <div>
                  <strong style={{ color: '#2c3e50' }}>Created:</strong> {selectedTask.createdAt}
                </div>
                <div>
                  <strong style={{ color: '#2c3e50' }}>Estimated Hours:</strong> {selectedTask.estimatedHours}h
                </div>
                <div>
                  <strong style={{ color: '#2c3e50' }}>Completed Hours:</strong> {selectedTask.completedHours}h
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
                    <h2 style={{ color: '#2c3e50', marginBottom: '10px' }}>Welcome back, {user.name}! 👋</h2>
                    <p style={{ color: '#666', fontSize: '16px' }}>Here's an overview of your projects and tasks</p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div style={{ position: 'relative' }}>
                      <button 
                        onClick={() => setShowNotifications(!showNotifications)}
                        style={{
                          padding: '10px',
                          backgroundColor: 'white',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '18px',
                          position: 'relative'
                        }}
                      >
                        🔔
                        {notifications.filter(n => !n.read).length > 0 && (
                          <span style={{
                            position: 'absolute',
                            top: '-5px',
                            right: '-5px',
                            backgroundColor: '#e74c3c',
                            color: 'white',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            {notifications.filter(n => !n.read).length}
                          </span>
                        )}
                      </button>
                      {showNotifications && (
                        <div style={{
                          position: 'absolute',
                          top: '100%',
                          right: 0,
                          backgroundColor: 'white',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                          width: '300px',
                          maxHeight: '400px',
                          overflowY: 'auto',
                          zIndex: 1000
                        }}>
                          <div style={{ padding: '15px', borderBottom: '1px solid #eee' }}>
                            <h4 style={{ margin: 0, color: '#2c3e50' }}>Notifications</h4>
                          </div>
                          {notifications.length === 0 ? (
                            <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                              No notifications
                            </div>
                          ) : (
                            notifications.slice(0, 5).map(notif => (
                              <div key={notif.id} style={{
                                padding: '15px',
                                borderBottom: '1px solid #f0f0f0',
                                backgroundColor: notif.read ? '#fff' : '#f8f9fa',
                                cursor: 'pointer'
                              }}
                              onClick={() => markNotificationAsRead(notif.id)}>
                                <div style={{ 
                                  fontSize: '14px', 
                                  color: notif.type === 'success' ? '#27ae60' : notif.type === 'error' ? '#e74c3c' : '#3498db',
                                  fontWeight: 'bold',
                                  marginBottom: '5px'
                                }}>
                                  {notif.type === 'success' ? '✅' : notif.type === 'error' ? '❌' : 'ℹ️'} {notif.message}
                                </div>
                                <div style={{ fontSize: '12px', color: '#666' }}>{notif.time}</div>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>
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
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '12px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  marginBottom: '30px'
                }}>
                  <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
                      <input
                        type="text"
                        placeholder="🔍 Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px 15px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '14px',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      style={{
                        padding: '12px 15px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '14px',
                        minWidth: '120px'
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
                        padding: '12px 15px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '14px',
                        minWidth: '120px'
                      }}
                    >
                      <option value="all">All Priority</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setFilterStatus('all');
                        setFilterPriority('all');
                      }}
                      style={{
                        padding: '12px 20px',
                        backgroundColor: '#95a5a6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      Clear
                    </button>
                  </div>
                  {(searchQuery || filterStatus !== 'all' || filterPriority !== 'all') && (
                    <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
                      Showing {getFilteredTasks().length} of {tasks.length} tasks
                    </div>
                  )}
                </div>
              </div>

              {/* Stats Cards */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '20px', 
                marginBottom: '40px' 
              }}>
                <div style={{
                  background: 'linear-gradient(45deg, #3498db, #2980b9)',
                  color: 'white',
                  padding: '30px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '40px', marginBottom: '10px' }}>📋</div>
                  <h3 style={{ fontSize: '28px', margin: '0 0 5px 0', fontWeight: 'bold' }}>{tasks.length}</h3>
                  <p style={{ margin: 0, opacity: 0.8 }}>Total Tasks</p>
                  <p style={{ margin: '5px 0 0 0', fontSize: '14px', opacity: 0.8 }}>
                    {getFilteredTasks().length} matching filters
                  </p>
                </div>
                <div style={{
                  background: 'linear-gradient(45deg, #27ae60, #219a52)',
                  color: 'white',
                  padding: '30px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '40px', marginBottom: '10px' }}>✅</div>
                  <h3 style={{ fontSize: '28px', margin: '0 0 5px 0', fontWeight: 'bold' }}>
                    {tasks.filter(task => task.status === 'done').length}
                  </h3>
                  <p style={{ margin: 0, opacity: 0.8 }}>Completed</p>
                  <p style={{ margin: '5px 0 0 0', fontSize: '14px', opacity: 0.8 }}>
                    {Math.round((tasks.filter(task => task.status === 'done').length / tasks.length) * 100)}% completion rate
                  </p>
                </div>
                <div style={{
                  background: 'linear-gradient(45deg, #f39c12, #e67e22)',
                  color: 'white',
                  padding: '30px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '40px', marginBottom: '10px' }}>🚀</div>
                  <h3 style={{ fontSize: '28px', margin: '0 0 5px 0', fontWeight: 'bold' }}>
                    {tasks.filter(task => task.status === 'in-progress').length}
                  </h3>
                  <p style={{ margin: 0, opacity: 0.8 }}>In Progress</p>
                  <p style={{ margin: '5px 0 0 0', fontSize: '14px', opacity: 0.8 }}>Active work items</p>
                </div>
                <div style={{
                  background: 'linear-gradient(45deg, #9b59b6, #8e44ad)',
                  color: 'white',
                  padding: '30px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '40px', marginBottom: '10px' }}>👥</div>
                  <h3 style={{ fontSize: '28px', margin: '0 0 5px 0', fontWeight: 'bold' }}>{projects.length}</h3>
                  <p style={{ margin: 0, opacity: 0.8 }}>Projects</p>
                  <p style={{ margin: '5px 0 0 0', fontSize: '14px', opacity: 0.8 }}>
                    {projects.filter(p => p.status === 'active').length} active projects
                  </p>
                </div>
              </div>

              {/* Tasks and Projects Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  overflow: 'hidden'
                }}>
                  <div style={{ padding: '20px', borderBottom: '1px solid #f0f0f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ margin: 0, color: '#2c3e50' }}>
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
                          fontSize: '14px'
                        }}
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
                        borderBottom: '1px solid #f0f0f0',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onClick={() => {
                        setSelectedTask(task);
                        setShowTaskDetails(true);
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ margin: '0 0 5px 0', color: '#2c3e50', fontWeight: '500' }}>
                            {task.title}
                          </h4>
                          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                            {task.project} • Due: {task.dueDate || 'No due date'} • {task.estimatedHours}h estimated
                          </p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            backgroundColor: task.priority === 'high' ? '#ffebee' : task.priority === 'medium' ? '#fff3e0' : '#e8f5e8',
                            color: task.priority === 'high' ? '#d32f2f' : task.priority === 'medium' ? '#f57c00' : '#388e3c'
                          }}>
                            {task.priority.toUpperCase()}
                          </span>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            backgroundColor: task.status === 'done' ? '#e8f5e8' : task.status === 'in-progress' ? '#fff3e0' : '#e3f2fd',
                            color: task.status === 'done' ? '#388e3c' : task.status === 'in-progress' ? '#f57c00' : '#1976d2'
                          }}>
                            {task.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </div>
                      </div>
                    ))}
                    {getFilteredTasks().length === 0 && (
                      <div style={{ textAlign: 'center', padding: '40px' }}>
                        <h4 style={{ color: '#666', margin: '0 0 10px 0' }}>No tasks found</h4>
                        <p style={{ color: '#666', margin: 0 }}>Try adjusting your search or filters</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    padding: '20px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <h3 style={{ margin: 0, color: '#2c3e50' }}>Active Projects</h3>
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
                            <h4 style={{ margin: 0, color: '#2c3e50', fontSize: '14px', fontWeight: '500' }}>
                              {project.name}
                            </h4>
                            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#666' }}>
                              {progress}%
                            </span>
                          </div>
                          <div style={{ 
                            height: '8px', 
                            backgroundColor: '#ecf0f1', 
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
                          <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                            {tasks.filter(t => t.project === project.name).length} tasks • {project.members} members
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    padding: '20px'
                  }}>
                    <h3 style={{ margin: '0 0 20px 0', color: '#2c3e50' }}>Quick Actions</h3>
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
              <h2 style={{ color: '#2c3e50' }}>Projects View</h2>
              <p>Project management interface coming soon...</p>
            </div>
          )}

          {currentView === 'profile' && (
            <div>
              <h2 style={{ color: '#2c3e50' }}>Profile Settings</h2>
              <p>User profile management coming soon...</p>
            </div>
          )}

          {currentView === 'settings' && (
            <div>
              <h2 style={{ color: '#2c3e50' }}>Settings</h2>
              <p>Application settings coming soon...</p>
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
          color: '#666',
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
              <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
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
