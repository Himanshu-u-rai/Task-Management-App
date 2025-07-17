// Project Board page - Kanban view
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Chip,
  Container,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Settings as SettingsIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import { fetchProject } from '../store/slices/projectsSlice';
import { fetchTasks } from '../store/slices/tasksSlice';
import { KanbanBoard } from '../components/kanban/KanbanBoard';
import { LoadingScreen, PageTransition, InlineLoader } from '../components/common/LoadingScreen';
import type { RootState, AppDispatch } from '../store';

const ProjectBoard: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const { projects, loading, error } = useSelector((state: RootState) => state.projects);
  const { tasks, loading: tasksLoading } = useSelector((state: RootState) => state.tasks);
  
  const [pageLoading, setPageLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  
  const project = projects.find((p: any) => p.id === projectId);

  // Simulate initial page load delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
      setTimeout(() => setShowContent(true), 100);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (projectId && !pageLoading) {
      dispatch(fetchProject(projectId));
      dispatch(fetchTasks(projectId));
    }
  }, [dispatch, projectId, pageLoading]);

  const handleBack = () => {
    navigate('/dashboard');
  };

  if (pageLoading) {
    return <LoadingScreen message="Loading Project Board..." />;
  }

  if (loading && !project) {
    return <LoadingScreen message="Loading project details..." />;
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!project) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="warning">Project not found</Alert>
      </Container>
    );
  }

  return (
    <PageTransition show={showContent}>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Project Header */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <IconButton edge="start" onClick={handleBack} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: 1,
                backgroundColor: project.color,
              }}
            />
            <Typography variant="h6" fontWeight="bold">
              {project.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {project.description}
            </Typography>
          </Box>

          {/* Project Members */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
            {project.members.slice(0, 3).map((member: any, index: number) => (
              <Avatar
                key={member.userId}
                src={member.photoURL}
                sx={{
                  width: 32,
                  height: 32,
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
              <Chip
                label={`+${project.members.length - 3}`}
                size="small"
                variant="outlined"
              />
            )}
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton>
              <ShareIcon />
            </IconButton>
            <IconButton>
              <SettingsIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Kanban Board */}
      <Box sx={{ flex: 1, overflow: 'hidden', p: 2 }}>
        {tasksLoading ? (
          <InlineLoader message="Loading tasks..." />
        ) : (
          projectId && <KanbanBoard projectId={projectId} />
        )}
      </Box>
    </Box>
    </PageTransition>
  );
};

export default ProjectBoard;
