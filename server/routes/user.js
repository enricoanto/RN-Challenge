const routerUser = require('express').Router()
const UserController = require('../controllers/userController')

routerUser.post('/register', UserController.register)
routerUser.post('/login', UserController.login)
routerUser.post('/googleLogin', UserController.googleLogin)
module.exports = routerUser