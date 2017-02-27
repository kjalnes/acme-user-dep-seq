const db = require('./db');
const User = require('./User');
const Department = require('./Department');
const UserDepartment = require('./UserDepartment')

User.hasMany(UserDepartment);
Department.hasMany(UserDepartment);
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
    return connect() // returns a promise
    .then( () => {
        return Promise.all(
            [
              User.create( { name : 'Tina' }),
              User.create( { name : 'Gene' }),
              User.create( { name : 'Linda' }),
              Department.create( { name : 'Jimmy Pesto' }),
              Department.create( { name : 'Burger King' }),
              Department.create( { name : 'Bobs Burger' })
            ]
        );
    })
    .spread( (user1, user2, user3, dep1, dep2, dep3) => {
        return Promise.all(
            [
                UserDepartment.create({ departmentId: dep1.id, userId: user1.id }),
                UserDepartment.create({ departmentId: dep2.id, userId: user2.id }),
                UserDepartment.create({ departmentId: dep3.id, userId: user3.id }),
                UserDepartment.create({ departmentId: dep2.id, userId: user1.id }),
                UserDepartment.create({ departmentId: dep3.id, userId: user1.id })
            ]
        );
    })
    .catch( (err) => console.log(err))
}

const sync = () => {
    return connect()
    .then( () =>  {
        console.log('The ship is syncing');
        return db.sync({ force: true });  // drop tables if exists... is also a promise
    })
}

module.exports = {
    models: {
        User,
        Department,
        UserDepartment
    },
    seed,
    sync
}
