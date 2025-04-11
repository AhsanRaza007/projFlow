import { Project } from '@/types/projects';
import { v4 as uuidv4 } from 'uuid';

export const projects: Omit<Project, 'favorite' >[] = [
  {
      id: '1',
      name: 'Project A',
      description: 'Description A',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      projectManager: 'John Doe',
  },
  {
      id: '2',
      name: 'Project B',
      description: 'Description B',
      startDate: '2025-02-15',
      endDate: '2025-11-30',
      projectManager: 'Jane Smith',
  },
];

export const favorites: string[] = ['1'];

export const generateId = () => uuidv4();
