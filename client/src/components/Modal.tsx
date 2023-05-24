import React, { useEffect, useRef, useState } from "react";
import {Socket} from "socket.io-client/build/esm/socket";

type ModalProps = {
	showModal: boolean
	setShowModal: (state: boolean) => void
	selectedItemID: string
	socket: Socket<any>
}
const Modal: React.FC<ModalProps> = ({ showModal, setShowModal, selectedItemID, socket }) => {
	const modalRef = useRef();
	const [comment, setComment] = useState("");
	const [comments, setComments] = useState([]);

	useEffect(() => {
		socket.on("commentsReceived", (todo: any) => setComments(todo.comments));
	}, [socket]);

	return (
		<></>
	);
};

export default Modal;
