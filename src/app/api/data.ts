import { Project } from '@/types/projects';
import { v4 as uuidv4 } from 'uuid';

export const projects: Omit<Project, 'favorite' >[] = [
  {
      id: '8738e985-ba60-40f9-ae13-8eed0923b71c',
      name: 'Project A',
      description: 'Description A',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      projectManager: 'John Doe',
  },
  {
      id: 'b6790729-6043-410f-8922-4a7aa7dd4eb7',
      name: 'Project B',
      description: 'Description B',
      startDate: '2025-02-15',
      endDate: '2025-11-30',
      projectManager: 'Jane Smith',
  },
];

export const favorites: string[] = [projects[0].id];

export const generateId = () => uuidv4();
