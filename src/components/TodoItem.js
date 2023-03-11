import React, { useState, useEffect } from 'react';
import "./css/TodoItem.css";
import { MdCheckBox } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';

const App = () => {
	const [todos, setTodos] = useState([]);
	const [todoItem, setTodoItem] = useState('');
	const [error, setError] = useState(false);
	const [completedTasks, setCompletedTasks] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (todoItem) {
			setError(false);
			let uniqueId =
				new Date().getTime().toString(36) + new Date().getUTCMilliseconds();
			let newTodoItem = {
				id: uniqueId,
				todo: todoItem,
				complete: false,
			};
			setTodos([newTodoItem, ...todos]);
			setTodoItem('');
		} else {
			setError(true);
			setTodoItem('');
		}
	};

	const deleteTodo = (id) => {
		let newTodos = todos.filter((todo) => todo.id !== id);
		setTodos([...newTodos]);
	};

	const toggleComplete = (id) => {
		todos.find((todo) => {
			if (todo.id === id) {
				todo.complete = !todo.complete;
			}
			return setTodos([...todos]);
		});
	};

	useEffect(() => {
		let completeArray = [];
		todos.filter((todo) => todo.complete === true && completeArray.push(todo));
		setCompletedTasks(completeArray.length);
	}, [todos]);

	useEffect(() => {
		const todos = JSON.parse(localStorage.getItem('todos'));
		if (todos) {
			setTodos(todos);
		}
	}, []);

	useEffect(() => {
		let adderror = setTimeout(() => {
			setError(false);
		}, 2000);
		return () => {
			clearTimeout(adderror);
		};
	}, [error]);

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	//Pour afficher la date d'aujourd'hui
	// let Today = new Date().toLocaleDateString('en-us', { weekday: 'long' });
	// let day = new Date().toLocaleDateString('en-us', { day: 'numeric' });
	// let month = new Date().toLocaleDateString('en-us', { month: 'short' });

	return (
		<div className="app-container">
			<div className="header-section">
				
				{/* <h4 className="date">
					{`${Today},`} <span>{`${day} ${month}`}</span>
				</h4> */}
				<div className="app-form-container">
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							value={todoItem}
							className={error ? 'error' : ''}
							onChange={(e) => setTodoItem(e.target.value)}
							placeholder="Ecrire une tâche"
						/>
						
					</form>
				</div>
				{/* <div className="data-card-container">
					<div className="data-card">
						<h5>{todos.length < 10 ? `0${todos.length}` : todos.length}</h5>
						<p>Created tasks</p>
					</div>
					<div className="data-card">
						<h5>
							{completedTasks < 10 ? `0${completedTasks}` : completedTasks}
						</h5>
						<p>Completed tasks</p>
					</div>
				</div> */}
			</div>
			<div className="todo-container">
				{todos.map((todoItem) => {
					const { id, todo, complete } = todoItem;
					return (
						<div key={id} className="todo-card">
							<div className="icon" onClick={() => toggleComplete(id)}>
								{!complete ? (
									<MdCheckBoxOutlineBlank />
								) : (
									<MdCheckBox
										className={complete ? 'icon-done' : ''}
									/>
								)}
							</div>
							<p className={`text-left ${complete ? 'text-done' : ''}`}>{todo}</p>
							<TiDelete
								onClick={() => deleteTodo(id)}
								className="icon delete-icon"
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default App;
