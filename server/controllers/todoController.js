const { Todo, User } = require('../models')

class TodoController {
    static async addTodo(req, res, next) {
        const newTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.userData.id
        }
        try {
            const newData = await Todo.create(newTodo)
            res.status(201).json(newData)
        } catch (err) {
            next(err)
        }
    }
    static async listTodos(req, res, next) {
        try {
            const data = await Todo.findAll({
                order: [['id', 'ASC']],
                where: {
                    UserId: req.userData.id
                }
            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }
    static async listFalseTodos(req, res, next) {
        try {
            const data = await Todo.findAll({
                order: [['id', 'ASC']],
                where: {
                    status: false
                }
            })
            console.log(data)
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }
    static async findById(req, res, next) {
        const id = req.params.id
        try {
            const data = await Todo.findByPk(id)
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }
    static async updateTodo(req, res, next) {
        const id = req.params.id
        const changeTodo = {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date
        }
        try {
            const data = await Todo.update(changeTodo, {
                where: {
                    id: id
                },
                returning: true
            })
            res.status(200).json(data[1][0])
        } catch (err) {
            next(err)
        }
    }
    static async changeStatus(req, res, next) {
        const id = req.params.id
        const newStatus = {
            status: req.body.status,
        }
        try {
            if (newStatus.status === 'true') {
                newStatus.status = true
            } else if (newStatus.status === 'false') {
                newStatus.status = false
            } else {
                next({ name: 'validation boolean' })
            }
            console.log(newStatus.status)
            const data = await Todo.update(newStatus, {
                where: {
                    id: id
                },
                returning: true
            })
            res.status(200).json({ status: data[1][0].status })
        } catch (err) {
            next(err)
        }
    }
    static async deleteTodo(req, res, next) {
        const id = +req.params.id
        try {
            const data = await Todo.destroy({
                where: {
                    id: id
                }
            })
            if (data === 1) {
                res.status(200).json({
                    message: "todo success to deleted"
                })
            }
            else {
                throw ({
                    "message": "Not Found Todo"
                })
            }
        } catch (err) {
            next(err)
        }
    }
}
module.exports = TodoController