'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Typography, Box, CircularProgress } from '@mui/material';
import useProjectStore from '@/stores/projects.store';
import { ProjectCreate } from '@/types/projects';
import ProjectForm from '@/components/projects/project-form/ProjectForm';

const ProjectCreatePage = () => {
  const router = useRouter();
  const { addProject, loading, error } = useProjectStore();
  const [submittingError, setSubmittingError] = useState<string | null>(null);

  const handleSubmit = async (projectData: ProjectCreate) => {
    try {
      await addProject(projectData);
      router.push('/projects');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSubmittingError(err.message);
        console.error(err.message);
      } else {
        setSubmittingError('An unknown error occurred.');
        console.error('An unknown error occurred.');
      }
    }
  };

  const handleBackBtnClick = () => {
    router.push('/projects');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }
  return (
    <Box>
      <Typography variant="h4">Create Project</Typography>
      <Box marginTop={4}>
        <ProjectForm
          onSubmit={(data) => handleSubmit(data as ProjectCreate)}
          onBackBtnClick={handleBackBtnClick}
          submitButtonText="Create Project"
        />
      </Box>
      {submittingError && (
        <Typography color="error" variant="body2">
          {submittingError}
        </Typography>
      )}
    </Box>
  );
};

export default ProjectCreatePage;
