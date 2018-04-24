const HelpersController = require('../controllers/helpers_controller')

module.exports = (app) => {

    // Watch for incoming requests of method GET 
    // to the route http://localhost: 3050/api
    app.get('/api', HelpersController.greeting)

    app.post('/api/helpers', HelpersController.create)

    app.put('/api/helpers:id', HelpersController.edit)

    app.delete('/api/helpers:id', HelpersController.delete)

    app.get('/api/helpers', HelpersController.index)
}