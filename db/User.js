const db = require('./db');

const User = db.define('user', {
        name: db.Sequelize.STRING
    },
    {
        instanceMethods: {
            hasAllDepartments: function() {
                var departmentsNum;
                var userDep;
                db.models.department.findAll()
                .then(function(allDeps) {
                    departmentsNum = allDeps;
                    console.log('!!!!!!!!!!!!!!!allDeps', allDeps)
                })
                .then(function() {
                    return User.findAll()
                    .then(function(allUserDeps) {
                        console.log('!!!!!!!!!!!!!allUserDeps', allUserDeps)
                        userDep = allUserDeps;
                    })
                }).then(function() {
                    console.log(departmentsNum.length, userDep.length)
                })


            },
            hasNoDepartments: function() {},
            hasDepartment: function() {},
            getUserDepartment: function() {},
            // getAllDeps: function() {

            //     return db.models.department.findAll()
            //     .then( function(deps){
            //         return deps.length;
            //     })
            //     .catch( function(err) {
            //         return err
            //     })
            // }
            getAllDeps: function() {
              //   console.log('!!!!!!!!!!!')
              //   debugger;
              //   var depsLength = db.models.department.findAll()
              //   .then( function(deps){
              //     debugger;
              //     return deps.length;
              //   })
              //   .catch( function(err) {
              //     return err
              //   });

              // return depsLength;
            }
        }
});

module.exports = User;

