import React, { useState } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';
import Notes from './components/Notes';
import Button from './components/Button';
import { FiPlus } from 'react-icons/fi';
import FloatingButton from './components/FloatingButton';

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
    setEditingId(uniqueId);
  };

  return (
    <div className="container_parent">
      <div className="container_all">
        <div className="container_notes">
          <div className="cont-notes">
            <Notes />
          </div>
        </div>
        <div className="container_todo">
          <div className="title_container"></div>
          <div className="button-todo">
  <div className="todo-header"> {/* Ajout de cette div pour englober le titre et le bouton */}
    <h2 className="todo-title">Tâche en cours</h2> 
    <div className="button">
      <Button onClick={handleAddTaskButtonClick} Icon={FiPlus} />
    </div>
  </div>
  <div className="line"></div> {/* Ajout de la div pour la ligne */}
            <TodoItem
              todos={todos}
              setTodos={setTodos}
              editingId={editingId}
              setEditingId={setEditingId}
            />
          </div>
        </div>
      </div>
      {/* Ajout du composant FloatingButton ici */}
      <FloatingButton />
    </div>
  );
}

export default App;