'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('Sensors', {
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
            soilHumidity: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            airHumidity: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            airQuality: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            happiness: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            presence: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
        })
    },

    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('IsFine', {
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
            soilHumidity: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            airHumidity: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            airQuality: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            }
        })
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.dropTable('Sensors');
        await queryInterface.dropTable('IsFine');
    }
};
