require('dotenv').config();

const path = require('path')
const express = require('express');
const sequelize = require('./database/models');
const router = require('./routes');

global.sequelize = sequelize

const app = express();
const PORT = process.env.PORT || process.env.SERVER_PORT;

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(router)
