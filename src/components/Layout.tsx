"use client";

import React, { useState } from "react";
import { Box, CssBaseline, useMediaQuery, IconButton, Drawer, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width:600px)");

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            {isDesktop ? (
                <Sidebar />
            ) : (
                <>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        <Toolbar />
                        <Sidebar />
                    </Drawer>
                </>
            )}
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${isDesktop ? 240 : 0}px)` } }}>
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
