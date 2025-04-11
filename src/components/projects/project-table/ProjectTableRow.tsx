import React from 'react';
import { TableCell, IconButton, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useRouter } from 'next/navigation';
import { Project } from '@/types/projects';
import { ClickableTableRow } from '@/styles/table';

type ProjectTableRowProps = {
  project: Project;
  toggleFavorite: (id: string) => void;
};
const ProjectTableRow: React.FC<ProjectTableRowProps> = ({ project, toggleFavorite }) => {
  const router = useRouter();

  const handleRowClick = () => {
    router.push(`/projects/${project.id}`);
  };

  return (
    <ClickableTableRow key={project.id} onClick={handleRowClick}>
      <TableCell>{project.id}</TableCell>
      <TableCell>{project.name}</TableCell>
      <TableCell>{project.startDate}</TableCell>
      <TableCell>{project.endDate}</TableCell>
      <TableCell>{project.projectManager}</TableCell>
      <TableCell>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(project.id);
          }}
        >
          {project.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </TableCell>
      <TableCell>
        <Button
          variant="contained"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/projects/${project.id}/edit`);
          }}
        >
          Edit
        </Button>
      </TableCell>
    </ClickableTableRow>
  );
};

export default ProjectTableRow;
