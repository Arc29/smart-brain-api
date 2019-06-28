const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const getUsers = require('./controllers/getUsers');
const image = require('./controllers/image');
const profile = require('./controllers/profile');
const register = require('./controllers/register');
const signIn = require('./controllers/signIn');

const app = express();
var db = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'Arc293vms#',
        database: 'testdb'
    }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', getUsers.handleUsers(db))
app.post('/signin', signIn.handleSignin(db, bcrypt))
app.post('/register', register.handleRegister(db))
app.get('/profile/:id', profile.getProfile(db))
app.delete('/profile/:id', profile.deleteProfile(db))
app.put('/image', image.handleImage(db))
app.post('/imageAPI',image.handleAPI);
app.post('/profile/:id',profile.changePass(db))

app.listen(process.env.PORT||3000,console.log('watching on port '+(process.env.PORT||3000)));