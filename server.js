const db = require('./db'); // assumes that we are referring to a index file in db folder

const server = require('http').createServer(require('./app'));

db.sync()
    .then( () => db.seed() )
    .catch( (err) => console.log(err));

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Port ${port} is a beautiful port`));



