import TodoContext from './TodoContext';
import { useState } from 'react';

const TodoState = (props) => {
	const host = "https://auth-server-rhgs.onrender.com";

	const todosInitial = [];

	const [todos, setTodos] = useState(todosInitial);

	//  Get all  Todos
	const getTodos = async () => {
		// API call
		const response = await fetch(`${host}/api/todos/fetchalltodos`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmNzMwZTk3Mzc5Njc5NTcxYWNiM2FkIn0sImlhdCI6MTY3NzE0NDI5N30.0p79XsJz9t6afaapVZxB1_uu-wUYd0zPTx17blkKPt8",
			},
		});
		const json = await response.json();
		// console.log(json);
		setTodos(json);
	};

	//  Add a Todo
	const addTodo = async (title, description, tag) => {
		// API call
		const response = await fetch(`${host}/api/todos/addtodo`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmNzMwZTk3Mzc5Njc5NTcxYWNiM2FkIn0sImlhdCI6MTY3NzE0NDI5N30.0p79XsJz9t6afaapVZxB1_uu-wUYd0zPTx17blkKPt8",
			},
			body: JSON.stringify({ title, description, tag }),
		});
		const todo = await response.json();
		setTodos(todos.concat(todo));
	};
	// Delete a Todo
	const deleteTodo = async (id) => {
		// API call / delete from server side
		const response = await fetch(`${host}/api/todos/deletetodo/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmNzMwZTk3Mzc5Njc5NTcxYWNiM2FkIn0sImlhdCI6MTY3NzE0NDI5N30.0p79XsJz9t6afaapVZxB1_uu-wUYd0zPTx17blkKPt8",
			},
		});
		const json = response.json();
		console.log(json);

		// Delete from client side
		// console.log('Deleting the todo with id' + id);
		const newTodos = todos.filter((todo) => {
			return todo._id !== id;
		});
		setTodos(newTodos);
	};

	// Edit a Todo in client side
	const editTodo = async (id, title, description, tag) => {
		// API call
		const response = await fetch(`${host}/api/todos/updatetodo/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmNzMwZTk3Mzc5Njc5NTcxYWNiM2FkIn0sImlhdCI6MTY3NzE0NDI5N30.0p79XsJz9t6afaapVZxB1_uu-wUYd0zPTx17blkKPt8",
			},
			body: JSON.stringify({ title, description, tag }),
		});
		const json = await response.json();
		console.log(json);

		// Logic to edit in client/server side
		let newTodos = JSON.parse(JSON.stringify(todos)); // TI will make A deep copy

		for (let index = 0; index < newTodos.length; index++) {
			const element = newTodos[index];
			if (element._id === id) {
				newTodos[index].title = title;
				newTodos[index].description = description;
				newTodos[index].tag = tag;
				break;
			}
		}
		setTodos(newTodos);
	};

	return (
		<TodoContext.Provider
			value={{ todos, addTodo, deleteTodo, editTodo, getTodos }}
		>
			{props.children}
		</TodoContext.Provider>
	);
};

export default TodoState;
