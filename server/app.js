if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
const router = require('./routes')
const app = express()
const port = process.env.PORT || 3000
const errorHandlers = require('./middlewares/errorHandlers')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(router)
app.use(errorHandlers)
app.get('/', (req,res,next)=> {
    res.status(200).json({name: 'bisa'})
})
app.listen(port,()=>
console.log('listen',+port))
