const db = require('./db');
const User = require('./User');
const Department = require('./Department');
//db refers to the file db.js
//in db.js we are exporting the Sequelize client object
//which has the method sync() on it

Department.hasMany(User);
// User.hasMany(Department);

const sync = () => {
    // console.log(db);
    console.log('the ship is syncing');
    return db.sync({ force: true });  // drop tables if exists... is also a promise
}

const seed = () => {
    return sync() // a promise
    .then( () =>  User.create( { name : 'Leonard' }))
    .then( () =>  User.create( { name : 'Moon' }))
    .then( () =>  Department.create( { name : 'Dunkin Donut' }))
    .then( () =>  Department.create( { name : 'Burger King' }))
}


// seed();

module.exports = {
    models: {
        User,
        Department
    },
    seed,
    sync
}
