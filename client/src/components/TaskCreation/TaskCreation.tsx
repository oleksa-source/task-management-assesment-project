import React from "react";
import { TaskNew } from "./TaskNew";
import Box from "@mui/material/Box";

const TaskCreation = () => {
	return (
		<Box
			sx={{
				bgcolor: 'background.paper',
				pt: 14,
				pb: 6,
			}}
		>
			<TaskNew />
		</Box>
	);
};

export default TaskCreation;
