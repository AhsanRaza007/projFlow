export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  projectManager: string;
  favorite: boolean;
}

export interface ProjectCreate {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  projectManager: string;
}

export interface ProjectUpdate {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  projectManager: string;
}
