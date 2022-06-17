const Sequelize = require('sequelize');


if (process.env.NODE_ENV === 'development') {
    var sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './db.sqlite'
    })
} else {
    var sequelize = new Sequelize(
        process.env.DATABASE_URL,
        {
            dialect: 'postgres',
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
        }
    )
}

sequelize
    .authenticate()
    .then(() => {
        console.log('Successfully connected to the database!.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
