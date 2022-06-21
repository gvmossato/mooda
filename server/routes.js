const path = require('path')
const express = require('express');
const sensorsControllers = require('./controllers/sensors')
const happinessControllers = require('./controllers/happiness')

const routes = express.Router();

// GET
routes.get("/api/sensors", sensorsControllers.read);
routes.get("/api/happiness", happinessControllers.read);
routes.get('*', (req, res) => {
    if (process.env.NODE_ENV == 'production') {
        res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    } else {
        res.status(301).redirect(`http://localhost:${process.env.CLIENT_PORT}/`);
    }
});

// POST
routes.post("/api/sensors", sensorsControllers.create);

module.exports = routes
