import { create } from 'zustand';
    import mockApi from '@/mock-api/mockApi';
    import { Project, ProjectCreate, ProjectUpdate } from '@/types/projects';

    interface ProjectState {
     projects: Project[];
     loading: boolean;
     error: string | null;
     fetchProjects: () => Promise<void>;
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

     fetchProjects: async () => {
      set({ loading: true, error: null });
      try {
       const projects = await mockApi.getProjects();
       set({ projects: projects, loading: false });
      } catch (error: any) {
       set({ error: error.message, loading: false });
      }
     },

     addProject: async (projectData: ProjectCreate) => {
      try {
       const newProject = await mockApi.createProject(projectData);
       set((state) => ({ projects: [...state.projects, newProject] }));
       return newProject;
      } catch (error: any) {
       set({ error: error.message });
       throw error;
      }
     },

     editProject: async (id: string, projectData: ProjectUpdate) => {
      try {
       await mockApi.updateProject(id, projectData);
       set((state) => ({
        projects: state.projects.map((project) =>
         project.id === id ? { ...project, ...projectData } : project
        ),
       }));
      } catch (error: any) {
       set({ error: error.message });
       throw error;
      }
     },

     deleteProject: async (id: string) => {
      try {
       await mockApi.deleteProject(id);
       set((state) => ({
        projects: state.projects.filter((project) => project.id !== id),
       }));
      } catch (error: any) {
       set({ error: error.message });
       throw error;
      }
     },

     toggleFavorite: (id: string) => {
      set((state) => ({
       projects: state.projects.map((project) =>
        project.id === id ? { ...project, favorite: !project.favorite } : project
       ),
      }));
     },

     updateProjectNameInFavorites: (id: string, newName: string) => {
      set((state) => ({
       projects: state.projects.map((project) =>
        project.id === id ? { ...project, name: newName } : project
       ),
      }));
     },
    }));

    export default useProjectStore;