import React from "react";
import { CardContent, Typography, Box, IconButton, Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useRouter } from "next/navigation";
import { Project } from "@/types/projects";
import { ClickableCard } from "@/styles/card";

type ProjectCardProps = {
    project: Project;
    toggleFavorite: (id: string) => void;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, toggleFavorite }) => {
    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/projects/${project.id}`);
    };

    return (
        <ClickableCard key={project.id} sx={{ marginBottom: "16px" }} onClick={handleCardClick}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="8px">
                    <Typography variant="subtitle2">{project.name}</Typography>

                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(project.id);
                        }}
                    >
                        {project.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                </Box>
                <Box display="flex" gap={"8px"} flexDirection="column">
                    <Typography variant="subtitle2" color="text.secondary">Project ID: {project.id}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Start Date: {project.startDate}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        End Date: {project.endDate}
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="8px">
                    <Typography variant="button" color="text.secondary">
                        Project Manager: {project.projectManager}
                    </Typography>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/projects/${project.id}/edit`);
                        }}
                    >
                        Edit
                    </Button>
                </Box>
            </CardContent>
        </ClickableCard>
    );
};

export default ProjectCard;
