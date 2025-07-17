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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
  Autocomplete,
  Stack,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createTask } from '../../store/slices/tasksSlice';
import type { RootState, AppDispatch } from '../../store';
import type { TaskStatus, TaskPriority } from '../../types';

// Form validation schema
const taskSchema = yup.object({
  title: yup
    .string()
    .min(2, 'Task title must be at least 2 characters')
    .max(100, 'Task title must be less than 100 characters')
    .required('Task title is required'),
  description: yup
    .string()
    .max(500, 'Description must be less than 500 characters')
    .default(''),
  priority: yup
    .string()
    .oneOf(['low', 'medium', 'high', 'urgent'])
    .required('Priority is required'),
  assigneeId: yup
    .string()
    .nullable()
    .default(null),
  dueDate: yup
    .date()
    .nullable()
    .default(null),
  tags: yup
    .array()
    .of(yup.string().required())
    .default([]),
  estimatedHours: yup
    .number()
    .positive('Estimated hours must be positive')
    .nullable()
    .default(null),
});

type TaskFormData = yup.InferType<typeof taskSchema>;

interface CreateTaskDialogProps {
  open: boolean;
  onClose: () => void;
  projectId: string;
  initialStatus: TaskStatus;
}

const priorityOptions: { value: TaskPriority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: '#22c55e' },
  { value: 'medium', label: 'Medium', color: '#eab308' },
  { value: 'high', label: 'High', color: '#f97316' },
  { value: 'urgent', label: 'Urgent', color: '#ef4444' },
];

export const CreateTaskDialog: React.FC<CreateTaskDialogProps> = ({
  open,
  onClose,
  projectId,
  initialStatus,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { projects } = useSelector((state: RootState) => state.projects);
  const { loading } = useSelector((state: RootState) => state.tasks);

  // Get current project and its members
  const currentProject = projects.find((p: any) => p.id === projectId);
  const projectMembers = currentProject?.members || [];

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: yupResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'medium',
      assigneeId: null,
      dueDate: null,
      tags: [],
      estimatedHours: null,
    },
  });

  const onSubmit = async (data: TaskFormData) => {
    try {
      if (!user) return;

      await dispatch(createTask({
        taskData: {
          title: data.title,
          description: data.description,
          priority: data.priority,
          assigneeId: data.assigneeId || undefined,
          dueDate: data.dueDate || undefined,
          tags: data.tags,
          estimatedHours: data.estimatedHours || undefined,
        },
        projectId,
        columnId: initialStatus,
        userId: user.id,
      })).unwrap();
      
      reset();
      onClose();
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Create New Task</DialogTitle>
      
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {/* Title */}
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Task Title"
                fullWidth
                required
                error={!!errors.title}
                helperText={errors.title?.message}
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
                label="Description"
                fullWidth
                multiline
                rows={3}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />

          {/* Priority and Assignee */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.priority}>
                  <InputLabel>Priority</InputLabel>
                  <Select {...field} label="Priority">
                    {priorityOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: '50%',
                              backgroundColor: option.color,
                            }}
                          />
                          {option.label}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />

            <Controller
              name="assigneeId"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Assignee</InputLabel>
                  <Select {...field} label="Assignee">
                    <MenuItem value="">
                      <em>Unassigned</em>
                    </MenuItem>
                    {projectMembers.map((member: any) => (
                      <MenuItem key={member.userId} value={member.userId}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar
                            src={member.photoURL}
                            sx={{ width: 24, height: 24, fontSize: '0.75rem' }}
                          >
                            {member.displayName?.charAt(0) || member.email.charAt(0)}
                          </Avatar>
                          {member.displayName || member.email}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Stack>

          {/* Due Date and Estimated Hours */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Controller
                name="dueDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Due Date"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.dueDate,
                        helperText: errors.dueDate?.message,
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>

            <Controller
              name="estimatedHours"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Estimated Hours"
                  type="number"
                  fullWidth
                  inputProps={{ min: 0.1, step: 0.5 }}
                  error={!!errors.estimatedHours}
                  helperText={errors.estimatedHours?.message}
                />
              )}
            />
          </Stack>

          {/* Tags */}
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                multiple
                freeSolo
                options={[]}
                onChange={(_, value) => field.onChange(value)}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                      key={index}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tags"
                    placeholder="Add tags..."
                    helperText="Press Enter to add tags"
                  />
                )}
              />
            )}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2, pt: 1 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          disabled={loading}
        >
          Create Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};
