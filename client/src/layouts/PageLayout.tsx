import React, { Fragment, useState } from "react";
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import {Copyright} from "@mui/icons-material";

export const PageLayout = () => {
    const navigate = useNavigate();
    const [navItems] = useState([
        {
            name: 'Listings',
            path: '/',
        },
        {
            name: 'Create Task',
            path: '/create-task',
        }
    ]);

    return <Fragment>
        <AppBar component="nav">
            <Toolbar>
                <Box>
                    {
                        navItems.map((item) => (
                            <Button key={ item.name } sx={{ color: '#fff' }} onClick={ () => navigate(item.path) }>
                                { item.name }
                            </Button>
                        ))
                    }
                </Box>
            </Toolbar>
        </AppBar>
        <Outlet/>
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
            <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
                component="p"
            >
                The Ultimate Task Management Tool - { new Date().getFullYear() }
            </Typography>
        </Box>
    </Fragment>
}