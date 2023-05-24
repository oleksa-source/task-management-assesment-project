import React from "react";
import { useNavigate } from "react-router-dom";
const Nav = () => {
	const navigate = useNavigate();

	return (
		<nav className='navbar'>
			<ul>
				<li>
					<a onClick={ () => navigate('/') }>Task Listings</a>
				</li>
				<li>
					<a onClick={ () => navigate('/create-task') }>Create Task</a>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
