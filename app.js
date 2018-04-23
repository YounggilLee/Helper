const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes/routes')
const app = express()

mongoose.Promise = global.Promise
if(process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost/helper') 
}

// make sure the order of middleware execution
app.use(bodyParser.json())  //1
routes(app)                 //2

app.use((err, req, res, next) => {  //3
    //console.log(err)
    res.status(422).send({ error: err.message })
})

module.exports = app