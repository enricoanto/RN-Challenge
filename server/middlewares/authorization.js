'use strict'
const {Todo} = require('../models')
const authorization = ((req, res, next) => {
    const id = req.params.id
    const userData = req.userData.id
    Todo.findByPk(id)
        .then(data => {
            if (!data) {
               throw({
                    name: 'Not Found Todo',
                   })
            } else if (userData !== data.UserId) {
                throw({
                    name: 'forbidden User'
                })
            } else {
                next()
            }
        })
        .catch(err => {
            next(err)
        })
})

module.exports = authorization