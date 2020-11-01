require('dotenv').config({ path: __dirname + '/../.env' })
const express = require("express");
const database = require('./database/db_utils');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {
    console.log(`user-services server running on port ${port}`);
});


// API REST for users
// get all users
app.get('/users', async function(req, res) {
    try {
        const data = await database.query(`SELECT * FROM users`, []);
        const itemCount = await database.first(`SELECT count(id) AS total FROM users`, []);
        const totalItemCount = itemCount.total;
        res.status(200).json({ data, totalItemCount });
    } catch (err) {
        handleError(res, err);
    }
});

// get one users
app.get('/users/:id', async function(req, res) {
    try {
        const id = req.params.id;
        const data = await database.first(`SELECT * FROM users WHERE id = ?`, [id]);
        res.status(200).json(data);
    } catch (err) {
        handleError(res, err);
    }
});

// add user
app.post('/users', async function(req, res) {
    try {
        // getting parameters
        const name = req.body.name;

        // inserting new user
        const user = await database.query(`INSERT INTO users (name) VALUES (?)`, [name]);
        console.log(user);
        res.status(200).json(user);
    } catch (err) {
        handleError(res, err);
    }
});

// update user
app.put('/users/:id', async function(req, res) {
    try {
        // getting parameters
        const id = req.params.id;
        const name = req.body.name;

        // updating user
        const user = await database.query(`UPDATE users SET name = ?, updated_at = NOW() WHERE id = ?`, [name, id]);
        res.status(200).json(user);
    } catch (err) {
        handleError(res, err);
    }
});

// delete user
app.delete('/users/:id', async function(req, res) {
    try {
        // getting parameters
        const id = req.params.id;

        // deleting users task
        await database.query(`DELETE FROM tasks WHERE user = ?`, [id]);

        // deleting user
        const user = await database.query(`DELETE FROM users WHERE id = ?`, [id]);
        res.status(200).json(user);
    } catch (err) {
        handleError(res, err);
    }
});

function handleError(res, err) {
    // centralize al errors and store to alert and solve
    res.status(500).json(err);
}