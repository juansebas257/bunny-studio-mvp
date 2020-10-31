require('dotenv').config({ path: __dirname + '/../.env' })
const express = require("express");
const database = require('./database/db_utils');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {
    console.log(`user-services server running on port ${port}`);
});


// API REST for users
// get all users
app.get('/users', async function(req, res) {
    const data = await database.query(`SELECT * FROM users`, []);
    const totalItemCount = await database.query(`SELECT count(id) FROM users`, []);
    res.status(200).json({ data, totalItemCount });
});

// get one users
app.get('/users/:id', async function(req, res) {
    const id = req.params.id;
    const data = await database.first(`SELECT * FROM users WHERE id = ?`, [id]);
    res.status(200).json(data);
});

// add user
app.post('/users', async function(req, res) {
    // getting parameters
    const name = req.body.name;

    // inserting new user
    const user = await database.query(`INSERT INTO users (name) VALUES (?)`, [name]);
    res.status(200).json(user);
});

// update user
app.put('/users/:id', async function(req, res) {
    // getting parameters
    const id = req.params.id;
    const name = req.body.name;

    // updating user
    const user = await database.query(`UPDATE users SET name = ?, updated_at = NOW() WHERE id = ?`, [name, id]);
    res.status(200).json(user);
});

// delete user
app.delete('/users/:id', async function(req, res) {
    // getting parameters
    const id = req.params.id;

    // deleting user
    const user = await database.query(`DELETE FROM users WHERE id = ?`, [id]);
    res.status(200).json(user);
});