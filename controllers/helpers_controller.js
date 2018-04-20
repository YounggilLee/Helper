const Helper = require('../models/helper')

module.exports = {
    greeting(req, res) {
       res.send({hi: 'there'})
    },

    create(req, res) {
       const helperProps = req.body       
       Helper.create(helperProps)
        .then(helper => res.send(helper))
    }
}