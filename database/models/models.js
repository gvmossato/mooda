const sequelize = require('../db');
const { DataTypes } = require('sequelize');


sequelize.define('Sensors', {
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
    },
    temperature: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    luminosity: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    soilMoisture: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    airMoisture: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    airQuality: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    presence: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
}, {
    timestamps: false
});

sequelize.define('IsFine', {
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
    },
    temperature: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    luminosity: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    soilMoisture: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    airMoisture: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    airQuality: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    timestamps: false
});

sequelize.define('Happiness', {
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
    },
    temperature: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    luminosity: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    soilMoisture: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    airMoisture: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    airQuality: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    timestamps: false
});

(async () => {
    return await sequelize.sync();
})();

module.exports = sequelize;
