const request = require('supertest');
const app = require('../app');

describe('Calling GET /users', function(){
    it('respond with 200', function(done) {
        request(app).get('/users').expect(200, done)
    });
});