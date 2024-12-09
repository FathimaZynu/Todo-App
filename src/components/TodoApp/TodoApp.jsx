import React from 'react'
import './TodoApp.css';
import { useState } from 'react';
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { AiOutlineDelete } from 'react-icons/ai';

function TodoApp() {

    let [todo, setTodo] = useState('')
    let [todos, setTodos] = useState([])
    let [editId, setEditId] = useState(0)

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    function addTodo() {
        if (todo !== '') {
            setTodos([...todos, { list: todo, id: Date.now(), status: false }])
            console.log(todos);
            setTodo('')
        }
        if (editId) {
            let editTodo = todos.find((todo) => todo.id === editId)
            let updateTodo = todos.map((to) => to.id === editTodo.id
                ? (to = { id: to.id, list: todo })
                : (to = { id: to.id, list: to.list }))
            setTodos(updateTodo)
            setEditId(0);
            setTodo('');
        }
    }

    function onDelete(id) {
        setTodos(todos.filter((to) => to.id !== id))
    }

    function onComplete(id) {
        let complete = todos.map((list) => {
            if (list.id === id) {
                return ({ ...list, status: !list.status })
            }
            return list
        })
        setTodos(complete)
    }

    function onEdit(id) {
        let editTodo = todos.find((to) => to.id === id)
        console.log(editTodo.list);
        setTodo(editTodo.list)
        setEditId(editTodo.id)
    }

    return (
        <div className='todo-container'>


            <form className='input-section' onSubmit={handleSubmit}>
                <h1>Todo App</h1>
                <input type="text" value={todo} placeholder='Enter items' onChange={(event) => setTodo(event.target.value)} />
                <button onClick={addTodo} >{editId ? 'EDIT' : 'ADD'}</button>
            </form>

            <div>
                <ul>
                    {todos.map((to) => (
                        <li key={todo.id} className='list-items'>
                            <div className='list-item-list' id={to.status ? 'list-item' : ''}>{to.list}</div>

                            <span>
                                <IoMdDoneAll className='list-icons' id='complete' title='Complete' onClick={() => onComplete(to.id)} />
                                <FiEdit className='list-icons' id='edit' title='Edit' onClick={() => onEdit(to.id)} />
                                <MdDelete className='list-icons' id='delete' title='Delete' onClick={() => onDelete(to.id)} />
                            </span>
                        </li>
                    ))}

                </ul>
            </div>



        </div>
    )
}

export default TodoApp