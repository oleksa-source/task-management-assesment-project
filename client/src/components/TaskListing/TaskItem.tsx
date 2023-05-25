import React from 'react';
import TaskItemModel from "../../stores/TaskItem";
import dayjs from "dayjs";
import {
    Card,
    CardActions,
    CardContent,
    Grid,
    Typography
} from "@mui/material";
import { TaskViewingModal } from "./TaskViewingModal";

type TaskItemProps = {
    task: TaskItemModel;
    toggleCompleted: (taskId: string) => void;
}

export const TaskItem = (props: TaskItemProps) => {
  const { task, toggleCompleted } = props;

  return (
      <Grid item key={task.id} xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2">
                      Due date: { dayjs(task.due_date).format('YYYY-MM-DD') }
                  </Typography>
                  <Typography>
                      { task.title }
                  </Typography>
              </CardContent>
              <CardActions>
                  <TaskViewingModal task={task} toggleCompleted={toggleCompleted} />
              </CardActions>
          </Card>
      </Grid>
  );
};
