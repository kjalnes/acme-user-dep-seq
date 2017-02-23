const router = require('express').Router();
const db = require('../db');
const Department = db.models.Department;
const methodOverrider = require('method-override');

router.get('/', (req, res, next ) => {
    res.send('here');
});

router.post('/', (req, res, next) => {
    let name = req.body.name;
    Department.create({ name : name });
    res.redirect('/');
});


module.exports = router;
