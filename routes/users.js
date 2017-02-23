const router = require('express').Router();
const db = require('../db');
const User = db.models.User;
const methodOverrider = require('method-override');

router.get('/', (req, res, next ) => {
    res.send('here');
});

router.post('/', (req, res, next) => {
    let name = req.body.name;
    User.create({name : name});
    res.redirect('/')
})

module.exports = router;
