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
})