'use client';

    import React, { useEffect, useState, useCallback } from 'react';
    import { useRouter, useParams } from 'next/navigation';
    import { Typography, Box, CircularProgress, Snackbar, Alert } from '@mui/material';
    import useProjectStore from '@/stores/projects.store';
    import { Project, ProjectUpdate } from '@/types/projects';
    import ProjectForm from '@/components/projects/project-form/ProjectForm';

    const ProjectEditPage = () => {
      const router = useRouter();
      const { id } = useParams<{ id: string }>();
      const [projectDetails, setProjectDetails] = useState<Project | null>(null);
      const [snackbarOpen, setSnackbarOpen] = useState(false);
      const [snackbarMessage, setSnackbarMessage] = useState('');
      const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('error');

      const currentProjectDetail = useProjectStore(state => state.currentProjectDetail);
      const projectDetailLoading = useProjectStore(state => state.projectDetailLoading);
      const projectDetailError = useProjectStore(state => state.projectDetailError);
      const getProjectById = useProjectStore(state => state.getProjectById);
      const updateProject = useProjectStore(state => state.updateProject);
      const updateProjectLoading = useProjectStore(state => state.updateProjectLoading);
      const updateProjectError = useProjectStore(state => state.updateProjectError);
      const resetProjectDetailError = useProjectStore(state => state.resetProjectDetailError);
      const resetUpdateProjectError = useProjectStore(state => state.resetUpdateProjectError);

      useEffect(() => {
        if (id) {
          getProjectById(id);
        }
      }, [id, getProjectById]);

      useEffect(() => {
        setProjectDetails(currentProjectDetail);
      }, [currentProjectDetail]);

      useEffect(() => {
        if (projectDetailError) {
          setSnackbarMessage(projectDetailError);
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        }
        if (updateProjectError) {
          setSnackbarMessage(updateProjectError);
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        }
      }, [projectDetailError, updateProjectError]);

      const handleCloseSnackbar = useCallback((event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setSnackbarOpen(false);
        resetProjectDetailError();
        resetUpdateProjectError();
      }, [resetProjectDetailError, resetUpdateProjectError]);

      const handleSubmit = useCallback(async (projectData: ProjectUpdate) => {
        if (projectDetails?.id) {
          try {
            await updateProject(projectDetails.id, projectData);
            router.push(`/projects/${projectDetails.id}`);
          } catch (err: unknown) {
            let message = 'An unknown error occurred.';
            if (err instanceof Error) {
              message = err.message;
              console.error(err.message);
            } else {
              console.error('An unknown error occurred:', err);
            }
            setSnackbarMessage(message);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
          }
        } else {
          setSnackbarMessage('Project ID not found.');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        }
      }, [router, projectDetails, updateProject]);

      const handleBackBtnClick = useCallback(() => {
        router.push(`/projects/${id}`);
      }, [router, id]);

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
        return <Typography>Loading project details...</Typography>;
      }

      return (
        <Box>
          <Typography variant="h4">Edit Project</Typography>
          {projectDetails && (
            <Box marginTop={4}>
              <ProjectForm
                project={projectDetails}
                onSubmit={handleSubmit}
                onBackBtnClick={handleBackBtnClick}
                submitButtonText={updateProjectLoading ? 'Updating...' : 'Update Project'}
                isAsyncSubmitting={updateProjectLoading}
              />
            </Box>
          )}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={5000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>
      );
    };

    export default ProjectEditPage;