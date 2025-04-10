import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useRouter } from 'next/navigation';
import useProjectStore from '@/stores/projects.store';

const Sidebar: React.FC = () => {
 const router = useRouter();
 const projects = useProjectStore((state) => state.projects);

 const favoriteProjects = projects.filter((project) => project.favorite);

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
    <Typography variant="h6" sx={{ ml: 2 }}>
     Favorite Projects
    </Typography>
    {favoriteProjects.map((project) => (
     <ListItem key={project.id} disablePadding>
      <ListItemButton onClick={() => router.push(`/projects/${project.id}`)}>
       <ListItemIcon>
        <FavoriteIcon />
       </ListItemIcon>
       <ListItemText primary={project.name} />
      </ListItemButton>
     </ListItem>
    ))}
   </List>
  </Drawer>
 );
};

export default Sidebar;