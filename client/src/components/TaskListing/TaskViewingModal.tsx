import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import {
    Card,
    Chip,
    Divider,
    IconButton,
    Stack,
    Switch,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from "@mui/material";
import { Close } from "@mui/icons-material";
import TaskItemModel from "../../stores/TaskItem";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
};

type TaskViewingModalProps = {
    task: TaskItemModel;
    toggleCompleted: (taskId: string) => void;
}

export const TaskViewingModal: React.FC<TaskViewingModalProps> = ({ task, toggleCompleted }) => {
    const [open, setOpen] = React.useState(false);
    const [alignment, setAlignment] = React.useState(task.completed ? 'completed' : 'in-progress' );

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const handleChange = () => {
        toggleCompleted(task.id as string)
        setAlignment(!task.completed ? 'completed' : 'in-progress')
    };

    return (
        <div>
            <Button size="small" onClick={handleOpen}>Manage</Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={{ ...style, width: 400 }}>
                    <Card>
                        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                                <Typography fontWeight={700}>{ task.title }</Typography>
                        </Box>
                        <Divider />
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                { task.description }
                            </Typography>
                            <ToggleButtonGroup
                                size="small"
                                color="primary"
                                value={alignment}
                                exclusive
                                onChange={handleChange}
                                aria-label="Status"
                            >
                                <ToggleButton value="completed">Completed</ToggleButton>
                                <ToggleButton value="in-progress">In progress</ToggleButton>
                            </ToggleButtonGroup>
                        </Stack>
                    </Card>
                </Box>
            </Modal>
        </div>
    );
}