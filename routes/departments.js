const router = require('express').Router();
const db = require('../db');

// add department
router.post('/', (req, res, next) => {
    db.models.Department.create({ name : req.body.name });
    res.redirect('/');
});

// delete department
router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    db.models.Department.deleteDepartment(id)
    db.models.UserDepartment.deleteUserDepartment(null, id)
    res.redirect('/');
})

module.exports = router;
