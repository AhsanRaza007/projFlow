import { Project } from '@/types/projects';
import { create } from 'zustand';

interface ProjectStore {
  projects: Project[];
  favorites: string[];
  loading: boolean;
  error: string | null;
  projectsWithFavoriteFlag: Project[];
  fetchProjects: () => Promise<void>;
  fetchFavorites: () => Promise<void>;
  getProjectById: (id: string) => Promise<Project | undefined>;
  createProject: (projectData: Omit<Project, 'id'>) => Promise<void>;
  updateProject: (id: string, projectData: Omit<Project, 'id'| 'favorite'>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addFavorite: (id: string) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
  resetError: () => void;
  updateProjectsWithFavoriteFlag: () => void;
}

const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  favorites: [],
  loading: false,
  error: null,
  projectsWithFavoriteFlag: [], 
  resetError: () => set({ error: null }),
  updateProjectsWithFavoriteFlag: () => {
    const projects = get().projects;
    const favorites = get().favorites;
    const flaggedProjects = projects.map((project) => ({
      ...project,
      favorite: favorites.includes(project.id),
    }));
    set({ projectsWithFavoriteFlag: flaggedProjects });
  },

  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/projects');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch projects');
      }
      const data: Project[] = await response.json();
      set({ projects: data }, false);
      get().updateProjectsWithFavoriteFlag();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      set({ error: errorMessage });
    } finally {
      set({ loading: false });
    }
  },

  fetchFavorites: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/favorites'); // Assuming you have an endpoint to get favorites
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch favorites');
      }
      const data: string[] = await response.json(); // Expecting an array of project IDs
      set({ favorites: data }, false);
      get().updateProjectsWithFavoriteFlag();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      set({ error: errorMessage });
    } finally {
      set({ loading: false });
    }
  },


  getProjectById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/projects/${id}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch project');
      }
      const data: Project = await response.json();
      return data;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      set({ error: errorMessage });
    } finally {
      set({ loading: false });
    }
  },
  createProject: async (projectData: Omit<Project, 'id'>) => {
    set({ loading: true, error: null });
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
      set({ projects: [...get().projects, data] });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      set({ error: errorMessage });
    } finally {
      set({ loading: false });
    }
  },
  updateProject: async (id: string, projectData: Omit<Project, 'id' | 'favorite'>) => {
    set({ loading: true, error: null });
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
      set(
        {
          projects: get().projects.map((project) =>
            project.id === id ? { ...project, ...data } : project,
          ),
        },
        false,
      );
      get().updateProjectsWithFavoriteFlag();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      set({ error: errorMessage });
    } finally {
      set({ loading: false });
    }
  },
  deleteProject: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete project');
      }
      set({ projects: get().projects.filter((project) => project.id !== id) }, false);
      get().updateProjectsWithFavoriteFlag();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      set({ error: errorMessage });
    } finally {
      set({ loading: false });
    }
  },
  addFavorite: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/favorites/${id}`, {
        method: 'POST',

      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add to favorites');
      }
      set({ favorites: [...get().favorites, id] }, false);
      get().updateProjectsWithFavoriteFlag();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      set({ error: errorMessage });
    } finally {
      set({ loading: false });
    }
  },
  removeFavorite: async (id: string) => {
    set({ loading: true, error: null });
    
    try {
      const response = await fetch(`/api/favorites/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove from favorites');
      }
      set({ favorites: get().favorites.filter((favId) => favId !== id) }, false);
      get().updateProjectsWithFavoriteFlag();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      set({ error: errorMessage });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useProjectStore;
