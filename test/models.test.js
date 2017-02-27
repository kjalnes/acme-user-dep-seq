const expect = require('chai').expect;
const db = require('../db');

describe('All models', () => {
    beforeEach((done) => {
        db.sync()
            .then( () => db.seed())
            .then( () => done())
            .catch( (e) => done(e))
    });


    describe('Department', () => {
       it('exists', () => {
            expect(db.models.Department).to.be.ok;
       })

       describe('seeded data', () => {
            let departments;
            beforeEach( (done) => {
                db.models.Department.findAll()
                .then( (_departments) => {
                    departments = _departments
                })
                .then(() => done())
                .catch( (err) => done(err))
            });
            it('there are three departments', () => {
                expect(departments.length).to.equal(3);
            })

       })

    });


    describe('User', () => {
        it('exists', () => {
            expect(db.models.User).to.be.ok;
        })

        describe('Seeded data', () => {
            let users;
            beforeEach( (done) => {
                db.models.User.findAll()
                .then( (_users) => {
                    users = _users
                })
                .then(done)
                .catch( (err) => done(err) )
            });
            it('there are 3 users in the testing db', () => {
                expect(users.length).to.equal(3);
            })
        });
    });



    describe('UserDepartment', () => {
       it('exists', () => {
            expect(db.models.UserDepartment).to.be.ok;
       })

    });
});
