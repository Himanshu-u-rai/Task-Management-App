import React, { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import type {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
} from '@dnd-kit/sortable';
import { Box, Typography, Paper, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import type { Task, TaskStatus } from '../../types';
import { updateTask } from '../../store/slices/tasksSlice';
import { KanbanColumn } from './KanbanColumn';
import { TaskCard } from './TaskCard';
import { CreateTaskDialog } from './CreateTaskDialog';

// Default columns for Kanban board
const DEFAULT_COLUMNS: { id: TaskStatus; title: string; color: string }[] = [
  { id: 'todo', title: 'To Do', color: '#6b7280' },
  { id: 'in-progress', title: 'In Progress', color: '#3b82f6' },
  { id: 'in-review', title: 'In Review', color: '#f59e0b' },
  { id: 'completed', title: 'Completed', color: '#10b981' },
];

interface KanbanBoardProps {
  projectId: string;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ projectId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks } = useSelector((state: RootState) => state.tasks);
  
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<TaskStatus>('todo');

  // Filter tasks for this project
  const projectTasks = tasks.filter((task: any) => task.projectId === projectId);

  // Group tasks by status
  const tasksByStatus = DEFAULT_COLUMNS.reduce((acc, column) => {
    acc[column.id] = projectTasks.filter((task: any) => task.status === column.id);
    return acc;
  }, {} as Record<TaskStatus, any[]>);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = projectTasks.find((t: any) => t.id === active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Find the containers
    const activeTask = projectTasks.find((t: any) => t.id === activeId);
    const overTask = projectTasks.find((t: any) => t.id === overId);

    if (!activeTask) return;

    // If dropping on a column
    if (DEFAULT_COLUMNS.some(col => col.id === overId)) {
      const newStatus = overId as TaskStatus;
      if (activeTask.status !== newStatus) {
        dispatch(updateTask({
          taskId: activeTask.id,
          updates: { status: newStatus }
        }));
      }
      return;
    }

    // If dropping on a task in a different column
    if (overTask && activeTask.status !== overTask.status) {
      dispatch(updateTask({
        taskId: activeTask.id,
        updates: { status: overTask.status }
      }));
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeTask = projectTasks.find((t: any) => t.id === activeId);
    const overTask = projectTasks.find((t: any) => t.id === overId);

    if (!activeTask) return;

    // If dropped on the same task, do nothing
    if (activeId === overId) return;

    // If dropped on a different task in the same column, reorder
    if (overTask && activeTask.status === overTask.status) {
      const activeIndex = tasksByStatus[activeTask.status].findIndex((t: any) => t.id === activeId);
      const overIndex = tasksByStatus[activeTask.status].findIndex((t: any) => t.id === overId);

      const newTasks = arrayMove(tasksByStatus[activeTask.status], activeIndex, overIndex);
      
      // Update the order of tasks
      newTasks.forEach((task: any, index: number) => {
        dispatch(updateTask({
          taskId: task.id,
          updates: { order: index }
        }));
      });
    }
  };

  const handleCreateTask = (columnId: TaskStatus) => {
    setSelectedColumn(columnId);
    setCreateTaskOpen(true);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Board Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Kanban Board
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleCreateTask('todo')}
          size="small"
        >
          Add Task
        </Button>
      </Box>

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 2,
            flex: 1,
            overflowX: 'auto',
            pb: 2,
          }}
        >
          {DEFAULT_COLUMNS.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={tasksByStatus[column.id] || []}
              onCreateTask={() => handleCreateTask(column.id)}
            />
          ))}
        </Box>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeTask ? (
            <Paper
              elevation={8}
              sx={{
                opacity: 0.9,
                transform: 'rotate(5deg)',
                cursor: 'grabbing',
              }}
            >
              <TaskCard task={activeTask} isDragging />
            </Paper>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Create Task Dialog */}
      <CreateTaskDialog
        open={createTaskOpen}
        onClose={() => setCreateTaskOpen(false)}
        projectId={projectId}
        initialStatus={selectedColumn}
      />
    </Box>
  );
};
