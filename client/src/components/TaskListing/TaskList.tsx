import { observer } from 'mobx-react-lite';
import { TaskItem } from './TaskItem';
import { useStore } from "../../stores/use-store";
import React, { Fragment, useEffect, useMemo } from "react";
import { Task } from "../../stores/store-provider";
import TaskItemModel from "../../stores/TaskItem";
import {Container, Grid, Stack, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

export const TaskList = observer(() => {
    const navigate = useNavigate();
    const taskStore = useStore();

    useEffect(() => {
        taskStore.retrieveTaskList();
    }, [taskStore]);

    const sortedTasks = useMemo(
        () => taskStore.tasks
            .sort((a: Task, b: Task) => (new Date(a.due_date) as unknown as number) - (new Date(b.due_date) as unknown as number)),
        [taskStore.tasks]
    );

    const sortedArchivedTasks = useMemo(
        () => taskStore.archivedTasks
            .sort((a: Task, b: Task) => (new Date(a.due_date) as unknown as number) - (new Date(b.due_date) as unknown as number)),
        [taskStore.archivedTasks]
    );

    const toggleCompleted = (taskId: string) => {
        const found = taskStore.list.find((task: TaskItemModel) => task.id === taskId);
        console.assert(found, `Seeking task should be present. taskId: ${taskId}`);
        found?.toggleCompletion(taskId);
    }

    return (
        <Fragment>
            {
                taskStore.count === 0 && (
                    <Container maxWidth="md">
                        <Stack
                            sx={{ pt: 2 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button variant="contained" onClick={() => navigate('/create-task')}>Let's create your first task!</Button>
                        </Stack>
                    </Container>
                )
            }

            <Container sx={{ py: 8 }} maxWidth="md">
                {
                    sortedTasks.length ?
                        <Fragment>
                            <Typography sx={{ pl: 1, pb: 2 }} fontWeight={500}>Tasks to complete:</Typography>
                            <Grid container spacing={1}>
                                {
                                    sortedTasks.map((task, index) => (
                                        <TaskItem key={index} task={task} toggleCompleted={toggleCompleted} />
                                    ))
                                }
                            </Grid>
                        </Fragment>:
                        null
                }
                {
                    sortedArchivedTasks.length ?
                        <Fragment>
                            <Typography sx={{ pl: 1, pt: 4, pb: 2 }} fontWeight={500}>Archived tasks:</Typography>
                            <Grid container spacing={1}>
                                {
                                    sortedArchivedTasks.map((task) => (
                                        <TaskItem key={`${task.id}`} task={task} toggleCompleted={toggleCompleted} />
                                    ))
                                }
                            </Grid>
                        </Fragment>:
                        null
                }
            </Container>
        </Fragment>
    );
});
