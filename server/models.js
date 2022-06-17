const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Sensors = sequelize.define('sensors', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    temperature: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    luminosity: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    soilHumidity: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    airHumidity: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    airQuality: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    happiness: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    presence: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
})

module.exports = Sensors;
