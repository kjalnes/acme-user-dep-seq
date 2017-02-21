const router = require('express').Router();
const db = require('../db');


router.get('/', (req, res, next ) => {
    res.send('here');
});


module.exports = router;
