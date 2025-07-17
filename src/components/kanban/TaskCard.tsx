import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  alpha,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  AccessTime as TimeIcon,
  Assignment as TaskIcon,
  Flag as FlagIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import type { Task, TaskPriority } from '../../types';

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
}

const getPriorityColor = (priority: TaskPriority): string => {
  switch (priority) {
    case 'urgent':
      return '#ef4444';
    case 'high':
      return '#f97316';
    case 'medium':
      return '#eab308';
    case 'low':
      return '#22c55e';
    default:
      return '#6b7280';
  }
};

const getPriorityIcon = (priority: TaskPriority) => {
  const color = getPriorityColor(priority);
  return <FlagIcon sx={{ fontSize: 16, color }} />;
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, isDragging = false }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging || isSortableDragging ? 0.5 : 1,
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const completedChecklist = task.checklist?.filter(item => item.completed) || [];
  const totalChecklist = task.checklist?.length || 0;

  return (
    <>
      <Card
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        sx={{
          cursor: isDragging ? 'grabbing' : 'grab',
          mb: 1,
          transition: 'all 0.2s ease-in-out',
          border: '1px solid',
          borderColor: 'divider',
          '&:hover': {
            borderColor: 'primary.main',
            boxShadow: (theme) => `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
          },
          userSelect: 'none',
        }}
      >
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mb: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
              {getPriorityIcon(task.priority)}
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  lineHeight: 1.3,
                }}
              >
                {task.title}
              </Typography>
            </Box>
            <IconButton
              size="small"
              onClick={handleMenuClick}
              sx={{ ml: 1, p: 0.5 }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Description */}
          {task.description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                lineHeight: 1.4,
              }}
            >
              {task.description}
            </Typography>
          )}

          {/* Tags */}
          {task.tags && task.tags.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
              {task.tags.slice(0, 3).map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  variant="outlined"
                  sx={{
                    height: 20,
                    fontSize: '0.75rem',
                    '& .MuiChip-label': { px: 1 },
                  }}
                />
              ))}
              {task.tags.length > 3 && (
                <Chip
                  label={`+${task.tags.length - 3}`}
                  size="small"
                  variant="outlined"
                  sx={{
                    height: 20,
                    fontSize: '0.75rem',
                    '& .MuiChip-label': { px: 1 },
                  }}
                />
              )}
            </Box>
          )}

          {/* Checklist Progress */}
          {totalChecklist > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <TaskIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                {completedChecklist.length}/{totalChecklist}
              </Typography>
              <Box
                sx={{
                  flex: 1,
                  height: 4,
                  backgroundColor: 'grey.200',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    height: '100%',
                    width: `${(completedChecklist.length / totalChecklist) * 100}%`,
                    backgroundColor: 'success.main',
                    transition: 'width 0.3s ease',
                  }}
                />
              </Box>
            </Box>
          )}

          {/* Footer */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* Assignee */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {task.assignee ? (
                <Avatar
                  src={task.assignee.photoURL}
                  sx={{ width: 24, height: 24, fontSize: '0.75rem' }}
                >
                  {task.assignee.displayName?.charAt(0) || task.assignee.email.charAt(0)}
                </Avatar>
              ) : (
                <Avatar sx={{ width: 24, height: 24, bgcolor: 'grey.300' }}>
                  <PersonIcon sx={{ fontSize: 14, color: 'grey.600' }} />
                </Avatar>
              )}
            </Box>

            {/* Due date */}
            {task.dueDate && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <TimeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary">
                  {formatDistanceToNow(new Date(task.dueDate), { addSuffix: true })}
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleMenuClose}>Edit Task</MenuItem>
        <MenuItem onClick={handleMenuClose}>Duplicate</MenuItem>
        <MenuItem onClick={handleMenuClose}>Archive</MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};
