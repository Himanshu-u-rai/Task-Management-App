// Create Project Dialog component
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Avatar,
  Chip,
  Typography,
  CircularProgress,
  Alert,
  Stack,
} from '@mui/material';
import { createProject } from '../../store/slices/projectsSlice';
import type { RootState, AppDispatch } from '../../store';
import type { CreateProjectForm } from '../../types';

// Predefined project colors
const PROJECT_COLORS = [
  '#6366f1', // Indigo
  '#ec4899', // Pink
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#8b5cf6', // Violet
  '#06b6d4', // Cyan
  '#84cc16', // Lime
  '#f97316', // Orange
  '#6b7280', // Gray
];

// Form validation schema
const projectSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Project name must be at least 2 characters')
    .max(50, 'Project name must be less than 50 characters')
    .required('Project name is required'),
  description: yup
    .string()
    .max(200, 'Description must be less than 200 characters')
    .default(''),
  color: yup
    .string()
    .required('Please select a color'),
  members: yup
    .array()
    .of(yup.string().required())
    .default([]),
});

type ProjectFormData = yup.InferType<typeof projectSchema>;

interface CreateProjectDialogProps {
  open: boolean;
  onClose: () => void;
}

export const CreateProjectDialog: React.FC<CreateProjectDialogProps> = ({
  open,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const projects = useSelector((state: RootState) => state.projects);
  const loading = projects?.loading || false;
  const error = projects?.error || null;

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: yupResolver(projectSchema),
    defaultValues: {
      name: '',
      description: '',
      color: PROJECT_COLORS[0],
      members: [],
    },
  });

  const selectedColor = watch('color');

  const onSubmit = async (data: ProjectFormData) => {
    if (!user) return;

    try {
      await dispatch(createProject({
        projectData: data as CreateProjectForm,
        userId: user.id,
      })).unwrap();
      
      reset();
      onClose();
    } catch (error) {
      // Error is handled by Redux
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleColorSelect = (color: string) => {
    setValue('color', color);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h5" fontWeight="bold">
          Create New Project
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Set up a new project to organize your tasks and collaborate with your team
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            {/* Project Name */}
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Project Name"
                  placeholder="Enter project name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  autoFocus
                />
              )}
            />

            {/* Description */}
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Description"
                  placeholder="Describe what this project is about"
                  multiline
                  rows={3}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />

            {/* Color Selection */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Project Color
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {PROJECT_COLORS.map((color) => (
                  <Box
                    key={color}
                    onClick={() => handleColorSelect(color)}
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: color,
                      cursor: 'pointer',
                      border: '3px solid',
                      borderColor: selectedColor === color ? 'primary.main' : 'transparent',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Project Preview */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Preview
              </Typography>
              <Box
                sx={{
                  p: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                }}
              >
                <Box
                  sx={{
                    height: 4,
                    bgcolor: selectedColor,
                    borderRadius: 1,
                    mb: 2,
                  }}
                />
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {watch('name') || 'Project Name'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {watch('description') || 'Project description will appear here'}
                </Typography>
              </Box>
            </Box>

            {/* Team Members (Future Enhancement) */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Team Members
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                You can invite team members after creating the project
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Avatar
                  src={user?.photoURL}
                  sx={{ width: 32, height: 32 }}
                >
                  {user?.displayName?.charAt(0) || user?.email?.charAt(0)}
                </Avatar>
                <Chip
                  label="Owner"
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Box>
            </Box>
          </Stack>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          disabled={loading}
          sx={{ minWidth: 120 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Create Project'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
