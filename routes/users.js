const router = require('express').Router();
const db = require('../db');
const User = db.models.User;
const Department = db.models.Department;
const UserDepartment = db.models.UserDepartment;

router.post('/', (req, res, next) => {
    User.create({name : req.body.name});
    res.redirect('/')
})

// delete user
router.delete('/:id', (req, res, next) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    UserDepartment.destroy({
        where: {
            userId: req.params.id
        }
    })
    res.redirect('/');
});

// remove user from department
router.post('/:id/user_departments', (req, res, next) => {
    UserDepartment.findOne({where: {
            userId: req.params.id,
            departmentId: req.body.departmentId
        }
    })
    .then( (userDep) => {
        if(userDep) {
            userDep.destroy()
        } else {
            UserDepartment.create({ departmentId: req.body.departmentId, userId: req.params.id })
        }
    })
    .then( () => {
        res.redirect('/');
    })
})

module.exports = router;
