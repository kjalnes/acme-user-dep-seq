const router = require('express').Router();
const db = require('../db');
const Department = db.models.Department;
const UserDepartment = db.models.UserDepartment;

// add department
router.post('/', (req, res, next) => {
    Department.create({ name : req.body.name });
    res.redirect('/');
});

// delete department
router.delete('/:id', (req, res, next) => {
    Department.destroy({
        where: {
            id: req.params.id
        }
    })
    UserDepartment.destroy({
        where: {
            departmentId: req.params.id
        }
    })
    res.redirect('/');
})

module.exports = router;
