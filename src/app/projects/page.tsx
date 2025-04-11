'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Typography,
  CircularProgress,
  Box,
  Button,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import useProjectStore from '@/stores/projects.store';
import ProjectCard from '@/components/projects/project-card/ProjectCard';
import ProjectTable from '@/components/projects/project-table/ProjectTable';

const ProjectList = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const projectsWithoutfavs = useProjectStore((state) => state.projects);
  const favorites = useProjectStore((state) => state.favorites);
  const loading = useProjectStore((state) => state.projectsLoading);
  const error = useProjectStore((state) => state.projectsError);
  const fetchProjects = useProjectStore((state) => state.fetchProjects);
  const addFavorite = useProjectStore((state) => state.addFavorite);
  const removeFavorite = useProjectStore((state) => state.removeFavorite);
  const addFavoriteError = useProjectStore((state) => state.addFavoriteError);
  const removeFavoriteError = useProjectStore((state) => state.removeFavoriteError);
  const resetAddFavoriteError = useProjectStore((state) => state.resetAddFavoriteError);
  const resetRemoveFavoriteError = useProjectStore((state) => state.resetRemoveFavoriteError);
  const resetProjectsError = useProjectStore((state) => state.resetProjectsError);

  const projects = useMemo(() => {
    return projectsWithoutfavs.map((project) => ({
      ...project,
      favorite: favorites.includes(project.id),
    }));
  }, [projectsWithoutfavs, favorites]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    if (error) {
      setSnackbarMessage(error);
      setSnackbarOpen(true);
    }
    if (addFavoriteError) {
      setSnackbarMessage(addFavoriteError);
      setSnackbarOpen(true);
    }
    if (removeFavoriteError) {
      setSnackbarMessage(removeFavoriteError);
      setSnackbarOpen(true);
    }
  }, [error, addFavoriteError, removeFavoriteError]);

  const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
    resetProjectsError();
    resetAddFavoriteError();
    resetRemoveFavoriteError();
  };

  const handleToggleFavorite = (projectId: string, isCurrentlyFavorite: boolean) => {
    if (isCurrentlyFavorite) {
      removeFavorite(projectId);
    } else {
      addFavorite(projectId);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (projects.length === 0 && !loading) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        No projects available in the list.
      </Alert>
    );
  }

  return (
    <div>
      <Box justifyContent={'space-between'} display={'flex'} marginBottom={'16px'}>
        <Typography variant={isMobile ? 'h6' : 'h4'}>Project List</Typography>
        <Button
          variant="contained"
          size={isMobile ? 'small' : 'medium'}
          onClick={() => router.push('/projects/new')}
        >
          Create New Project
        </Button>
      </Box>
      {isMobile &&
        projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            toggleFavorite={() => handleToggleFavorite(project.id, project.favorite)}
          />
        ))}
      {(isTablet || isDesktop) && (
        <ProjectTable projects={projects} toggleFavorite={handleToggleFavorite} />
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProjectList;
