import { create } from 'zustand';
import mockApi from '@/mock-api/mockApi';
import { Project, ProjectCreate, ProjectUpdate } from '@/types/projects';

interface ProjectState {
    projects: Project[];
    loading: boolean;
    error: string | null;
    fetchProjects: () => Promise<void>;
    fetchProject: (id: string) => Promise<void>;
    addProject: (projectData: ProjectCreate) => Promise<Project>;
    editProject: (id: string, projectData: ProjectUpdate) => Promise<void>;
    deleteProject: (id: string) => Promise<void>;
    toggleFavorite: (id: string) => void;
    updateProjectNameInFavorites: (id: string, newName: string) => void;
}

const useProjectStore = create<ProjectState>((set, get) => ({
    projects: [],
    loading: false,
    error: null,

    fetchProjects: async (): Promise<void> => {
        set({ loading: true, error: null });
        try {
            const projects: Project[] = await mockApi.getProjects();
            set({ projects: projects, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    fetchProject: async (id: string): Promise<void> => {
        set({ loading: true, error: null });
        try {
            await get().fetchProjects();
            if (!project) {
                throw new Error(`Project with id ${id} not found`);
            }
            set({
                loading: false,
            });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    addProject: async (projectData: ProjectCreate): Promise<Project> => {
        try {
            const newProject: Project = await mockApi.createProject(projectData);
            set((state) => ({ projects: [...state.projects, newProject] }));
            return newProject;
        } catch (error: any) {
            set({ error: error.message });
            throw error;
        }
    },

    editProject: async (id: string, projectData: ProjectUpdate): Promise<void> => {
        try {
            await mockApi.updateProject(id, projectData);
            set({
                projects: get().projects.map((project) =>
                    project.id === id ? { ...project, ...projectData } : project
                ),
            });
        } catch (error: any) {
            set({ error: error.message });
            throw error;
        }
    },

    deleteProject: async (id: string): Promise<void> => {
        try {
            await mockApi.deleteProject(id);
            set({
                projects: get().projects.filter((project) => project.id !== id),
            });
        } catch (error: any) {
            set({ error: error.message });
            throw error;
        }
    },
    toggleFavorite: async (id: string): Promise<void> => {
        try {
            const updatedProject: Project = await mockApi.toggleFavorite(id);
            set((state) => ({
                projects: state.projects.map((project) =>
                    project.id === id ? updatedProject : project
                ),
            }));
        } catch (error: any) {
            set({ error: error.message });
            throw error;
        }
    },
    updateProjectNameInFavorites: (id: string, newName: string): void => {
        set((state) => ({
            projects: state.projects.map((project) =>
                project.id === id ? { ...project, name: newName } : project
            ),
        }));
    },
}));

export default useProjectStore;