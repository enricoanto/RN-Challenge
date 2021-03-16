const router = require('express').Router()
const authentication = require('../middlewares/authentication')
const routerTodo = require('./todo')
const routerUser = require('./user')
router.use(routerUser)

router.use(authentication)
router.use('/todos', routerTodo)



module.exports = router
