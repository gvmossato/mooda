require('dotenv').config()

const path = require('path')
const express = require('express');

const router = require('./routes');
const sequelize = require('./db');


const PORT = process.env.PORT || 3001; // Defaults to development port

const app = express();

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(router)
