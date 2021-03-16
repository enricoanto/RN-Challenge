const routerTodo = require('express').Router()
const TodoController = require('../controllers/todoController')
// const authorization = require('../middlewares/authorization')


routerTodo.post('/', TodoController.addTodo)
routerTodo.get('/', TodoController.listTodos)
routerTodo.get('/false', TodoController.listFalseTodos)
routerTodo.get('/:id',  TodoController.findById)
routerTodo.put('/:id',  TodoController.updateTodo)
routerTodo.patch('/:id',  TodoController.changeStatus)
routerTodo.delete('/:id',  TodoController.deleteTodo)

module.exports = routerTodo