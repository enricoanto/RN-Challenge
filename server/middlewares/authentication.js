'use strict'
const { User } = require("../models/index.js")
const { verifyToken } = require("../helpers/jwt")

const authentication = ((req, res, next) => {
    const decoded = verifyToken(req.headers.access_token)
    User.findOne({
        where: {
            email: decoded.email
        }
    })
        .then(data => {
            if (!data) {
                throw({
                    name: 'Not Found User',
                })
            } else {
                req.userData = data
                next()
            }
        })
        .catch(err => {
            next(err)
        })
})

module.exports = authentication