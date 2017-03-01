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
            hasNoDepartments: function(departments) {
                return this.user_departments.length === 0;
            },
            hasDepartment: function(departments, departmentId) {
                let dep = this.getUserDepartment(departmentId)
                return dep.length > 0 ? true : false;
            },
            getUserDepartment: function(departmentId) {
                let userDep = this.user_departments.filter( (dep) => {
                    return dep.userId === this.id;
                }).filter( (deps) => {
                    return deps.departmentId === departmentId;
                })
                return userDep;
            }
        }
});

module.exports = User;
