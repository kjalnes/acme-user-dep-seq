const express = require('express');
const app = express();
const swig = require('swig');
swig.setDefaults({ cache : false });
const db = require('./db');
const User = db.models.User;
const Department = db.models.Department;
const UserDepartment = db.models.UserDepartment;
const path = require('path');

module.exports = app;

app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.use(require('body-parser').urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', require('./routes/users'));
app.use('/departments', require('./routes/departments'));


// home
app.get('/', (req, res, next) => {

    let _user;
    let _dep;

    User.findAll()
    .then( (users) => {
        _users = users;
    })

    // here we have to find the users existing departments
    .then( () => {
        return Department.findAll()
        .then( (departments) => {
            _dep = departments
        })
    })
    .then( () => {
        res.render('index', { allUsers: _users, allDepartments: _dep })
    })
    .catch( (err) => next(err))
})



db.sync()
    .then( () => db.seed() )
    .catch( (err) => console.log(err));


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listneing on port ${port}`));



