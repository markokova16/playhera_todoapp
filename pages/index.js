import { useState } from "react";

const Index = () => {
	const [userInput, setUserInput] = useState("");
	const [todoList, setTodoList] = useState([]);
	const [completedTodosIds, setCompletedTodosIds] = useState([]);
	const [editState, setEditState] = useState(false);
	const [editId, setEditId] = useState(null);

	const handleChange = (e) => {
		e.preventDefault();

		setUserInput(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		setTodoList([userInput, ...todoList]);
		setUserInput("");
	};

	const handleDelete = (todo) => {
		const updatedArr = todoList.filter(
			(todoItem) => todoList.indexOf(todoItem) != todoList.indexOf(todo)
		);

		setTodoList(updatedArr);
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

	const deleteCompletedTodos = () => {
		const newTodoList = todoList.filter((_, index) => {
			return !completedTodosIds.includes(index);
		});
		setTodoList([...newTodoList]);
		setCompletedTodosIds([]);
	};

	const handleEdit = (todo, idx) => {
		setEditState(true);
		setEditId(idx);
		setUserInput(todo);
	};

	const handleCancel = () => {
		setEditState(false);
		setEditId(null);
		setUserInput("");
	};

	const handleSave = () => {
		todoList[editId] = userInput;
		setTodoList([...todoList]);
		setEditState(false);
		setEditId(null);
		setUserInput("");
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
										onClick={(e) => handleClick(e, todo)}
										key={todo}
										className={
											completedTodosIds.includes(todo) &&
											"line-through"
										}
									>
										{todo}{" "}
									</span>

									<button
										className="bg-white text-black w-[70px] my-5 ml-2 rounded-lg"
										onClick={() => handleEdit(todo, idx)}
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
			<button
				className="bg-white text-black w-[200px]   rounded-lg"
				onClick={deleteCompletedTodos}
			>
				Delete completed tasks
			</button>
		</div>
	);
};

export default Index;
