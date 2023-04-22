import React, { useState } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';
import Notes from './components/Notes';
import Button from './components/Button';
import { FiPlus } from 'react-icons/fi';

function App() {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleAddTaskButtonClick = () => {
	let uniqueId = new Date().getTime().toString(36) + new Date().getUTCMilliseconds();
	let newTodoItem = {
	  id: uniqueId,
	  todo: '',
	  complete: false,
	};
	setTodos([newTodoItem, ...todos]);
	setEditingId(uniqueId); // Ajoutez cette ligne
  };

  return (
	<div className="container_parent">
	  <div className="container_all">
		<div className="container_todo">
		  <div className="title_container">
			<h1 className="title_todo">Tâches de la journée</h1>
		  </div>
		  <div className="button-todo">
			<div className="button"><Button onClick={handleAddTaskButtonClick} Icon={FiPlus} /></div>
			<TodoItem todos={todos} setTodos={setTodos} editingId={editingId} setEditingId={setEditingId} />
		</div>
		</div>
		<div className="container_notes">
			<h1 className="title_notes">Prise de note</h1>
			<div className="cont-notes">
		  		<Notes />
			</div>
		</div>
	  </div>
	</div>
  );
}

export default App;
