const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../app')

const Helper = mongoose.model('helper')

describe('Helpers controller', () => {
    it(' POST to /api/helpers create a new helper', (done) => {
        Helper.count().then(count => {
            request(app)
                .post('/api/helpers')
                .send({ email: 'test@test.com' })
                .end(() => {                    
                    Helper.count().then(newCount => {
                        assert(count + 1 === newCount)
                        done()
                    })                   
                })

        })

    })

    it('PUT to /api/helpers/id edits an existing helper', (done) => {
        const helper = new Helper({ email: 't@t.com', helping: false })

        helper.save().then(() => {
            request(app)
             .put('/api/helpers' + helper._id)
             .send({ helping : true })
             .end(() => {
                 Helper.findOne({email: 't@t.com' })
                 .then(helper => {
                     assert(helper.helping === true )
                     done()
                 })
             })
        })
    })

    it('DELETE to /api/helpers/id can delete a helper', (done) => {
        const helper = new Helper({ email: 't@t.com', helping: false })

        helper.save().then(() => {
            request(app)
                .delete('/api/helpers' + helper._id)
                .send({ helping: true })
                .end(() => {
                    Helper.findOne({ email: 't@t.com' })
                        .then(helper => {
                            assert(helper === null)
                            done()
                        })
                })
        })
    })

})