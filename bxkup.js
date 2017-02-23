app.get('/', (req, res, next) => {

    let _user;
    let _dep;
    User.getUsers()
    .then( (users) => {
        _users = users;
        // console.log('_users =====================', _users[0].user_departments);
    })
    .then( () => {
        return Department.getDepartments()
        .then( (departments) => {
            _dep = departments
        })
    })
    .then( () => {
        res.render('index', { allUsers: _users, allDepartments: _dep })
    })
    .catch( (err) => next(err))
})
