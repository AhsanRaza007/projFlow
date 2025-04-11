'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Typography, Box, CircularProgress } from '@mui/material';
import useProjectStore from '@/stores/projects.store';
import { Project, ProjectUpdate } from '@/types/projects';
import ProjectForm from '@/components/projects/project-form/ProjectForm';

const ProjectEditPage = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { getProjectById, updateProject, loading, error } = useProjectStore(); 
  const [projectDetails, setProjectDetails] = useState<Project | null>(null);
  const [submittingError, setSubmittingError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      if (id) {
        const project = await getProjectById(id);
        setProjectDetails(project || null);
      }
    };
    fetchProjectDetail();
  }, [id, getProjectById]);

  const handleSubmit = async (projectData: ProjectUpdate) => {
    setSubmittingError(null);
    try {
      if (projectDetails?.id) {
        await updateProject(projectDetails.id, projectData);
        router.push(`/projects/${projectDetails.id}`);
      } else {
        setSubmittingError('Project ID not found.');
      }
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
    router.push(`/projects/${id}`);
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
            submitButtonText="Update Project"
          />
        </Box>
      )}
      {submittingError && (
        <Typography color="error" variant="body2">
          {submittingError}
        </Typography>
      )}
    </Box>
  );
};

export default ProjectEditPage;
