// Tasks Redux slice  
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import { mockDataService } from '../../services/mockData';
import type { Task, TasksState, CreateTaskForm, UpdateTaskForm, TaskFilters } from '../../types';
import { getSocket } from '../../config/socket';

// Check if we should use mock data
const USE_MOCK_DATA = import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_AUTH === 'true';

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
  filters: {},
};

// Async thunks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (projectId: string) => {
    if (USE_MOCK_DATA) {
      return await mockDataService.fetchTasks(projectId);
    }
    
    const q = query(
      collection(db, 'tasks'),
      where('projectId', '==', projectId),
      orderBy('position', 'asc')
    );
    
    const querySnapshot = await getDocs(q);
    const tasks: Task[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      tasks.push({ 
        id: doc.id, 
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        dueDate: data.dueDate?.toDate() || undefined,
      } as Task);
    });
    
    return tasks;
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async ({ 
    taskData, 
    projectId, 
    columnId, 
    userId 
  }: { 
    taskData: CreateTaskForm; 
    projectId: string; 
    columnId: string; 
    userId: string; 
  }) => {
    // Get the current highest position in the column
    const q = query(
      collection(db, 'tasks'),
      where('projectId', '==', projectId),
      where('columnId', '==', columnId),
      orderBy('position', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const highestPosition = querySnapshot.empty ? 0 : querySnapshot.docs[0].data().position + 1;
    
    const newTask = {
      ...taskData,
      projectId,
      columnId,
      position: highestPosition,
      status: 'todo' as const,
      createdBy: userId,
      attachments: [],
      checklist: [],
      tags: taskData.tags || [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    const docRef = await addDoc(collection(db, 'tasks'), newTask);
    const createdTask = { 
      id: docRef.id, 
      ...newTask,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as unknown as Task;
    
    // Emit socket event
    const socket = getSocket();
    socket?.emit('task:created', { 
      taskId: docRef.id, 
      projectId, 
      task: createdTask 
    });
    
    return createdTask;
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ taskId, updates }: { taskId: string; updates: Partial<UpdateTaskForm> }) => {
    const docRef = doc(db, 'tasks', taskId);
    const updateData = {
      ...updates,
      updatedAt: serverTimestamp(),
    };
    
    await updateDoc(docRef, updateData);
    
    // Emit socket event
    const socket = getSocket();
    socket?.emit('task:updated', { 
      taskId, 
      projectId: updates.columnId ? '' : '', // Will be properly set
      updates: updateData 
    });
    
    return { taskId, updates: { ...updateData, updatedAt: new Date() } };
  }
);

export const moveTask = createAsyncThunk(
  'tasks/moveTask',
  async ({ 
    taskId, 
    sourceColumnId, 
    destinationColumnId, 
    position,
    projectId 
  }: { 
    taskId: string; 
    sourceColumnId: string; 
    destinationColumnId: string; 
    position: number;
    projectId: string;
  }) => {
    const docRef = doc(db, 'tasks', taskId);
    const updateData = {
      columnId: destinationColumnId,
      position,
      updatedAt: serverTimestamp(),
    };
    
    await updateDoc(docRef, updateData);
    
    // Update positions of other tasks in the destination column
    const q = query(
      collection(db, 'tasks'),
      where('projectId', '==', projectId),
      where('columnId', '==', destinationColumnId)
    );
    
    const querySnapshot = await getDocs(q);
    const updatePromises: Promise<void>[] = [];
    
    querySnapshot.forEach((taskDoc) => {
      if (taskDoc.id !== taskId) {
        const taskData = taskDoc.data();
        if (taskData.position >= position) {
          updatePromises.push(
            updateDoc(doc(db, 'tasks', taskDoc.id), {
              position: taskData.position + 1,
              updatedAt: serverTimestamp(),
            })
          );
        }
      }
    });
    
    await Promise.all(updatePromises);
    
    // Emit socket event
    const socket = getSocket();
    socket?.emit('task:moved', { 
      taskId, 
      projectId,
      sourceColumn: sourceColumnId,
      destinationColumn: destinationColumnId,
      position 
    });
    
    return { 
      taskId, 
      updates: { 
        columnId: destinationColumnId, 
        position,
        updatedAt: new Date()
      } 
    };
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async ({ taskId, projectId }: { taskId: string; projectId: string }) => {
    await deleteDoc(doc(db, 'tasks', taskId));
    
    // Emit socket event
    const socket = getSocket();
    socket?.emit('task:deleted', { taskId, projectId });
    
    return taskId;
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<TaskFilters>) => {
      state.filters = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    updateTaskInList: (state, action: PayloadAction<{ taskId: string; updates: Partial<Task> }>) => {
      const { taskId, updates } = action.payload;
      const index = state.tasks.findIndex(t => t.id === taskId);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...updates };
      }
    },
    removeTaskFromList: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
    addTaskToList: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    clearTasks: (state) => {
      state.tasks = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      
      // Create Task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
        state.error = null;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create task';
      })
      
      // Update Task
      .addCase(updateTask.fulfilled, (state, action) => {
        const { taskId, updates } = action.payload;
        const index = state.tasks.findIndex(t => t.id === taskId);
        if (index !== -1) {
          state.tasks[index] = { ...state.tasks[index], ...updates };
        }
      })
      
      // Move Task
      .addCase(moveTask.fulfilled, (state, action) => {
        const { taskId, updates } = action.payload;
        const index = state.tasks.findIndex(t => t.id === taskId);
        if (index !== -1) {
          state.tasks[index] = { ...state.tasks[index], ...updates };
        }
      })
      
      // Delete Task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(t => t.id !== action.payload);
      });
  },
});

export const { 
  setFilters, 
  clearFilters, 
  updateTaskInList, 
  removeTaskFromList, 
  addTaskToList, 
  clearTasks 
} = tasksSlice.actions;

export default tasksSlice.reducer;
