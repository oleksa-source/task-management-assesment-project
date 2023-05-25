import React from "react";
import { Socket } from "socket.io-client/build/esm/socket";
import { TaskList } from "./TaskList";
import { Box, Container, Typography } from "@mui/material";

type TaskListingProps = {
	socket: Socket<any>
}

const TaskListingPage: React.FC<TaskListingProps> = () => {
	return (
			<Box
				sx={{
					bgcolor: 'background.paper',
					pt: 14,
					pb: 6,
				}}
			>
				<Container maxWidth="md">
					<Typography
						component="h1"
						variant="h4"
						align="center"
						color="text.primary"
						gutterBottom
					>
						The Ultimate Task Management Tool
					</Typography>
					<Typography variant="h5" align="center" color="text.secondary" paragraph>
						Our system provides you with a comprehensive suite of tools for creating, organizing and tracking tasks. With our system, you can manage deadlines, and customize your workflow for maximum productivity.
						Enjoy!
					</Typography>
				</Container>
				<TaskList />
			</Box>
	);
}

export default TaskListingPage;
