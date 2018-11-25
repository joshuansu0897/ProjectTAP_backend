const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(require('./src/middleware'))

const users = require('./src/components/users')
const notes = require('./src/components/notes')

app.use(users.routers);
app.use(notes.routers);

module.exports = app;
