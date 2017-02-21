const express = require('express');
const app = express();
const swig = require('swig');
swig.setDefaults({ cache : false });
const db = require('./db');
const path = require('path');

module.exports = app;

app.use(require('body-parser').urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'html');
app.engine('html', swig.renderFile);


db.seed();

app.get('/', (req, res, next) => {
    // res.send('heu')
    var obj = [];
    db.models.User.findAll()
    // .then( (allUsers) => res.render('index', { allUsers }))
    .then( (allUsers) => {
        obj.push(allUsers);
        db.models.Department.findAll()
        .then( (allDepartments) => obj.push(allDepartments))

    })
    .then( (allUsers) => res.render('index', { allUsers: obj[0], allDepartments: obj[1] }))

})

app.use('/users', require('./routes/users'));
app.use('/departments', require('./routes/departments'));


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listneing on port ${port}`));

// db.seed()


