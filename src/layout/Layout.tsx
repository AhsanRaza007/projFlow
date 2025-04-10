"use client";

import React, { useEffect, useState } from "react";
import {
    Box,
    CssBaseline,
    IconButton,
    Drawer,
    Toolbar,
    Typography,
    AppBar,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";
import useProjectStore from "@/stores/projects.store";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
    const appName = "ProjectFlow";

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const fetchProjects = useProjectStore(state => state.fetchProjects);
    
    useEffect(() => {
        const fetchData = async () => {
            await fetchProjects();
        };
        fetchData();
    }, [fetchProjects]);

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${isDesktop ? 240 : 0}px)` },
                    ml: { sm: isDesktop ? 240 : 0 },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: isDesktop ? "none" : "block" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        {appName}
                    </Typography>
                </Toolbar>
            </AppBar>
            {(isDesktop) ? (
                <Sidebar />
            ) : (
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        "& .MuiDrawer-paper": { width: 240 },
                    }}
                >
                    <Toolbar />
                    <Sidebar />
                </Drawer>
            )}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${isDesktop ? 240 : 0}px)` },
                    marginTop: { xs: "64px", sm: "64px", md: "64px" },
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
