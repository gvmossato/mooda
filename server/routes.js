const path = require('path')
const express = require('express');
const controllers = require('./controllers')

const routes = express.Router();


//routes.get("/api", controllers.read);
routes.get("/api", controllers.create);

routes.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

module.exports = routes
