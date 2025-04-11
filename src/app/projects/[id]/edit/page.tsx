'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Typography, Box, CircularProgress } from '@mui/material';
import useProjectStore from '@/stores/projects.store';
import { Project, ProjectUpdate } from '@/types/projects';
import ProjectForm from '@/components/projects/project-form/ProjectForm'; // Reusable form component

const ProjectEditPage = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { projects, editProject, fetchProjects, loading, error } = useProjectStore();
  const [projectDetails, setProjectDetails] = useState<Project | null>(null);
  const [submittingError, setSubmittingError] = useState<string | null>(null);

  useEffect(() => {
    if (!projects || projects.length === 0) {
      fetchProjects();
    }
  }, [fetchProjects, projects]);

  useEffect(() => {
    if (projects) {
      const currentProject = projects.find((proj) => proj.id === id);
      setProjectDetails(currentProject || null);
    }
  }, [projects, id]);

  const handleSubmit = async (projectData: ProjectUpdate) => {
    try {
      if (projectDetails) {
        await editProject(projectDetails.id, projectData);
        router.push(`/projects/${id}`);
      }
    } catch (err: unknown) {
      // Handle error (e.g., display error message)
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

  if (!projects) {
    return <Typography>Loading projects...</Typography>;
  }

  if (!projectDetails) {
    return <Typography>Project not found</Typography>;
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
