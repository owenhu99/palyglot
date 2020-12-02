const request = require('supertest');
const app = require('../app');

describe('Loading express server', function(){
    it('respond with 200', function(done) {
        request(app).get('/').expect(200, done)
    });
});