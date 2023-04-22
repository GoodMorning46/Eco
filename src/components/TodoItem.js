import React, { useState, useEffect } from 'react';
import './css/TodoItem.css';
import { RiCheckboxFill } from 'react-icons/ri';
import { TiDelete } from 'react-icons/ti';
import { RiCheckboxBlankLine } from 'react-icons/ri';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TodoItem = ({ todos, setTodos, editingId, setEditingId }) => {
  const [completedTasks, setCompletedTasks] = useState('');
  const [editingValue, setEditingValue] = useState('');

  const deleteTodo = (id) => {
    let newTodos = todos.filter((todo) => todo.id !== id);
    setTodos([...newTodos]);
  };

  const toggleComplete = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, complete: !todo.complete };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
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

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodos(items);
  };

  const togglePriority = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, priority: !todo.priority };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };


  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    if (todos) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="app-container">
      <div className="header-section">
        <div className="app-form-container">
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
                          <div className="top-section">
                            <div
                              className="icon"
                              onClick={() => toggleComplete(id)}
                            >
                              {!complete ? (
                                <RiCheckboxBlankLine />
                              ) : (
                                <RiCheckboxFill
                                  className={complete ? 'icon-done' : ''}
                                />
                              )}
                            </div>
                            {!isEditing ? (
                              <p
                                className={`text-left ${complete ? 'text-done' : ''}`}
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
                                onKeyDown={(e) => e.key === 'Enter' && saveEdit(id)}
                                onBlur={() => saveEdit(id)}
                                autoFocus
                              />
                            )}
                            <TiDelete
                              onClick={() => deleteTodo(id)}
                              className="icon delete-icon"
                            />
                          </div>
                          <div className="priority-container">
                            <button
                              className={`priority-btn ${todoItem.priority ? 'active' : ''}`}
                              onClick={() => togglePriority(id)}
                            >
                              Prioritaire
                            </button>
                          </div>
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
