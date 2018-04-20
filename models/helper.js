const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HelperSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    helping: {
        type: Boolean,
        default: false
    },
    location:{

    }
})

const Helper = mongoose.model('helper', HelperSchema)

module.exports = Helper