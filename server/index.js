const path = require('path')
const express = require('express');
const router = require('./routes');



(async () => {
    const sequelize = require('./db');
    const Sensors = require('./models');

    try {
        const resultado = await sequelize.sync();
        console.log(resultado);
    } catch (error) {
        console.log(error);
    }
})();

const PORT = process.env.PORT || 3001;

const app = express();

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(router)
