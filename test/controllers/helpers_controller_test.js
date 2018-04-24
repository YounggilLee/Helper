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

    it('GET to /api/helpers finds helpers in a location', done => {
        const torontoHelper = Helper({
            email: 'toronto@test.com',
            geometry: { type: 'Point', coordinates:[-79.38, 43.65] }
            
        })
        const oakvilleHelper = Helper({
            email: 'oakville@test.com',
            geometry: { type: 'Point', coordinates: [-80.24, 43.54] }

        })

        Promise.all([torontoHelper.save(), oakvilleHelper.save()])
            .then(() => {
                request(app)
                    .get('/api/helpers?lng=-80&lat=43')
                    .end((err, res) => {
                        console.log(res)
                        assert(res.body.length === 2)
                        assert(res.body[0].email === 'oakville@test.com')
                        done()
                    })
            })
    })

})