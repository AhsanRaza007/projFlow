import { StateCreator } from 'zustand';
import { Project } from '@/types/projects';

export interface ProjectSlice {
  projects: Project[];
  projectsLoading: boolean;
  projectsError: string | null;
  currentProjectDetail: Project | null;
  projectDetailLoading: boolean;
  projectDetailError: string | null;
  createProjectLoading: boolean;
  createProjectError: string | null;
  updateProjectLoading: boolean;
  updateProjectError: string | null;
  deleteProjectLoading: boolean;
  deleteProjectError: string | null;
  fetchProjects: () => Promise<void>;
  getProjectById: (id: string) => Promise<void>;
  createProject: (projectData: Omit<Project, 'id'>) => Promise<void>;
  updateProject: (id: string, projectData: Omit<Project, 'id' | 'favorite'>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  resetProjectsError: () => void;
  resetProjectDetailError: () => void;
  resetCreateProjectError: () => void;
  resetUpdateProjectError: () => void;
  resetDeleteProjectError: () => void;
}

export const createProjectSlice: StateCreator<
  ProjectSlice,
  [['zustand/immer', never], ['zustand/devtools', never]]
> = (set) => ({
  projects: [],
  projectsLoading: false,
  projectsError: null,
  currentProjectDetail: null,
  projectDetailLoading: false,
  projectDetailError: null,
  createProjectLoading: false,
  createProjectError: null,
  updateProjectLoading: false,
  updateProjectError: null,
  deleteProjectLoading: false,
  deleteProjectError: null,
  resetProjectsError: () => set({ projectsError: null }),
  resetProjectDetailError: () => set({ projectDetailError: null, currentProjectDetail: null }),
  resetCreateProjectError: () => set({ createProjectError: null }),
  resetUpdateProjectError: () => set({ updateProjectError: null }),
  resetDeleteProjectError: () => set({ deleteProjectError: null }),
  fetchProjects: async () => {
    set({ projectsLoading: true, projectsError: null });
    try {
      const response = await fetch('/api/projects');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch projects');
      }
      const data: Project[] = await response.json();
      set({ projects: data });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred while fetching projects';
      set({ projectsError: errorMessage });
    } finally {
      set({ projectsLoading: false });
    }
  },
  getProjectById: async (id: string) => {
    set({ projectDetailLoading: true, projectDetailError: null, currentProjectDetail: null });
    try {
      const response = await fetch(`/api/projects/${id}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch project details');
      }
      const data: Project = await response.json();
      set({ currentProjectDetail: data });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred while fetching project details';
      set({ projectDetailError: errorMessage });
    } finally {
      set({ projectDetailLoading: false });
    }
  },
  createProject: async (projectData: Omit<Project, 'id'>) => {
    set({ createProjectLoading: true, createProjectError: null });
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create project');
      }
      const data: Project = await response.json();
      set((state) => ({ projects: [...state.projects, data] }));
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred while creating the project';
      set({ createProjectError: errorMessage });
    } finally {
      set({ createProjectLoading: false });
    }
  },
  updateProject: async (id: string, projectData: Omit<Project, 'id' | 'favorite'>) => {
    set({ updateProjectLoading: true, updateProjectError: null });
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update project');
      }
      const data: Project = await response.json();
      set((state) => ({
        projects: state.projects.map((project: { id: string }) =>
          project.id === id ? { ...project, ...data } : project,
        ),
      }));
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred while updating the project';
      set({ updateProjectError: errorMessage });
    } finally {
      set({ updateProjectLoading: false });
    }
  },
  deleteProject: async (id: string) => {
    set({ deleteProjectLoading: true, deleteProjectError: null });
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete project');
      }
      set((state) => ({
        projects: state.projects.filter((project: { id: string }) => project.id !== id),
      }));
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred while deleting the project';
      set({ deleteProjectError: errorMessage });
    } finally {
      set({ deleteProjectLoading: false });
    }
  },
});
