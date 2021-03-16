const jwt = require('jsonwebtoken')

const signToken = (input => {
    const token = jwt.sign(input, process.env.SECRET)
    return token
})
const verifyToken = (token => {
    return jwt.verify(token, process.env.SECRET)
})

module.exports = {
    signToken,
    verifyToken
}