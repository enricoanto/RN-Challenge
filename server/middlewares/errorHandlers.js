'use strict'

const errorHandlers = ((err, req, res, next) => {
    let array = []
    switch (err.name) {
        case 'SequelizeValidationError':
            err.errors.forEach(el => {
                array.push(el.message)
            })
            res.status(400).json({
                "name": "SequelizeValidationError",
                "message": array
            })
            break
        case 'validation boolean':
            res.status(400).json({
                "name": "validation boolean",
                "message": "Status must be in boolean."
            })
            break
        case 'SequelizeUniqueConstraintError':
            res.status(400).json({
                "name": "validation email",
                "message": "Email already exists."
            })
            break
        case 'Empty Email':
            res.status(400).json({
                "name": "Empty Email",
                "message": "Email must be filled."
            })
            break
        case 'Empty Password':
            res.status(400).json({
                "name": "Empty Password",
                "message": "Password must be filled."
            })
            break
        case 'Unauthorized':
            res.status(401).json({
                name: 'Unauthorized',
                message: 'Email/password is wrong.'
            })
            break
        case 'JsonWebTokenError':
            res.status(401).json({
                name: 'JsonWebTokenError',
                message: 'token invalid.'
            })
            break
        case 'Not Found User':
            res.status(403).json({
                name: 'Not Found User',
                message: 'User not found.'
            })
            break
        case 'forbidden User':
            res.status(403).json({
                name: 'forbidden User',
                message: `You don't have access`
            })
            break
        case 'Not Found Todo':
            res.status(404).json({
                name: 'Not Found Todo',
                message: 'Todo not found.'
            })
            break
        case 'Not Found User':
            res.status(404).json({
                name: 'Not Found User',
                message: 'User not found.'
            })
            break
        default:
            res.status(500).json({
                name: err.name,
                message: err.message
            })
            break
    }
})
module.exports = errorHandlers