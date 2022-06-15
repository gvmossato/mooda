const path = require('path')
const express = require('express');


const routes = express.Router();

routes.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

routes.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

module.exports = routes
