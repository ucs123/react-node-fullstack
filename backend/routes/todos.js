const express = require('express');
const TodoController = require('../controllers/TodoController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Apply authentication middleware to all todo routes
router.use(authenticateToken);

// Todo routes
router.get('/', TodoController.getAllTodos);
router.get('/stats', TodoController.getTodoStats);
router.get('/:id', TodoController.getTodoById);
router.post('/', TodoController.createTodo);
router.put('/:id', TodoController.updateTodo);
router.delete('/:id', TodoController.deleteTodo);

module.exports = router;