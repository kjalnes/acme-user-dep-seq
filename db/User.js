const db = require('./db');

const User = db.define('user', {
        name: db.Sequelize.STRING
    },
    {
        instanceMethods: {
            hasAllDepartments: function() {},
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
                var x;
                return db.models.department.findAll()
                .then( function(deps){
                    x = deps.length;
                    console.log('x!!!!!!!')
                    console.log("deps!!!!!!!!!", deps)
                    console.log("deps.length!!!!!!!!!!", deps.length )
                    return deps.length;
                })
                .then(function(length) {
                    return length;
                })
                .catch( function(err) {
                    return err
                });
                    console.log("deps!!!!!!!!!!!!!", deps);
                return x;
            }
        }
});

module.exports = User;

