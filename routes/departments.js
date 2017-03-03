const router = require('express').Router();
const db = require('../db');

// add department
router.post('/', (req, res, next) => {
    db.models.Department.create({ name : req.body.name });
    res.redirect('/');
});

// delete department
router.delete('/:id', (req, res, next) => {
  /*
   * I think you want to delete UserDepartment where the departmentId is req.params.id.... then.... you want to delete the department... then you want to redirect... and put a catch there for next
   */
    let id = req.params.id;
    db.models.Department.deleteDepartment(id)
    db.models.UserDepartment.deleteUserDepartment(null, id)
    res.redirect('/');
})

module.exports = router;


// question: am I using classMethods correct here on line 13/14 or would it be better to delete from the routes
// take a look at solution-- not sure you need them
