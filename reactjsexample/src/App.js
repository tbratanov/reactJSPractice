import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import ToDoList from './ToDoList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todosApp.todos'

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) {
      setTodos(storedTodos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos])

  function toggleTodos(id) {
    const newList = [...todos];
    const todo = newList.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newList);
  }
  function handleAddTodo() {
    const name = todoNameRef.current.value;
    if (name === '') {
      return
    }
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null;
  }

  function handleClearTodos() {
   const newTodos = todos.filter(todo => !todo.complete)
   setTodos(newTodos)
  }
  return (
    <>
      <ToDoList todos={todos} toggleTodos={toggleTodos} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add ToDoList</button>
      <button onClick={handleClearTodos}>Clear Completed Todos</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
