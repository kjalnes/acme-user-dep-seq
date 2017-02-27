const db = require('./db');

const Department = db.define('department', {
   name : db.Sequelize.STRING
},
{
    classMethods: {
        getDepartments: () => {
            return this.findAll()
        },
        deleteDepartment: (id) => {
            return db.models.department.destroy({ where : { id: id }})
        }
    }
});

module.exports = Department;
