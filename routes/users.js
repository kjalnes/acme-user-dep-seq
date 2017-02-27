const router = require('express').Router();
const db = require('../db');

router.post('/', (req, res, next) => {
    User.create({name : req.body.name});
    res.redirect('/')
})

// delete user
router.delete('/:id', (req, res, next) => {
   // let id = req.params.id
   //  User.deleteUser(id)
     db.models.User.destroy({
        where: {
            id: req.params.id
        }
    })
    db.models.UserDepartment.destroy({
        where: {
            userId: req.params.id
        }
    })
    res.redirect('/');
});

// remove user from department
router.post('/:id/user_departments', (req, res, next) => {
    db.models.UserDepartment.findOne({where: {
            userId: req.params.id,
            departmentId: req.body.departmentId
        }
    })
    .then( (userDep) => {
        if(userDep) {
            userDep.destroy()
        } else {
            db.models.UserDepartment.create({ departmentId: req.body.departmentId, userId: req.params.id })
        }
    })
    .then( () => {
        res.redirect('/');
    })
})

module.exports = router;
