const db = require('./db');
// const Department = require('./Department');

const User = db.define('user', {
        name: db.Sequelize.STRING
    },
    {   classMethods: {
            deleteUser: function(id) {
                return this.destroy({ where : { id: id }})
            }
        },
        instanceMethods: {
            hasAllDepartments: function(departments) {
                return this.user_departments.length === departments.length;
            },
            hasNoDepartments: function() {
                return this.user_departments.length === 0;
            },
            hasDepartment: function(departments, departmentId) {
                let dep = this.getUserDepartment(departmentId)
                return dep.length > 0 ? true : false;
            },
            getUserDepartment: function(departmentId) {
                let userDep = this.user_departments.filter( (dep) => {
                  //i don't think you need this step-- the user_departments on this user already belong to the user
                    return dep.userId === this.id;
                }).filter( (deps) => {
                    //but this is good..
                    return deps.departmentId === departmentId;
                });
                return userDep;
            }
        }
});

module.exports = User;
