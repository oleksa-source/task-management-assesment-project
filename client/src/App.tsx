import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskListing from "./components/TaskListing/TaskListing";
import socket from "./socketClient";
import {
    Backdrop,
    CircularProgress,
    Container,
    createTheme,
    CssBaseline,
    ThemeProvider,
} from "@mui/material";
import { PageLayout } from './layouts/PageLayout';
import TaskCreation from "./components/TaskCreation/TaskCreation";

const defaultTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

function App() {
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('message');
        };
    }, []);

    return (
        <Container>
            <ThemeProvider theme={defaultTheme}>
                <CssBaseline />
                <BrowserRouter>
                    <Routes>
                        <Route element={ <PageLayout /> }>
                            <Route path='/' element={ <TaskListing socket={ socket } /> } />
                            <Route path='/create-task' element={ <TaskCreation /> } />
                        </Route>
                    </Routes>
                </BrowserRouter>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={ !isConnected }
                >
                    <CircularProgress color="success" />
                </Backdrop>
            </ThemeProvider>
        </Container>
  );
}

export default App;
