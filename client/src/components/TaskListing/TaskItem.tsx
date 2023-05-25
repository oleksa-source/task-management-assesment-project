import React from 'react';
import TaskItemModel from "../../stores/TaskItem";
import dayjs from "dayjs";
import {
    Card,
    CardHeader,
    Grid,
} from "@mui/material";
import { TaskViewingModal } from "./TaskViewingModal";
import { green, grey } from "@mui/material/colors";
import AddTaskIcon from '@mui/icons-material/AddTask';
import AssignmentIcon from '@mui/icons-material/Assignment';

type TaskItemProps = {
    task: TaskItemModel;
    toggleCompleted: (taskId: string) => void;
}

const CompletionIcon = ({ task }: { task: TaskItemModel }) => {
    if (task.completed) {
        return (
            <AddTaskIcon sx={{ color: green[500] }} />
        )
    }

    return (
        <AssignmentIcon sx={{ color: grey[500] }} />
    )
}

export const TaskItem = (props: TaskItemProps) => {
  const { task, toggleCompleted } = props;

  return (
      <Grid item key={task.id} xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardHeader
                  avatar={
                      <CompletionIcon task={task} />
                  }
                  action={
                      <TaskViewingModal task={task} toggleCompleted={toggleCompleted} />
                  }
                  title={ task.title  }
                  subheader={ `Due date: ${ dayjs(task.due_date).format('YYYY-MM-DD') }` }
              />
          </Card>
      </Grid>
  );
};
