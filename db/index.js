const db = require('./db');
const User = require('./User');
const Department = require('./Department');
const UserDepartment = require('./UserDepartment')
//db refers to the file db.js
//in db.js we are exporting the Sequelize client object
//which has the method sync() on it

User.hasMany(UserDepartment);
Department.hasMany(UserDepartment);
// now we can have many to many
UserDepartment.belongsTo(User);


let _connection;

const connect = () => {
    if (_connection) {
        return _connection;
    }
    _connection = db.authenticate();
    return _connection;
}


const seed = () => {
    return connect() // a promise
    // .then( () =>  User.create( { name : 'Leonard' }))
    // .then( () =>  User.create( { name : 'Moon' }))
    // .then( () =>  Department.create( { name : 'Dunkin Donut' }))
    // .then( () =>  Department.create( { name : 'Burger King' }))
    .then( () => {
        return Promise.all(
            [
              User.create( { name : 'Tina' }),
              User.create( { name : 'Gene' }),
              User.create( { name : 'Linda' }),
              // User.create( { name : 'Nancy' }),

              Department.create( { name : 'Jimmy Pesto' }),
              Department.create( { name : 'Burger King' }),
              Department.create( { name : 'Bobs Burger' })
            ]
        );
    })
    .spread( (user1,user2,user3,dep1,dep2, dep3) => {
        return Promise.all(
            [
                UserDepartment.create({ departmentId: dep1.id, userId: user1.id }),
                UserDepartment.create({ departmentId: dep2.id, userId: user2.id }),
                UserDepartment.create({ departmentId: dep3.id, userId: user3.id })
                // console.log('a==============', a);
                // console.log('b==============', b);
                // console.log('c==============', c);
                // console.log('d==============', d);
            ]
        );
    })
    .catch( (err) => console.log(err))

}


const sync = () => {
    return connect()
    .then( () =>  {
        console.log('the ship is syncing');
        return db.sync({ force: true });  // drop tables if exists... is also a promise
    })
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
