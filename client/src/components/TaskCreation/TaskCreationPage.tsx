import React from "react";
import { TaskNew } from "./TaskNew";
import Box from "@mui/material/Box";

const TaskCreationPage = () => {
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

export default TaskCreationPage;
