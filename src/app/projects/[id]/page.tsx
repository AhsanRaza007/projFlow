'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Typography,
  Box,
  Button,
  IconButton,
  CircularProgress,
  styled,
  Snackbar,
  Alert,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import useProjectStore from '@/stores/projects.store';
import { Project } from '@/types/projects';

const DetailItem = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const ProjectDetailPage = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [projectDetails, setProjectDetails] = useState<Project | null>(null);
  const [isFavoriteLocal, setIsFavoriteLocal] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const currentProjectDetail = useProjectStore((state) => state.currentProjectDetail);
  const projectDetailLoading = useProjectStore((state) => state.projectDetailLoading);
  const projectDetailError = useProjectStore((state) => state.projectDetailError);
  const favorites = useProjectStore((state) => state.favorites);
  const getProjectById = useProjectStore((state) => state.getProjectById);
  const addFavorite = useProjectStore((state) => state.addFavorite);
  const addFavoriteLoading = useProjectStore((state) => state.addFavoriteLoading);
  const addFavoriteError = useProjectStore((state) => state.addFavoriteError);
  const removeFavorite = useProjectStore((state) => state.removeFavorite);
  const removeFavoriteLoading = useProjectStore((state) => state.removeFavoriteLoading);
  const removeFavoriteError = useProjectStore((state) => state.removeFavoriteError);
  const resetProjectDetailError = useProjectStore((state) => state.resetProjectDetailError);
  const resetAddFavoriteError = useProjectStore((state) => state.resetAddFavoriteError);
  const resetRemoveFavoriteError = useProjectStore((state) => state.resetRemoveFavoriteError);

  useEffect(() => {
    if (id) {
      getProjectById(id);
    }
  }, [id, getProjectById]);

  useEffect(() => {
    setProjectDetails(currentProjectDetail);
    setIsFavoriteLocal(!!currentProjectDetail?.id && favorites.includes(currentProjectDetail.id));
  }, [currentProjectDetail, favorites]);

  useEffect(() => {
    if (projectDetailError) {
      setSnackbarMessage(projectDetailError);
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
  }, [projectDetailError, addFavoriteError, removeFavoriteError]);

  const handleCloseSnackbar = useCallback(
    (event: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setSnackbarOpen(false);
      resetProjectDetailError();
      resetAddFavoriteError();
      resetRemoveFavoriteError();
    },
    [resetProjectDetailError, resetAddFavoriteError, resetRemoveFavoriteError],
  );

  const handleBack = useCallback(() => {
    router.push('/projects');
  }, [router]);

  const handleEdit = useCallback(() => {
    if (id) {
      router.push(`/projects/${id}/edit`);
    }
  }, [router, id]);

  const handleToggleFavorite = useCallback(async () => {
    if (projectDetails?.id) {
      if (isFavoriteLocal) {
        await removeFavorite(projectDetails.id);
      } else {
        await addFavorite(projectDetails.id);
      }
      setIsFavoriteLocal(!isFavoriteLocal);
    }
  }, [projectDetails, isFavoriteLocal, addFavorite, removeFavorite]);

  if (projectDetailLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (projectDetailError) {
    return <Typography color="error">Error loading project details.</Typography>;
  }

  if (!projectDetails) {
    return <Typography>Project not found!</Typography>;
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={3}>
        <Typography variant="h4">Project Details</Typography>
        <IconButton
          onClick={handleToggleFavorite}
          aria-label="toggle favorite"
          disabled={addFavoriteLoading || removeFavoriteLoading}
        >
          {isFavoriteLocal ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>

      <DetailItem variant="subtitle1">Project ID: {projectDetails.id}</DetailItem>
      <DetailItem variant="h6">Project Name: {projectDetails.name}</DetailItem>
      <DetailItem variant="body1">Description: {projectDetails.description}</DetailItem>
      <DetailItem variant="body1">Start Date: {projectDetails.startDate}</DetailItem>
      <DetailItem variant="body1">End Date: {projectDetails.endDate}</DetailItem>
      <DetailItem variant="body1">Project Manager: {projectDetails.projectManager}</DetailItem>

      <Box mt={3}>
        <Button variant="contained" onClick={handleEdit} sx={{ mr: 2 }}>
          Edit
        </Button>
        <Button variant="outlined" onClick={handleBack}>
          Back
        </Button>
      </Box>

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
    </Box>
  );
};

export default ProjectDetailPage;
