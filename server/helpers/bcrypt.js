const bcrypt = require('bcryptjs')

const hashPassword = (input => {
    console.log(input)
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(input, salt);
    return hash
})

const compare = ((password, hash) => {
    return bcrypt.compareSync(password, hash)
})

module.exports = {
    hashPassword,
    compare
}