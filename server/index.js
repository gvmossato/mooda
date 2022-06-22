require('dotenv').config();

const path = require('path')
const express = require('express');
var bodyParser = require('body-parser')
const sequelize = require('../database/models/models');
const router = require('./routes');

global.sequelize = sequelize

const app = express();
const PORT = process.env.PORT || process.env.SERVER_PORT;

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})


    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });


app.use(bodyParser.text())
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(router)
