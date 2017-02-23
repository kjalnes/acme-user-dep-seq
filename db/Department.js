const db = require('./db');

const Department = db.define('department', {
   name : db.Sequelize.STRING
},
{
    classMethods: {
        getDepartments: () => {
            return Department.findAll()
        }
    }
});

module.exports = Department;
