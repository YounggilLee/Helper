const Helper = require('../models/helper')

module.exports = {
    greeting(req, res) {
       res.send({hi: 'there'})
    },

    index(req, res, next) {
        const { lng, lat } = req.query    

        Helper.geoNear(
            { type: 'Point' , coordinates: [lng, lat]},
            { spherical: true, maxDistance: 200000 }
        )
    },

    create(req, res, next) {            // "next" is to use middleware
       const helperProps = req.body       
       Helper.create(helperProps)
        .then(helper => res.send(helper))
        .catch(next)
    },

    edit(req, res, next) {            
       const helperId = req.params.id
       const helperProps = req.body

       Helper.findByIdAndUpdate({ _id: helperId }, helperProps)
        .then(() => Helper.findById({ _id: helperId }))
        .then(helper => res.send(helper))
        .catch(next)
    },

    delete(req, res, next) {
        const helperId = req.params.id

        Helper.findByIdAndRemove({ _id: helperId })
            .then(helper => res.status(204).send(helper))
            .catch(next)
    }

}