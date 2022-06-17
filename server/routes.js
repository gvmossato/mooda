const path = require('path')
const express = require('express');
const controllers = require('./controllers')

const routes = express.Router();


//routes.get("/api", controllers.read);
routes.get("/api", controllers.create);

routes.get('*', (req, res) => {
    if (process.env.NODE_ENV == 'production') {
        res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    } else {
        res.status(301).redirect(`http://localhost:${process.env.CLIENT_PORT}/`);
    }
});

module.exports = routes
