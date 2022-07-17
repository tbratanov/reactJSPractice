import React from 'react'
import ToDoComponent from './ToDoComponent'

export default function ToDoList({ todos, toggleTodos}) {
    return (
        todos.map(todo => {
            return <ToDoComponent key={todo.id} todo={todo} toggleTodos={toggleTodos}/>
        })
    )
}
