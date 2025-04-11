'use client';
    
    import React, { useEffect } from 'react';
    import { Typography, CircularProgress, Box, Button, useTheme, useMediaQuery } from '@mui/material';
    import { useRouter } from 'next/navigation';
    import useProjectStore from '@/stores/projects.store';
    import ProjectTable from '@/components/projects/project-table/ProjectTable';
    import ProjectCard from '@/components/projects/project-card/ProjectCard';
    
    const ProjectList = () => {
      const { loading, error, fetchProjects, addFavorite, removeFavorite } = useProjectStore();
      const router = useRouter();
      const theme = useTheme();
      const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
      const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
      const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
    
      useEffect(() => {
        fetchProjects();
      }, [fetchProjects]);
    
      const handleToggleFavorite = (projectId: string, isCurrentlyFavorite: boolean) => {
        if (isCurrentlyFavorite) {
          removeFavorite(projectId);
        } else {
          addFavorite(projectId);
        }
      };
    
      const projectsWithFavFlagArray = useProjectStore((state) => state.projectsWithFavoriteFlag);
    
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
            projectsWithFavFlagArray.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                toggleFavorite={() => handleToggleFavorite(project.id, project.favorite)}
              />
            ))}
          {(isTablet || isDesktop) && (
            <ProjectTable
              projects={projectsWithFavFlagArray} 
              toggleFavorite={handleToggleFavorite}
            />
          )}
        </div>
      );
    };
    
    export default ProjectList;