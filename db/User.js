const db = require('./db');
const Department = require('./Department');
const UserDepartment = require('./UserDepartment');

const User = db.define('user', {
        name: db.Sequelize.STRING
    },
    {   classMethods: {
            deleteUser: function(id) {
                return this.destroy({ where : { id: id }})
            }
        },
        instanceMethods: {
            hasAllDepartments: function(Department, UserDepartment) {
                let usersDep = UserDepartment.filter( (dep) => {
                    return dep.userId === this.id;
                });
                return usersDep.length === Department.length ? true : false;
            },
            hasNoDepartments: function(UserDepartment) {
                let usersDep = UserDepartment.filter( (dep) => {
                    return dep.userId === this.id;
                })
                return usersDep.length === 0;
            },
            hasDepartment: function( departments, userDepartments, departmentId) {
                let dep = this.getUserDepartment(departments, userDepartments, departmentId)
                return dep.length > 0 ? true : false;
            },
            getUserDepartment: function(departments, userDepartments, departmentId) {
                let userDep = userDepartments.filter( (dep) => {
                    return dep.userId === this.id;
                }).filter( (deps) => {
                    return deps.departmentId === departmentId;
                })
                return userDep;
            }
        }
});

module.exports = User;

