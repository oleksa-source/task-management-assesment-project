import React, {Fragment, useState} from "react";
import {useStore} from "../../stores/use-store";
import {DatePicker, DateValidationError, LocalizationProvider} from "@mui/x-date-pickers";
import {
    Button,
    Container,
    Grid,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {PickerChangeHandlerContext} from "@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue.types";
import Box from "@mui/material/Box";
import AssignmentIcon from '@mui/icons-material/Assignment';
import {green, grey} from "@mui/material/colors";
import {useNavigate} from "react-router-dom";
import dayjs, {Dayjs} from "dayjs";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const defaultDatePickerDate = (): Dayjs => dayjs().add(7, 'day');

export const TaskNew = () => {
    const navigate = useNavigate();
    const [createdViewState, setCreatedViewState] = useState<boolean>(true);
    const [dueDate, setDueDate] = useState<Dayjs>(defaultDatePickerDate());
    const taskList = useStore();


    const navigateToTheListings = () => navigate('/');
    const startOver = () => setCreatedViewState(true);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        taskList.addTaskAsync({
            title: data.get('title') as string,
            description: data.get('description') as string,
            due_date: dueDate.toISOString(),
            completed: false,
        }).then(() => {
            setDueDate(defaultDatePickerDate());
            setCreatedViewState(false);
        }).catch(() => {
            // TODO: handle errors
        });
    };

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {
                        createdViewState ? (
                            <Fragment>
                                <AssignmentIcon sx={{color: grey[500], fontSize: 40, mb: 2}}/>
                                <Typography align="center" component="h1" variant="h5">
                                    Create a task to customize maximum productivity.
                                </Typography>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <AssignmentTurnedInIcon sx={{color: green[500], fontSize: 40, mb: 2}}/>
                                <Typography align="center" component="h1" variant="h5">
                                    The task has been successfully created!
                                </Typography>
                            </Fragment>
                        )
                    }

                    {
                        createdViewState ?
                            (
                                <Box component="form" autoComplete="off" onSubmit={handleSubmit} sx={{mt: 3}}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                name="title"
                                                label="Title"
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker defaultValue={dueDate as unknown as Date} disablePast
                                                            onChange={(value: Date | null, context: PickerChangeHandlerContext<DateValidationError>) => {
                                                                setDueDate(dayjs(value));
                                                            }}/>
                                            </LocalizationProvider>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                label="Description"
                                                name="description"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                variant="outlined"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{mt: 3, mb: 2}}
                                    >
                                        Add
                                    </Button>
                                </Box>
                            ) :
                            (
                                <Stack
                                    sx={{pt: 2}}
                                    direction="row"
                                    spacing={2}
                                    justifyContent="center"
                                >
                                    <Button variant="outlined" onClick={navigateToTheListings}>Listings</Button>
                                    <Button variant="contained" onClick={startOver}>Create a new task</Button>
                                </Stack>
                            )
                    }

                </Box>
            </Container>
        </div>
    );
};
