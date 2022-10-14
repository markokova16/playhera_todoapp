import { useState, useEffect } from "react";
import axios from "axios";

const Index = () => {
	const [userInput, setUserInput] = useState("");
	const [todoList, setTodoList] = useState([]);
	const [completedTodosIds, setCompletedTodosIds] = useState([]);
	const [editState, setEditState] = useState(false);
	const [editId, setEditId] = useState(null);

	const getTodoList = () => {
		axios
			.get(
				"https://crudcrud.com/api/d48d26d42faf4a328436aa3a4508daf4/unicorns"
			)
			.then((response) => {
				setTodoList(response.data);
			});
	};

	useEffect(() => {
		getTodoList();
	}, []);

	const handleChange = (e) => {
		e.preventDefault();

		setUserInput(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.post(
				"https://crudcrud.com/api/d48d26d42faf4a328436aa3a4508daf4/unicorns",
				{ name: userInput }
			)
			.then(({ data }) => {
				getTodoList();
			});
		setUserInput("");
	};

	const handleDelete = (todo) => {
		axios
			.delete(
				"https://crudcrud.com/api/d48d26d42faf4a328436aa3a4508daf4/unicorns/" +
					todo._id,
				{ name: userInput }
			)
			.then(({ data }) => {
				getTodoList();
			});

		setTodoList({});
	};

	const handleClick = (event, todoIndex) => {
		if (completedTodosIds.includes(todoIndex)) {
			// remove it
			const newTodos = completedTodosIds.filter((item, index) => {
				return item != todoIndex;
			});
			setCompletedTodosIds([...newTodos]);
		} else {
			// add to completed

			if (!completedTodosIds.includes(todoIndex))
				setCompletedTodosIds([...completedTodosIds, todoIndex]);
		}
	};

	const handleStuff = () => {
		setEditState(false);
		setEditId(null);
		setUserInput("");
	};

	const handleEdit = (todo, idx) => {
		setEditState(true);
		setEditId(todo._id);
		setUserInput(todo.name);
	};

	const handleCancel = () => {
		handleStuff();
	};

	const handleSave = () => {
		axios
			.put(
				"https://crudcrud.com/api/d48d26d42faf4a328436aa3a4508daf4/unicorns/" +
					editId,
				{ name: userInput }
			)
			.then(({ data }) => {
				getTodoList();
			});
		handleStuff();

		console.log(editId);
		console.log(todoList);
	};

	return (
		<div className="flex flex-col  h-screen items-center bg-black">
			<h1 className="my-20   text-8xl font-extrabold text-red-700 ">
				Next.js ToDo List
			</h1>
			<form className="flex">
				<input
					className="text-black text-center border-black border-10 bg-white ml-14 mr-5 w-[500px]"
					type="text"
					onChange={handleChange}
					value={userInput}
					placeholder="Enter your task"
				/>

				{editState ? (
					<div className="flex">
						<button
							className="bg-white text-black w-[70px] rounded-lg px-5 mr-2"
							type="button"
							onClick={handleSave}
						>
							Save
						</button>
						<button
							className="bg-white text-black w-[70px] rounded-lg "
							onClick={handleCancel}
							type="button"
						>
							Cancel
						</button>
					</div>
				) : (
					<button
						className="bg-white text-black w-[70px] rounded-lg"
						onClick={handleSubmit}
						disabled={!userInput}
					>
						Submit
					</button>
				)}
			</form>

			<ul className="my-5 text-white ">
				{todoList.length >= 1
					? todoList.map((todo, idx) => {
							return (
								<li className="text-white">
									<span
										onClick={(e) =>
											handleClick(e, todo._id)
										}
										key={todo._id}
										className={
											completedTodosIds.includes(
												todo._id
											) && "line-through"
										}
									>
										{todo.name}{" "}
									</span>

									<button
										className="bg-white text-black w-[70px] my-5 ml-2 rounded-lg"
										onClick={() => handleEdit(todo)}
									>
										Edit
									</button>

									<button
										className="bg-white text-black w-[70px] my-5 ml-2 rounded-lg"
										onClick={(e) => {
											e.preventDefault();
											handleDelete(todo);
										}}
									>
										Delete
									</button>
								</li>
							);
					  })
					: "What are your tasks for today? :)"}
			</ul>
		</div>
	);
};

export default Index;
