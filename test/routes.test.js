const expect = require('chai').expect;
const db = require('../db');
const client = require('supertest')(require('../app'));
// supertest is a testing server

describe('routes', () => {
    describe('with seeded data', () =>{
        describe('GET /', () => {
            it('home route contains the word Bobs', (done) => {
                  client.get('/')
                    .expect(200)
                    .then( (result) => {
                        return expect(result.text).to.contain('Bobs')
                    })
                    .then( () => done())
                    .catch( (err) => done(err));
            });
        });

        describe('GET /users', ()=> {
          it('returns 404', (done)=> {
            client.get('/users')
                .expect(404)
                .then( ()=> done())
                .catch( err => done(err));
            });
        });

       describe('POST /users', () => {
        it('returns 302', (done) => {
            client.post('/users')
                .expect(302)
                .then( () => done())
                .catch( err => done(err));
            });
       });

       describe('POST /departments', () => {
        it('returns 302', (done) => {
            client.post('/departments')
                .expect(302)
                .then( () => done())
                .catch( err => done(err));
            });
       });

       describe('DELETE  /users/1', () => {
        it('returns 302', (done) => {
            client.delete('/users/1')
                .expect(302)
                .then( () => done())
                .catch( err => done(err));
            });
       });
    });
});










// describe('User', () => {
//     beforeEach((done) => {
//         db.sync()
//             .then( () => done())
//             .catch( (e) => done(e))
//     });
//     describe('User', () => {
//         it('exists', () => {
//             expect(db.models.User).to.be.ok;
//         })
//     });
// });
