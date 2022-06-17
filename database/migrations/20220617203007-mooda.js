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
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Sensors');
  }
};
