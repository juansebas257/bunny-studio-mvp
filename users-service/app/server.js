require('dotenv').config({ path: __dirname + '/../.env' })
const express = require("express");
const database = require('./database/db_utils');
const app = express();
const bodyParser = require('body-parser');

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`user-services server running on port ${port}`);
});

app.get('/users', async function(req, res) {
    const users = await database.query(`SELECT * FROM users`, []);
    res.status(200).json(users);
});

app.post('/users', async function(req, res) {
    console.log(req)
        // getting parameters
    const name = req.body.name;

    // inserting new user
    const user = await database.query(`INSERT INTO users (name) VALUES (?)`, [name]);
    res.status(200).json(user);
});