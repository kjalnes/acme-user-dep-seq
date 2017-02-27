const db = require('./db');

const UserDepartment = db.define('user_department', {},
    {    classMethods : {
            deleteUserDepartment: function(userId, departmentId) {
                if(userId) {
                    return this.destroy({ where : { userId : userId }});
                }
                if(departmentId) {
                    return this.destroy({ where : { departmentId : departmentId }});
                }
            }
        }
    }
);

module.exports = UserDepartment;

