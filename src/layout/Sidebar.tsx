import React, { useMemo } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Alert,
  styled,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useRouter } from 'next/navigation';
import useProjectStore from '@/stores/projects.store';

const StyledAlert = styled(Alert)(({ theme }) => ({
  margin: theme.spacing(2),
}));

const Sidebar: React.FC = () => {
  const router = useRouter();
  const projects = useProjectStore((state) => state.projects);
  const favorites = useProjectStore((state) => state.favorites);

  const favoriteProjects = useMemo(() => {
    return projects.filter((project) => favorites.includes(project.id));
  }, [projects, favorites]);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <List>
        <Typography variant="h6" sx={{ ml: 2, mb: 1 }}>
          Favorite Projects
        </Typography>
        {favoriteProjects.length === 0 ? (
          <StyledAlert severity="info">No favorite projects yet!</StyledAlert>
        ) : (
          favoriteProjects.map((project) => (
            <ListItem key={project.id} disablePadding>
              <ListItemButton onClick={() => router.push(`/projects/${project.id}`)}>
                <ListItemIcon>
                  <FavoriteIcon />
                </ListItemIcon>
                <ListItemText primary={project.name} />
              </ListItemButton>
            </ListItem>
          ))
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;