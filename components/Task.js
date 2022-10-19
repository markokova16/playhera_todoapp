import { useState } from 'react'
import axios from '../api/axios';

const Task = (props) => {
    const DELETE_URL = `/unicorns/${props.task._id}`

    const [line, setLine] = useState(false)

    // DELETE TASK
    const handleDelete = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.delete(
                DELETE_URL
            );
            console.log(response.data);
            props.setUpdate(true);
        } catch (err) {
            console.log(err.message);
        }
    };

    const handleEdit = () => {
        props.setEditState(true);
        props.setUserInput(props.task.name);
        props.setTodoId(props.task._id)
    }

    const handleStyle = () => {
        setLine((prev) => !prev)
    }

    return (
        <div className="text-white">
            <span
                className={line ? 'line-through' : null}
                onClick={handleStyle}
            >
                {props.task.name}{" "}
            </span>

            <button
                className="bg-white text-black w-[70px] my-5 ml-2 rounded-lg"
                onClick={handleEdit}
            >
                Edit
            </button>

            <button
                className="bg-white text-black w-[70px] my-5 ml-2 rounded-lg hover:bg-red-700 hover:text-white"
                onClick={handleDelete}
            >
                Delete
            </button>
        </div>
    )
}

export default Task