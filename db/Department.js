const db = require('./db');

const Department = db.define('department', {
        name : db.Sequelize.STRING
    },
    {
        classMethods: {
            //not sure what this buys you.
            getDepartments: () => {
                return this.findAll();
            },
            deleteDepartment: (id) => {
                return db.models.department.destroy({ where : { id }});
            }
        }
    }
);

module.exports = Department;
