const mongoose = require('mongoose')

before(done => {
    mongoose.connect('mongodb://localhost/helper_test')
    mongoose.connection
     .once('open', () => done())
     .on('error', err => {
         console.warn('Warning', error)
     })
})

beforeEach(done => {
    const { helpers } = mongoose.connection.collections
    helpers.drop()
     .then(() => done())
     .catch(() => done())  //to prevent an error from first execute the test enviroment;there is no hepers data for the first time 
}) 