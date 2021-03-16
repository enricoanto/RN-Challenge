const router = require('express').Router()
const authentication = require('../middlewares/authentication')
const routerTodo = require('./todo')
const routerUser = require('./user')
const RestaurantController = require('../controllers/apiController')
router.use(routerUser)

router.use(authentication)
router.use('/todos', routerTodo)
router.use('/restaurant', RestaurantController.fetchRestaurants)


module.exports = router
