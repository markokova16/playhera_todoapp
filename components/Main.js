import { useState, useEffect } from "react";
import axios from "../api/axios";
import Input from "./Input";
import Task from "./Task";

const Main = () => {
	const [userInput, setUserInput] = useState("");
	const [todoList, setTodoList] = useState([]);
	const [todoId, setTodoId] = useState("");

	const [editState, setEditState] = useState(false);
	const [update, setUpdate] = useState(true);

	// ENDPOINTS
	const GET_URL = "/unicorns/";

	// GET ALL TASKS
	useEffect(() => {
		const getTodoList = async () => {
			try {
				const response = await axios.get(GET_URL);
				console.log(response.data);
				setTodoList(response.data);
			} catch (err) {
				console.log(err.message);
			}
		};
		if (update) {
			getTodoList();
			setUpdate(false);
		}
	}, [update]);

	return (
		<div className="flex flex-col  items-center ">
			<Input
				userInput={userInput}
				setUserInput={setUserInput}
				editState={editState}
				setEditState={setEditState}
				setUpdate={setUpdate}
				todoId={todoId}
			/>
			{todoList.map((task) => {
				return (
					<Task
						id={task._id}
						key={task._id}
						task={task}
						setUpdate={setUpdate}
						setUserInput={setUserInput}
						setEditState={setEditState}
						setTodoId={setTodoId}
					/>
				);
			})}
		</div>
	);
};

export default Main;
