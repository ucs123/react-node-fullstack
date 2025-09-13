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
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>My Todos</h2>
      
      {/* Add Todo Form */}
      <form onSubmit={addTodo} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h3>Add New Todo</h3>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Todo title"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            style={{ width: '100%', padding: '8px', fontSize: '14px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <textarea
            placeholder="Description (optional)"
            value={newTodo.description}
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            style={{ width: '100%', padding: '8px', fontSize: '14px', minHeight: '60px' }}
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            backgroundColor: '#007bff', 
            color: 'white', 
            padding: '8px 16px', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: loading ? 'not-allowed' : 'pointer' 
          }}
        >
          {loading ? 'Adding...' : 'Add Todo'}
        </button>
      </form>

      {/* Todo List */}
      <div>
        {todos.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>No todos yet. Add one above!</p>
        ) : (
          todos.map(todo => (
            <div key={todo.id} style={{ 
              border: '1px solid #ddd', 
              borderRadius: '5px', 
              padding: '15px', 
              marginBottom: '10px',
              backgroundColor: todo.completed ? '#f8f9fa' : 'white'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id, todo.completed)}
                  style={{ marginTop: '2px' }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ 
                    margin: '0 0 5px 0', 
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#666' : 'black'
                  }}>
                    {todo.title}
                  </h4>
                  {todo.description && (
                    <p style={{ 
                      margin: '0 0 10px 0', 
                      color: '#666',
                      textDecoration: todo.completed ? 'line-through' : 'none'
                    }}>
                      {todo.description}
                    </p>
                  )}
                  <small style={{ color: '#999' }}>
                    Created: {new Date(todo.createdAt).toLocaleDateString()}
                  </small>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  style={{ 
                    backgroundColor: '#dc3545', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px', 
                    padding: '4px 8px', 
                    cursor: 'pointer' 
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default TodoApp