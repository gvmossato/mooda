const { DataTypes } = require('sequelize');

global.sequelize.define('Sensors', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
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
}, {
    timestamps: false,
})
