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
    const status = req.params.status;
    const user_id = req.params.user_id;

    const data = await database.query(`SELECT * FROM tasks WHERE user = ? AND state = ?`, [user_id, status]);
    const itemCount = await database.first(`SELECT count(id) AS total FROM tasks WHERE user = ? AND state = ?`, [user_id, status]);
    const totalItemCount = itemCount.total;
    res.status(200).json({ data, totalItemCount });
});

// get one tasks
app.get('/tasks/:id', async function(req, res) {
    const id = req.params.id;
    const data = await database.first(`SELECT * FROM tasks WHERE id = ?`, [id]);
    res.status(200).json(data);
});

// add task
app.post('/tasks', async function(req, res) {
    // getting parameters
    const user = req.body.user;
    const description = req.body.description;

    // inserting new task
    const task = await database.query(`INSERT INTO tasks (user, description, state) VALUES (?, ?, 1)`, [user, description]);
    res.status(200).json(task);
});

// update task
app.put('/tasks/:id', async function(req, res) {
    // getting parameters
    const id = req.params.id;
    const description = req.body.description;

    // updating task
    const task = await database.query(`UPDATE tasks SET description = ?, updated_at = NOW() WHERE id = ?`, [description, id]);
    res.status(200).json(task);
});

// delete task
app.delete('/tasks/:id', async function(req, res) {
    // getting parameters
    const id = req.params.id;

    // deleting task
    const task = await database.query(`DELETE FROM tasks WHERE id = ?`, [id]);
    res.status(200).json(task);
});