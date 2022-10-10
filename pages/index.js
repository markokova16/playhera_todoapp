import { useState } from "react";

const Index = () => {
	const [userInput, setUserInput] = useState("");
	const [todoList, setTodoList] = useState([]);
	const [completedTodosIds, setCompletedTodosIds] = useState([]);

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

	return (
		<div className="flex flex-col  h-screen items-center ">
			<h1 className="my-20   text-8xl font-extrabold text-red-700 ">
				Next.js ToDo List
			</h1>
			<form>
				<input
					className="text-white text-center border-black border-10 bg-black ml-14 mr-5 w-[500px]"
					type="text"
					onChange={handleChange}
					value={userInput}
					placeholder="Enter your task"
				/>
				<button
					className="bg-red-300 text-black w-[70px] rounded-lg"
					onClick={handleSubmit}
					disabled={!userInput}
				>
					Submit
				</button>
			</form>

			<ul className="my-5 ">
				{todoList.length >= 1
					? todoList.map((todo, idx) => {
							return (
								<li
									onClick={(e) => handleClick(e, idx)}
									key={idx}
								>
									<span
										className={
											completedTodosIds.includes(idx) &&
											"line-through"
										}
									>
										{todo}{" "}
									</span>
									<button
										className="bg-black text-white w-[70px] my-5 ml-2 rounded-lg"
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
					: "What's your task?"}
			</ul>
			<button
				className="bg-black text-white w-[200px]   rounded-lg"
				onClick={deleteCompletedTodos}
			>
				Delete completed tasks
			</button>
		</div>
	);
};

export default Index;
