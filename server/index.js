require('dotenv').config()
require('./database/db')

const path = require('path')
const express = require('express');
const router = require('./routes');


(async () => {
    return await global.sequelize.sync();
})()

const app = express();
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(router)
