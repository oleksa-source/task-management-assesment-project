import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Nav from "./Nav";
import {Socket} from "socket.io-client/build/esm/socket";

type TaskListingsProps = {
	socket: Socket<any>
}

const TaskListings: React.FC<TaskListingsProps> = ({ socket }) => {
	const [todo, setTodo] = useState("");
	const [todoList, setTodoList] = useState([]);

	const [showModal, setShowModal] = useState(false);
	const [selectedItemID, setSelectedItemID] = useState("");

	const sendMessage = () => {
		socket.emit('ping');
	}

	const toggleModal = (itemId: string) => {
		socket.emit("viewComments", itemId);
		setSelectedItemID(itemId);
		setShowModal(!showModal);
	};

	const generateID = () => Math.random().toString(36).substring(2, 10);

	const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		socket.emit("addTodo", {
			id: generateID(),
			todo,
			comments: [],
		});
		setTodo("");
	};

	useEffect(() => {
		socket.on("todos", (data: any) => setTodoList(data));
	}, [socket]);

	const deleteTodo = (id: string) => socket.emit("deleteTodo", id);

	return (
		<div>
			<button onClick={sendMessage}>Ping</button>
			{showModal ? (
				<Modal
					showModal={showModal}
					setShowModal={setShowModal}
					selectedItemID={selectedItemID}
					socket={socket}
				/>
			) : (
				""
			)}
		</div>
	);
}

export default TaskListings;
