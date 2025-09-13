const { v4: uuidv4 } = require('uuid');

// In-memory storage for todos (replace with database in production)
let todos = [];

class Todo {
  constructor(title, description, userId) {
    this.id = uuidv4();
    this.title = title;
    this.description = description || '';
    this.completed = false;
    this.userId = userId;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  static create(todoData) {
    const todo = new Todo(todoData.title, todoData.description, todoData.userId);
    todos.push(todo);
    return todo;
  }

  static findAll() {
    return todos;
  }

  static findByUserId(userId) {
    return todos.filter(todo => todo.userId === userId);
  }

  static findById(id) {
    return todos.find(todo => todo.id === id);
  }

  static findByIdAndUserId(id, userId) {
    return todos.find(todo => todo.id === id && todo.userId === userId);
  }

  static updateById(id, userId, updateData) {
    const todoIndex = todos.findIndex(todo => todo.id === id && todo.userId === userId);
    
    if (todoIndex === -1) {
      return null;
    }

    const updatedTodo = {
      ...todos[todoIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    todos[todoIndex] = updatedTodo;
    return updatedTodo;
  }

  static deleteById(id, userId) {
    const todoIndex = todos.findIndex(todo => todo.id === id && todo.userId === userId);
    
    if (todoIndex === -1) {
      return null;
    }

    const deletedTodo = todos.splice(todoIndex, 1)[0];
    return deletedTodo;
  }

  static deleteAll() {
    todos = [];
  }

  static getCount() {
    return todos.length;
  }

  static getCountByUserId(userId) {
    return todos.filter(todo => todo.userId === userId).length;
  }
}

module.exports = Todo;