// Dashboard page component
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Box,
  Fab,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  People as PeopleIcon,
  Assignment as TaskIcon,
} from '@mui/icons-material';
import { AppBar } from '../components/layout/AppBar';
import { CreateProjectDialog } from '../components/projects/CreateProjectDialog';
import { LoadingScreen, PageTransition, InlineLoader } from '../components/common/LoadingScreen';
import { fetchProjects } from '../store/slices/projectsSlice';
import { toggleTheme } from '../store/slices/uiSlice';
import { logout } from '../store/slices/authSlice';
import { formatDistanceToNow } from 'date-fns';
import type { RootState, AppDispatch } from '../store';
import type { Project } from '../types';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const { user } = useSelector((state: RootState) => state.auth);
  const { projects, loading, error } = useSelector((state: RootState) => state.projects);
  const { theme } = useSelector((state: RootState) => state.ui);
  
  const [createProjectOpen, setCreateProjectOpen] = useState(false);
  const [projectMenuAnchor, setProjectMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Simulate initial page load delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
      // Add a slight delay for the content to appear smoothly
      setTimeout(() => setShowContent(true), 100);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (user && !pageLoading) {
      dispatch(fetchProjects(user.id));
    }
  }, [dispatch, user, pageLoading]);

  const handleCreateProject = () => {
    setCreateProjectOpen(true);
  };

  const handleProjectClick = (project: Project) => {
    navigate(`/project/${project.id}`);
  };

  const handleProjectMenu = (event: React.MouseEvent<HTMLElement>, project: Project) => {
    event.stopPropagation();
    setProjectMenuAnchor(event.currentTarget);
    setSelectedProject(project);
  };

  const handleCloseProjectMenu = () => {
    setProjectMenuAnchor(null);
    setSelectedProject(null);
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  const getProjectColor = (color: string) => {
    return color || '#6366f1';
  };

  const getProjectStats = (project: Project) => {
    // These would come from actual task data in a real app
    return {
      totalTasks: Math.floor(Math.random() * 50) + 10,
      completedTasks: Math.floor(Math.random() * 30) + 5,
      members: project.members.length,
    };
  };

  if (pageLoading) {
    return <LoadingScreen message="Loading Dashboard..." />;
  }

  if (loading && projects.length === 0) {
    return (
      <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppBar
          onThemeToggle={handleThemeToggle}
          onLogout={handleLogout}
          themeMode={theme.mode}
        />
        <Container maxWidth="lg" sx={{ py: 4, mt: 8 }}>
          <InlineLoader message="Loading your projects..." />
        </Container>
      </Box>
    );
  }

  return (
    <PageTransition show={showContent}>
      <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* App Bar */}
      <AppBar
        onThemeToggle={handleThemeToggle}
        onLogout={handleLogout}
        themeMode={theme.mode}
      />

      <Container maxWidth="lg" sx={{ py: 4, mt: 8 }}>
        {/* Header */}
        <Box mb={4}>
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            Welcome back, {user?.displayName || user?.email}! 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here's an overview of your projects and tasks
          </Typography>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Quick Stats */}
        <Box 
          display="grid" 
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
          gap={3} 
          mb={4}
        >
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <Box sx={{ color: 'primary.main', mb: 1 }}>
              <TaskIcon sx={{ fontSize: 40 }} />
            </Box>
            <Typography variant="h4" fontWeight="bold">
              {projects.reduce((total: number, project: any) => {
                const stats = getProjectStats(project);
                return total + stats.totalTasks;
              }, 0)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Tasks
            </Typography>
          </Card>
          
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <Box sx={{ color: 'success.main', mb: 1 }}>
              <TaskIcon sx={{ fontSize: 40 }} />
            </Box>
            <Typography variant="h4" fontWeight="bold">
              {projects.reduce((total: number, project: any) => {
                const stats = getProjectStats(project);
                return total + stats.completedTasks;
              }, 0)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Completed
            </Typography>
          </Card>
          
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <Box sx={{ color: 'info.main', mb: 1 }}>
              <PeopleIcon sx={{ fontSize: 40 }} />
            </Box>
            <Typography variant="h4" fontWeight="bold">
              {projects.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Active Projects
            </Typography>
          </Card>
          
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <Box sx={{ color: 'warning.main', mb: 1 }}>
              <PeopleIcon sx={{ fontSize: 40 }} />
            </Box>
            <Typography variant="h4" fontWeight="bold">
              {projects.reduce((total: number, project: any) => total + project.members.length, 0)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Team Members
            </Typography>
          </Card>
        </Box>

        {/* Projects Section */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" fontWeight="bold">
            Your Projects
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateProject}
            sx={{ borderRadius: 2 }}
          >
            New Project
          </Button>
        </Box>

        {projects.length === 0 ? (
          <Card sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No projects yet
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Create your first project to start managing tasks with your team
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateProject}
            >
              Create Your First Project
            </Button>
          </Card>
        ) : (
          <Box 
            display="grid" 
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
            gap={3}
          >
            {projects.map((project: any) => {
              const stats = getProjectStats(project);
              const completionRate = (stats.completedTasks / stats.totalTasks) * 100;
                return (
                <Card
                  key={project.id}
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    },
                  }}
                  onClick={() => handleProjectClick(project)}
                >
                  {/* Project Header */}
                  <Box
                    sx={{
                      height: 8,
                      bgcolor: getProjectColor(project.color),
                    }}
                  />
                  
                  <CardContent sx={{ pb: 1 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Typography variant="h6" fontWeight="bold" noWrap>
                        {project.name}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={(e) => handleProjectMenu(e, project)}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {project.description}
                    </Typography>

                    {/* Progress */}
                    <Box mb={2}>
                      <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography variant="body2" color="text.secondary">
                          Progress
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {Math.round(completionRate)}%
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          height: 6,
                          bgcolor: 'grey.200',
                          borderRadius: 3,
                          overflow: 'hidden',
                        }}
                      >
                        <Box
                          sx={{
                            height: '100%',
                            width: `${completionRate}%`,
                            bgcolor: getProjectColor(project.color),
                            transition: 'width 0.3s ease',
                          }}
                        />
                      </Box>
                    </Box>

                    {/* Stats */}
                    <Box display="flex" justifyContent="space-between" mb={2}>
                      <Chip
                        size="small"
                        label={`${stats.totalTasks} tasks`}
                        variant="outlined"
                      />
                      <Chip
                        size="small"
                        label={`${stats.members} members`}
                        variant="outlined"
                      />
                    </Box>

                    {/* Members */}
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box display="flex" alignItems="center" gap={1}>
                        {project.members.slice(0, 3).map((member: any, index: number) => (
                          <Avatar
                            key={member.userId}
                            src={member.photoURL}
                            sx={{
                              width: 28,
                              height: 28,
                              fontSize: '0.75rem',
                              ml: index > 0 ? -1 : 0,
                              border: '2px solid',
                              borderColor: 'background.paper',
                            }}
                          >
                            {member.displayName?.charAt(0) || member.email.charAt(0)}
                          </Avatar>
                        ))}
                        {project.members.length > 3 && (
                          <Typography variant="caption" color="text.secondary" ml={1}>
                            +{project.members.length - 3} more
                          </Typography>
                        )}
                      </Box>
                      
                      <Typography variant="caption" color="text.secondary">
                        {formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true })}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        )}

        {/* Floating Action Button */}
        <Fab
          color="primary"
          aria-label="add project"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
          }}
          onClick={handleCreateProject}
        >
          <AddIcon />
        </Fab>

        {/* Project Menu */}
        <Menu
          anchorEl={projectMenuAnchor}
          open={Boolean(projectMenuAnchor)}
          onClose={handleCloseProjectMenu}
        >
          <MenuItem onClick={() => {
            if (selectedProject) {
              handleProjectClick(selectedProject);
            }
            handleCloseProjectMenu();
          }}>
            Open Project
          </MenuItem>
          <MenuItem onClick={handleCloseProjectMenu}>
            Edit Project
          </MenuItem>
          <MenuItem onClick={handleCloseProjectMenu}>
            Project Settings
          </MenuItem>
          <MenuItem onClick={handleCloseProjectMenu} sx={{ color: 'error.main' }}>
            Delete Project
          </MenuItem>
        </Menu>

        {/* Create Project Dialog */}
        <CreateProjectDialog
          open={createProjectOpen}
          onClose={() => setCreateProjectOpen(false)}
        />
      </Container>
    </Box>
    </PageTransition>
  );
};

export default Dashboard;
