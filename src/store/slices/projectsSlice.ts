// Projects Redux slice
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
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
import type { Project, ProjectsState, CreateProjectForm } from '../../types';
import { getSocket } from '../../config/socket';

// Check if we should use mock data
const USE_MOCK_DATA = import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_AUTH === 'true';slice
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import type { Project, ProjectsState, CreateProjectForm, ProjectMember } from '../../types';
import { getSocket } from '../../config/socket';

const initialState: ProjectsState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (userId: string) => {
    if (USE_MOCK_DATA) {
      return await mockDataService.fetchProjects(userId);
    }
    
    const q = query(
      collection(db, 'projects'),
      where('members', 'array-contains-any', [userId]),
      orderBy('updatedAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const projects: Project[] = [];
    
    querySnapshot.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() } as Project);
    });
    
    return projects;
  }
);

export const fetchProject = createAsyncThunk(
  'projects/fetchProject',
  async (projectId: string) => {
    if (USE_MOCK_DATA) {
      return await mockDataService.fetchProject(projectId);
    }
    const docRef = doc(db, 'projects', projectId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Project;
    } else {
      throw new Error('Project not found');
    }
  }
);

export const createProject = createAsyncThunk(
  'projects/createProject',
  async ({ projectData, userId }: { projectData: CreateProjectForm; userId: string }) => {
    const defaultColumns = [
      { id: 'todo', name: 'To Do', position: 0, color: '#6b7280' },
      { id: 'in-progress', name: 'In Progress', position: 1, color: '#3b82f6' },
      { id: 'review', name: 'Review', position: 2, color: '#f59e0b' },
      { id: 'done', name: 'Done', position: 3, color: '#10b981' },
    ];
    
    const newProject = {
      ...projectData,
      createdBy: userId,
      members: [{ 
        userId, 
        role: 'owner', 
        joinedAt: new Date(),
        email: '', // Will be populated from user data
        displayName: '' // Will be populated from user data
      }],
      columns: defaultColumns,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    const docRef = await addDoc(collection(db, 'projects'), newProject);
    const createdProject = { 
      id: docRef.id, 
      ...newProject,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as unknown as Project;
    
    // Emit socket event
    const socket = getSocket();
    socket?.emit('project:created', { project: createdProject });
    
    return createdProject;
  }
);

export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async ({ projectId, updates }: { projectId: string; updates: Partial<Project> }) => {
    const docRef = doc(db, 'projects', projectId);
    const updateData = {
      ...updates,
      updatedAt: serverTimestamp(),
    };
    
    await updateDoc(docRef, updateData);
    
    // Emit socket event
    const socket = getSocket();
    socket?.emit('project:updated', { projectId, updates: updateData });
    
    return { projectId, updates: updateData };
  }
);

export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (projectId: string) => {
    await deleteDoc(doc(db, 'projects', projectId));
    
    // Emit socket event
    const socket = getSocket();
    socket?.emit('project:deleted', { projectId });
    
    return projectId;
  }
);

export const addProjectMember = createAsyncThunk(
  'projects/addMember',
  async ({ projectId, member }: { projectId: string; member: ProjectMember }) => {
    const docRef = doc(db, 'projects', projectId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const project = docSnap.data() as Project;
      const updatedMembers = [...project.members, member];
      
      await updateDoc(docRef, { 
        members: updatedMembers,
        updatedAt: serverTimestamp()
      });
      
      // Emit socket event
      const socket = getSocket();
      socket?.emit('project:member_added', { projectId, member });
      
      return { projectId, member };
    } else {
      throw new Error('Project not found');
    }
  }
);

export const removeProjectMember = createAsyncThunk(
  'projects/removeMember',
  async ({ projectId, memberId }: { projectId: string; memberId: string }) => {
    const docRef = doc(db, 'projects', projectId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const project = docSnap.data() as Project;
      const updatedMembers = project.members.filter(m => m.userId !== memberId);
      
      await updateDoc(docRef, { 
        members: updatedMembers,
        updatedAt: serverTimestamp()
      });
      
      // Emit socket event
      const socket = getSocket();
      socket?.emit('project:member_removed', { projectId, memberId });
      
      return { projectId, memberId };
    } else {
      throw new Error('Project not found');
    }
  }
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setCurrentProject: (state, action: PayloadAction<Project | null>) => {
      state.currentProject = action.payload;
    },
    clearProjects: (state) => {
      state.projects = [];
      state.currentProject = null;
    },
    updateProjectInList: (state, action: PayloadAction<{ projectId: string; updates: Partial<Project> }>) => {
      const { projectId, updates } = action.payload;
      const index = state.projects.findIndex(p => p.id === projectId);
      if (index !== -1) {
        state.projects[index] = { ...state.projects[index], ...updates };
      }
      if (state.currentProject?.id === projectId) {
        state.currentProject = { ...state.currentProject, ...updates };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Projects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
        state.error = null;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch projects';
      })
      
      // Fetch Project
      .addCase(fetchProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProject.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProject = action.payload;
        state.error = null;
      })
      .addCase(fetchProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch project';
      })
      
      // Create Project
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.unshift(action.payload);
        state.error = null;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create project';
      })
      
      // Update Project
      .addCase(updateProject.fulfilled, (state, action) => {
        const { projectId, updates } = action.payload;
        const safeUpdates = { ...updates, updatedAt: new Date() };
        const index = state.projects.findIndex(p => p.id === projectId);
        if (index !== -1) {
          state.projects[index] = { ...state.projects[index], ...safeUpdates };
        }
        if (state.currentProject?.id === projectId) {
          state.currentProject = { ...state.currentProject, ...safeUpdates };
        }
      })
      
      // Delete Project
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(p => p.id !== action.payload);
        if (state.currentProject?.id === action.payload) {
          state.currentProject = null;
        }
      })
      
      // Add Member
      .addCase(addProjectMember.fulfilled, (state, action) => {
        const { projectId, member } = action.payload;
        const index = state.projects.findIndex(p => p.id === projectId);
        if (index !== -1) {
          state.projects[index].members.push(member);
        }
        if (state.currentProject?.id === projectId) {
          state.currentProject.members.push(member);
        }
      })
      
      // Remove Member
      .addCase(removeProjectMember.fulfilled, (state, action) => {
        const { projectId, memberId } = action.payload;
        const index = state.projects.findIndex(p => p.id === projectId);
        if (index !== -1) {
          state.projects[index].members = state.projects[index].members.filter(m => m.userId !== memberId);
        }
        if (state.currentProject?.id === projectId) {
          state.currentProject.members = state.currentProject.members.filter(m => m.userId !== memberId);
        }
      });
  },
});

export const { setCurrentProject, clearProjects, updateProjectInList } = projectsSlice.actions;
export default projectsSlice.reducer;
