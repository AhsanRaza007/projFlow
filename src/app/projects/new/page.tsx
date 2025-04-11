'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Typography,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import useProjectStore from '@/stores/projects.store';
import { ProjectCreate } from '@/types/projects';
import ProjectForm from '@/components/projects/project-form/ProjectForm';

const ProjectCreatePage = () => {
  const router = useRouter();
  
const createProject = useProjectStore((state) => state.createProject);
const loading = useProjectStore((state) => state.createProjectLoading);
const error = useProjectStore((state) => state.createProjectError);
const resetCreateProjectError = useProjectStore((state) => state.resetCreateProjectError);



  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setSnackbarOpen(true); 
    }
  }, [error]); 

  const handleSubmit = async (projectData: ProjectCreate) => {
   
    await createProject({ ...projectData, favorite: false });


    const latestError = useProjectStore.getState().createProjectError;
    if (!latestError) {
      router.push('/projects'); 
    }
  };

  const handleBackBtnClick = () => {
    if (!loading) { 
       router.push('/projects');
    }
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
    resetCreateProjectError();
  };


  return (
    <Box>
      <Typography variant="h4">Create Project</Typography>
      <Box marginTop={4}>
        <ProjectForm
          onSubmit={(data) => handleSubmit(data as ProjectCreate)}
          onBackBtnClick={handleBackBtnClick}
          submitButtonText="Create Project"
          isAsyncSubmitting={loading}
        />
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} 
      >
       
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
    
          {error || 'An error occurred.'}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProjectCreatePage;