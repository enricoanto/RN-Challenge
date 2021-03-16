const { compare } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { User } = require('../models')
const { OAuth2Client } = require('google-auth-library');

class UserController {
    static async register(req, res, next) {
        const newUser = {
            email: req.body.email,
            password: req.body.password
        }
        try {
            const data = await User.create(newUser)
            res.status(201).json(data)
        } catch (err) {
            next(err)
        }
    }
    static async login(req, res, next) {
        const account = {
            email: req.body.email,
            password: req.body.password
        }
        try {
            if (!account.email) {
                next({ name: "Empty Email" })
            } else if (!account.password) {
                next({ name: "Empty Password" })
            } else {

                const data = await User.findOne({
                    where: {
                        email: account.email
                    }
                })
                if (!data) {
                    throw ({
                        name: 'Unauthorized',

                    })
                }
                else if (!compare(account.password, data.password)) {
                    throw ({
                        name: 'Unauthorized',
                    })
                }
                else {
                    let access_token = signToken({
                        id: data.id,
                        email: data.email
                    })
                    res.status(200).json({
                        id: data.id,
                        email: data.email,
                        access_token: access_token
                    })
                }
            }
        } catch (err) {
            next(err)
        }
    }
    static googleLogin(req, res, next) {
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let email = ''
        client.verifyIdToken({
            idToken: req.headers.google_access_token,
            audience: process.env.CLIENT_ID
        })
            .then(result => {
                let payload = result.getPayload()
                email = payload['email']
                return User.findOne({ where: { email: email } })
            })
            .then(data => {
                if (!data) {
                    var newUser = {
                        email: email,
                        password: 'randompassword'
                    }
                    return User.create(newUser)
                } else {
                    return data
                }
            })
            .then(user => {
                const access_token = signToken({ id: user.id, email: user.email })
                return res.status(201).json({ access_token })
            })
            .catch(err => {
                console.log(err)
            })
    }

}

module.exports = UserController