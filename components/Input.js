import axios from "../api/axios";

const Input = (props) => {
	const ADDTASK_URL = "/unicorns/";
	const UPDATE_URL = `/unicorns/${props.todoId}`;

	// ADD NEW TASK
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				ADDTASK_URL,
				JSON.stringify({
					name: props.userInput,
				}),
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			console.log(response.data);
			props.setUpdate(true);
			props.setUserInput("");
		} catch (err) {
			console.log(err.message);
		}
	};

	// UPDATE TASK
	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.put(
				UPDATE_URL,
				JSON.stringify({
					name: props.userInput,
				}),
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			console.log(response.data);
			props.setUpdate(true);
			props.setEditState(false);
			props.setUserInput("");
		} catch (err) {
			console.log(err.message);
		}
	};

	const handleCancel = () => {
		props.setEditState(false);
		props.setUserInput("");
	};

	const handleChange = (e) => {
		e.preventDefault();
		props.setUserInput(e.target.value);
	};

	return (
		<form className="flex flex-col place-items-center md:flex md:flex-row">
			<input
				className="text-black text-center border-black border-10 bg-white ml-14 mr-5 w-[500px]"
				type="text"
				onChange={handleChange}
				value={props.userInput}
				placeholder="Enter your task"
			/>
			{props.editState ? (
				<div className="flex ">
					<button
						className="bg-white text-black w-[70px] rounded-lg px-5 mr-2"
						type="button"
						onClick={handleUpdate}
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
					className="bg-white text-black w-[70px] my-3 rounded-lg hover:bg-blue-800 hover:text-white hover:animate-pulse"
					onClick={handleSubmit}
					disabled={!props.userInput}
				>
					Submit
				</button>
			)}
		</form>
	);
};

export default Input;
