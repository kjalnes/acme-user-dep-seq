const router = require('express').Router();
const db = require('../db');

router.post('/', (req, res, next) => {
    db.models.User.create({name : req.body.name});
    res.redirect('/')
})

// delete user
router.delete('/:id', (req, res, next) => {
    let id = req.params.id;//don't forge semi colons!
    db.models.UserDepartment.deleteUserDepartment(id)
      .then( ()=> db.models.User.deleteUser(id))
      .then( ()=> res.redirect('/'))
      .catch(next);
});

// remove user from department
router.post('/:id/user_departments', (req, res, next) => {
  //simplify this.. and make it restful..
  //router.delete('/:id/user_departments/:userDepartmentId')
  //router.post('/:id/user_departments/') and pass departmentId as form param
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
