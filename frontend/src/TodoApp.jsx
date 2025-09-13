import React, { useState, useEffect } from 'react'

import { useAuth } from './context/AuthContext.jsx'

const API_BASE_URL = '/api'

function TodoApp() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState({ title: '', description: '' })
  const [loading, setLoading] = useState(false)
  const { token } = useAuth()

  // Fetch todos from API
  const fetchTodos = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      setTodos(data)
    } catch (error) {
      console.error('Error fetching todos:', error)
    }
  }

  // Load todos when component mounts
  useEffect(() => {
    fetchTodos()
  }, [])

  // Add new todo
  const addTodo = async (e) => {
    e.preventDefault()
    if (!newTodo.title.trim()) return

    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newTodo)
      })
      const todo = await response.json()
      setTodos([...todos, todo])
      setNewTodo({ title: '', description: '' })
    } catch (error) {
      console.error('Error adding todo:', error)
    }
    setLoading(false)
  }

  // Toggle todo completion
  const toggleTodo = async (id, completed) => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ completed: !completed })
      })
      const updatedTodo = await response.json()
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo))
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setTodos(todos.filter(todo => todo.id !== id))
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h2>My Todos</h2>
      </div>
      
      {/* Add Todo Form */}
      <form onSubmit={addTodo} className="todo-form">
        <h3>Add New Todo</h3>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            placeholder="Todo title"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            placeholder="Description (optional)"
            value={newTodo.description}
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="submit-btn"
        >
          {loading ? 'Adding...' : 'Add Todo'}
        </button>
      </form>

      {/* Todo List */}
      <div className="todo-list">
        {todos.length === 0 ? (
          <p className="empty-state">No todos yet. Add one above!</p>
        ) : (
          todos.map(todo => (
            <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <div className="todo-content">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id, todo.completed)}
                  className="todo-checkbox"
                />
                <div className="todo-details">
                  <h4 className="todo-title">
                    {todo.title}
                  </h4>
                  {todo.description && (
                    <p className="todo-description">
                      {todo.description}
                    </p>
                  )}
                  <small className="todo-date">
                    Created: {new Date(todo.createdAt).toLocaleDateString()}
                  </small>
                </div>
                <div className="todo-actions">
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default TodoApp