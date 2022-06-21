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
    'soilMoisture', 'airMoisture',
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
        const date = moment()

        const sensorsPost = handleSensorsPost(req.body, validSensors)

        const missingFields = _.difference(validSensors, _.keys(sensorsPost))
        if (missingFields.length) {
            return res.status(400).json({ message: `Missing sensor's data: ${missingFields}` })
        }

        const sensorsSaved = await global.sequelize.models.Sensors.create(
            { ...sensorsPost, date }
        )

        const isFinePost = handleIsFinePost(sensorsPost)
        const isFineSaved = await global.sequelize.models.IsFine.create(
            { ...isFinePost, date }
        )

        const happinessPost = await handleHappinessPost(date, _.difference(validSensors, ['presence']))
        const happinessSaved = await global.sequelize.models.Happiness.create(
            { ...happinessPost, date }
        )

        return res.status(200).json([sensorsSaved, isFineSaved, happinessSaved]);
    }
}
