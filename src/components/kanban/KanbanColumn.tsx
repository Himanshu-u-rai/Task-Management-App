import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Badge,
  alpha,
} from '@mui/material';
import { Add as AddIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import type { TaskStatus } from '../../types';
import { TaskCard } from './TaskCard';

interface KanbanColumnProps {
  column: {
    id: TaskStatus;
    title: string;
    color: string;
  };
  tasks: any[];
  onCreateTask: () => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  tasks,
  onCreateTask,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <Paper
      ref={setNodeRef}
      elevation={1}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'fit-content',
        minHeight: 400,
        backgroundColor: isOver
          ? (theme) => alpha(theme.palette.primary.main, 0.05)
          : 'background.paper',
        border: isOver
          ? (theme) => `2px dashed ${theme.palette.primary.main}`
          : '2px solid transparent',
        transition: 'all 0.2s ease-in-out',
      }}
    >
      {/* Column Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          background: `linear-gradient(135deg, ${alpha(column.color, 0.1)} 0%, ${alpha(
            column.color,
            0.05
          )} 100%)`,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: column.color,
              }}
            />
            <Typography variant="subtitle2" fontWeight="bold">
              {column.title}
            </Typography>
            <Badge
              badgeContent={tasks.length}
              color="secondary"
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: alpha(column.color, 0.2),
                  color: column.color,
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                },
              }}
            />
          </Box>

          <Box>
            <IconButton
              size="small"
              onClick={onCreateTask}
              sx={{
                color: column.color,
                '&:hover': {
                  backgroundColor: alpha(column.color, 0.1),
                },
              }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Tasks List */}
      <Box
        sx={{
          flex: 1,
          p: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          minHeight: 200,
        }}
      >
        <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>

        {tasks.length === 0 && (
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'text.secondary',
              py: 4,
            }}
          >
            <Typography variant="body2" textAlign="center">
              No tasks yet
              <br />
              <Typography
                component="span"
                variant="caption"
                sx={{ cursor: 'pointer', color: column.color }}
                onClick={onCreateTask}
              >
                Add a task
              </Typography>
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};
