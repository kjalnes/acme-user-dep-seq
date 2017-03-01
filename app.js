const express = require('express');
const swig = require('swig');
swig.setDefaults({ cache : false });
const path = require('path');
const methodOverride = require('method-override');
const db = require('./db'); // assumes that we are referring to a index file in db folder

const app = express();
module.exports = app;

app.set('view engine', 'html');
app.engine('html', swig.renderFile);
app.use(methodOverride("_method"));
app.use(require('body-parser').urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', require('./routes/users'));
app.use('/departments', require('./routes/departments'));


app.get('/', (req, res, next) => {
    Promise.all([
        db.models.User.findAll({
            include: [db.models.UserDepartment]
        }),
        db.models.Department.findAll()
    ])
    .then( (data) => {
        res.render('index', { users: data[0], departments: data[1] })
    })
    .catch( (err) => console.log(err));
});
