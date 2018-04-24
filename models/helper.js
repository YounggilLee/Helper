const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PointSchema = new Schema({
    type: { type: String, default: 'Point'},
    coodinates: { type: [Number], index: '2dsphere' }
})

const HelperSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    helping: {
        type: Boolean,
        default: false
    },
    geometry: PointSchema
})

const Helper = mongoose.model('helper', HelperSchema)

module.exports = Helper