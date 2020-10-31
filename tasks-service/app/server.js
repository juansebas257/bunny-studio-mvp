require('dotenv').config({ path: __dirname + '/../.env' })
const express = require("express");
const database = require('./database/db_utils');
const app = express();
const bodyParser = require('body-parser');

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`tasks-service server running on port ${port}`);
});