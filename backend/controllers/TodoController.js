const Todo = require('../models/Todo');

class TodoController {
  
  // GET /api/todos - Get all todos for authenticated user
  static async getAllTodos(req, res) {
    try {
      const userId = req.user.id;
      const todos = Todo.findByUserId(userId);
      res.json(todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // GET /api/todos/:id - Get a specific todo
  static async getTodoById(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      
      const todo = Todo.findByIdAndUserId(id, userId);
      
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      
      res.json(todo);
    } catch (error) {
      console.error('Error fetching todo:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // POST /api/todos - Create a new todo
  static async createTodo(req, res) {
    try {
      const { title, description } = req.body;
      const userId = req.user.id;
      
      // Validation
      if (!title || !title.trim()) {
        return res.status(400).json({ error: 'Title is required' });
      }

      const todoData = {
        title: title.trim(),
        description: description?.trim() || '',
        userId
      };

      const newTodo = Todo.create(todoData);
      
      res.status(201).json(newTodo);
    } catch (error) {
      console.error('Error creating todo:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // PUT /api/todos/:id - Update a todo
  static async updateTodo(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const { title, description, completed } = req.body;
      
      // Prepare update data
      const updateData = {};
      if (title !== undefined) updateData.title = title.trim();
      if (description !== undefined) updateData.description = description.trim();
      if (completed !== undefined) updateData.completed = Boolean(completed);
      
      const updatedTodo = Todo.updateById(id, userId, updateData);
      
      if (!updatedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      
      res.json(updatedTodo);
    } catch (error) {
      console.error('Error updating todo:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // DELETE /api/todos/:id - Delete a todo
  static async deleteTodo(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      
      const deletedTodo = Todo.deleteById(id, userId);
      
      if (!deletedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      
      res.json(deletedTodo);
    } catch (error) {
      console.error('Error deleting todo:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // GET /api/todos/stats - Get todo statistics for user
  static async getTodoStats(req, res) {
    try {
      const userId = req.user.id;
      const userTodos = Todo.findByUserId(userId);
      
      const stats = {
        total: userTodos.length,
        completed: userTodos.filter(todo => todo.completed).length,
        pending: userTodos.filter(todo => !todo.completed).length,
        completionRate: userTodos.length > 0 ? 
          Math.round((userTodos.filter(todo => todo.completed).length / userTodos.length) * 100) : 0
      };
      
      res.json(stats);
    } catch (error) {
      console.error('Error fetching todo stats:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = TodoController;