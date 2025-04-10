"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
    Typography,
    Box,
    Button,
    IconButton,
    CircularProgress,
    styled
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import useProjectStore from '@/stores/projects.store';
import { Project } from '@/types/projects';

const DetailItem = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(1),
}));

const ProjectDetailPage = () => {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();
    const { projects, toggleFavorite, loading, error } = useProjectStore();
    const [projectDetails, setProjectDetails] = useState<Project | null>(null);

    useEffect(() => {
        if (projects) {
            const currentProject = projects.find((proj) => proj.id === id);
            setProjectDetails(currentProject || null);
        }
    }, [projects, id]);

    const handleBack = () => {
        router.push('/projects');
    };

    const handleEdit = () => {
        router.push(`/projects/${id}/edit`);
    };

    const handleToggleFavorite = () => {
        if (projectDetails) {
            toggleFavorite(projectDetails.id);
            setProjectDetails({ ...projectDetails, favorite: !projectDetails.favorite });
        }
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
            <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={3}>
                <Typography variant="h4">Project Details</Typography>
                <IconButton onClick={handleToggleFavorite} aria-label="toggle favorite">
                    {projectDetails?.favorite ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon />}
                </IconButton>
            </Box>

            <DetailItem variant="subtitle1">
                Project ID: {projectDetails?.id}
            </DetailItem>
            <DetailItem variant="h6">
                Project Name: {projectDetails?.name}
            </DetailItem>
            <DetailItem variant="body1">
                Description: {projectDetails?.description}
            </DetailItem>
            <DetailItem variant="body1">
                Start Date: {projectDetails?.startDate}
            </DetailItem>
            <DetailItem variant="body1">
                End Date: {projectDetails?.endDate}
            </DetailItem>
            <DetailItem variant="body1">
                Project Manager: {projectDetails?.projectManager}
            </DetailItem>

            <Box mt={3}>
                <Button variant="outlined" onClick={handleBack} sx={{ mr: 2 }}>
                    Back
                </Button>
                <Button variant="contained" onClick={handleEdit}>
                    Edit
                </Button>
            </Box>
        </Box>
    );
};

export default ProjectDetailPage;