const _ = require('lodash')
const { Op } = require("sequelize");
const moment = require('moment')

const {
    handleSensorsGet,
    handleSensorsPost,
    handleIsFinePost,
    handleHappinessPost
} = require('../database/handlers')

const validSensors = [
    'luminosity',   'temperature',
    'soilHumidity', 'airHumidity',
    'airQuality',   'presence'
];

module.exports = {
    async read(req, res) {
        const cleanedReq = handleSensorsGet(req.query, validSensors)

        const sensor = cleanedReq.sensor ?? false
        const startDate = cleanedReq.startDate ?? moment().subtract(1, 'years');
        const endDate = moment(cleanedReq.endDate).add(1, 'days') ?? moment().add(1, 'days');

        const queryResult = await global.sequelize.models.Sensors.findAll({
            ...(sensor && {attributes: ['id' , 'date', sensor]}),
            where: {
                date: {
                    [Op.and]: [
                        { [Op.gte]: startDate },
                        { [Op.lte]: endDate }
                    ]
                }
            }
        });

        return res.status(200).json(queryResult);
    },

    async create(req, res) {
        const date = Date.now()
        const sensorsPost = handleSensorsPost(req.body, validSensors)

        if (_.isEmpty(sensorsPost)) {
            return res.status(400).json({ message: 'No valid sensor data sent' })
        }
        if (!_.has(sensorsPost, validSensors)) {
            return res.status(400).json({ message: 'Missing one or more sensor data' })
        }

        const sensorsSaved = await global.sequelize.models.Sensors.create(
            { ...sensorsPost, date }
        )

        const isFinePost = handleIsFinePost(sensorsPost)
        const isFineSaved = await global.sequelize.models.IsFine.create(
            { ...isFinePost, date }
        )

        const happinessPost = handleHappinessPost()
        const happinessSaved = await global.sequelize.models.Happiness.create(
            { ...happinessPost, date }
        )

        return res.status(200).json([sensorsSaved, isFineSaved, happinessSaved]);
    }
}
