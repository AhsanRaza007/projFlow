"use client";

import React from "react";
import {
    Typography,
    CircularProgress,
    Box,
    Button,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/navigation";
import useProjectStore from "@/stores/projects.store";
import ProjectTable from "@/components/projects/project-table/ProjectTable";
import ProjectCard from "@/components/projects/project-card/ProjectCard";

const ProjectList = () => {
    const { projects, loading, error, toggleFavorite } = useProjectStore();
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));
    const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

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
            <Box justifyContent={'space-between'} display={"flex"} marginBottom={'16px'}>
                <Typography variant={isMobile ? "h6" : "h4"}>
                    Project List
                </Typography>
                <Button
                    variant="contained"
                    size={isMobile ? "small" : "medium"}
                    onClick={() => router.push("/projects/create")}
                >
                    Create New Project
                </Button>
            </Box>
            {isMobile && (
                projects.map((project) => (
                    <ProjectCard key={project.id} project={project} toggleFavorite={toggleFavorite} />
                ))
            )}
            {(isTablet || isDesktop) && (
                <ProjectTable projects={projects} toggleFavorite={toggleFavorite} />
            )}
        </div>
    );
};

export default ProjectList;