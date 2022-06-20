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
        })

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
        }),

        await queryInterface.createTable('Happiness', {
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
        })
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.dropTable('Sensors');
        await queryInterface.dropTable('IsFine');
        await queryInterface.dropTable('Happiness');
    }
};
