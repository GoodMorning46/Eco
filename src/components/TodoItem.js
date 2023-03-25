import React, { useState, useEffect } from 'react';
import './css/TodoItem.css';
import { MdCheckBox } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TodoItem = () => {
  const [todos, setTodos] = useState([]);
  const [todoItem, setTodoItem] = useState('');
  const [error, setError] = useState(false);
  const [completedTasks, setCompletedTasks] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState('');

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
      return setTodos(sortTodos([...todos]));
    });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodos(items);
  };

  const sortTodos = (todos) => {
    return todos.sort((a, b) => a.complete - b.complete);
  };

  const toggleEdit = (id, currentValue) => {
    setEditingId(id);
    setEditingValue(currentValue);
  };


  const saveEdit = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.todo = editingValue;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditingId(null);
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

  return (
    <div className="app-container">
      <div className="header-section">
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
      </div>
      <div className="todo-container">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="todos">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {todos.map((todoItem, index) => {
                  const { id, todo, complete } = todoItem;
                  const isEditing = editingId === id;

                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="todo-card"
                        >
                          <div
                            className="icon"
                            onClick={() => toggleComplete(id)}
                          >
                            {!complete ? (
                              <MdCheckBoxOutlineBlank />
                            ) : (
                              <MdCheckBox
                                className={complete ? 'icon-done' : ''}
                              />
                            )}
                          </div>
                          {!isEditing ? (
                            <p
                              className={`text-left ${
                                complete ? 'text-done' : ''
                              }`}
                              onClick={() => toggleEdit(id, todo)}
                            >
                                <span>{todo}</span>

                            </p>
                          ) : (
                            <input
                              type="text"
                              value={editingValue}
                              className="edit-input"
                              onChange={(e) => setEditingValue(e.target.value)}
                              onKeyDown={(e) =>
                                e.key === 'Enter' && saveEdit(id)
                              }
                              onBlur={() => saveEdit(id)}
                            />
                          )}
                          <TiDelete
                            onClick={() => deleteTodo(id)}
                            className="icon delete-icon"
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default TodoItem;

