const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for todos
let todos = [];

// GET /api/todos - Get all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// GET /api/todos/:id - Get a specific todo
app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === req.params.id);
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  res.json(todo);
});

// POST /api/todos - Create a new todo
app.post('/api/todos', (req, res) => {
  const { title, description } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTodo = {
    id: uuidv4(),
    title,
    description: description || '',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT /api/todos/:id - Update a todo
app.put('/api/todos/:id', (req, res) => {
  const todoIndex = todos.findIndex(t => t.id === req.params.id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  const { title, description, completed } = req.body;
  const updatedTodo = {
    ...todos[todoIndex],
    ...(title !== undefined && { title }),
    ...(description !== undefined && { description }),
    ...(completed !== undefined && { completed }),
    updatedAt: new Date().toISOString()
  };

  todos[todoIndex] = updatedTodo;
  res.json(updatedTodo);
});

// DELETE /api/todos/:id - Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  const todoIndex = todos.findIndex(t => t.id === req.params.id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  const deletedTodo = todos.splice(todoIndex, 1)[0];
  res.json(deletedTodo);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Todo API server running on http://0.0.0.0:${PORT}`);
});