import { v4 as uuidv4 } from 'uuid';
    import { Project, ProjectCreate, ProjectUpdate } from '@/types/projects';

    const initialProjects: Project[] = [
     {
      id: 'project-a',
      name: 'Project A',
      description: 'Project A Description',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      projectManager: 'John Doe',
      favorite: true,
     },
     {
      id: 'project-b',
      name: 'Project B',
      description: 'Project B Description',
      startDate: '2025-02-15',
      endDate: '2025-11-30',
      projectManager: 'Jane Smith',
      favorite: false,
     },
    ];

    let projects = [...initialProjects]; // Use a copy for mutations

    const mockApi = {
     getProjects: (): Promise<Project[]> =>
      new Promise((resolve) => {
       setTimeout(() => {
        resolve(projects);
       }, 500);
      }),

     createProject: (projectData: ProjectCreate): Promise<Project> =>
      new Promise((resolve) => {
       setTimeout(() => {
        const newProject: Project = {
         id: uuidv4(),
         ...projectData,
         favorite: false,
        };
        projects = [...projects, newProject];
        resolve(newProject);
       }, 500);
      }),

     updateProject: (id: string, projectData: ProjectUpdate): Promise<Project> =>
      new Promise((resolve, reject) => {
       setTimeout(() => {
        projects = projects.map((project) =>
         project.id === id ? { ...project, ...projectData } : project
        );
        const updatedProject = projects.find((project) => project.id === id);
        if (updatedProject) {
         resolve(updatedProject);
        } else {
         reject(new Error('Project not found')); // Or handle this how you prefer
        }
       }, 500);
      }),

     deleteProject: (id: string): Promise<string> =>
      new Promise((resolve) => {
       setTimeout(() => {
        projects = projects.filter((project) => project.id !== id);
        resolve(id);
       }, 500);
      }),
    };

    export default mockApi;