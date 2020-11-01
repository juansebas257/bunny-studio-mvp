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
    console.log(`task-services server running on port ${port}`);
});


// API REST for tasks
// get all tasks
app.get('/tasksbyuser/:status/:user_id', async function(req, res) {
    try {
        const status = req.params.status;
        const user_id = req.params.user_id;

        const data = await database.query(`SELECT * FROM tasks WHERE user = ? AND state = ?`, [user_id, status]);
        const itemCount = await database.first(`SELECT count(id) AS total FROM tasks WHERE user = ? AND state = ?`, [user_id, status]);
        const totalItemCount = itemCount.total;
        res.status(200).json({ data, totalItemCount });
    } catch (err) {
        handleError(res, err);
    }
});

// get one tasks
app.get('/tasks/:id', async function(req, res) {
    try {
        const id = req.params.id;
        const data = await database.first(`SELECT * FROM tasks WHERE id = ?`, [id]);
        res.status(200).json(data);
    } catch (err) {
        handleError(res, err);
    }
});

// add task
app.post('/tasks', async function(req, res) {
    try {
        // getting parameters
        const user = req.body.user;
        const description = req.body.description;

        // inserting new task
        const task = await database.query(`INSERT INTO tasks (user, description, state) VALUES (?, ?, 1)`, [user, description]);
        res.status(200).json(task);
    } catch (err) {
        handleError(res, err);
    }
});

// update task
app.put('/tasks/:id', async function(req, res) {
    try {
        // getting parameters
        const id = req.params.id;
        const description = req.body.description;
        const state = req.body.state;

        // updating task
        const task = await database.query(`UPDATE tasks SET description = ?, state = ?, updated_at = NOW() WHERE id = ?`, [description, state, id]);
        res.status(200).json(task);
    } catch (err) {
        handleError(res, err);
    }
});

function handleError(res, err) {
    // centralize al errors and store to alert and solve
    res.status(500).json({ error: err });
}