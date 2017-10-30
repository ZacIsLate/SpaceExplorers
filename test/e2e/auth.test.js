const request = require('./request');
const { assert } = require('chai');
const db = require('./db');

describe('Authentication API', () => {

    beforeEach( () =>db.drop());
    let token = null;

    beforeEach( ()=> {
        return request.post('/api/auth/signup')
            .send({name: 'Tester', password: '007'})
            .then( ({body}) => {
                token = body.token;
            });
    });

    it('should give a token on signup', () => {
        assert.ok(token);
    });

    it('cant signup with the same name', ()=> {
        return request.post('/api/auth/signup')
            .send({name: 'Tester', password:'abc'})
            .then(
                () => {throw new Error('Unexpected success which is bad');},
                err => {
                    assert.equal(err.status, 400);
                }
            );
    });

    it('cant sign up without password', () => {
        return request.post('/api/auth/signup')
            .send({name: 'not the same'})
            .then(
                () => {throw new Error('Unexpected success which is bad');},
                err => {
                    assert.equal(err.status, 400);
                }
            );
    });

    it('should sign in with the same credentials',() => {
        return request.post('/api/auth/signin')
            .send({ name:'Tester', password:'007'})
            .then( ({ body }) => assert.ok(body.token));
    });

    it('cant sign in with wrong credentials',() => {
        return request.post('/api/auth/signin')
            .send({ name:'Tester', password:'006'})
            .then(
                () => {throw new Error('Unexpected success which is bad');},
                err => {
                    assert.equal(err.status, 401);
                }
            );
    });

});