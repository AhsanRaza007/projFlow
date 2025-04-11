import React from 'react';
import { Table, TableBody, TableContainer, Card } from '@mui/material';
import ProjectTableHead from './ProjectTableHead';
import ProjectTableRow from './ProjectTableRow';
import { Project } from '@/types/projects';

type ProjectTableProps = {
  projects: Project[];
  toggleFavorite: (id: string) => void;
};

const ProjectTable: React.FC<ProjectTableProps> = ({ projects, toggleFavorite }) => {
  return (
    <TableContainer component={Card}>
      <Table>
        <ProjectTableHead />
        <TableBody>
          {projects.map((project) => (
            <ProjectTableRow key={project.id} project={project} toggleFavorite={toggleFavorite} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectTable;
