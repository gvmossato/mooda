const _ = require('lodash')
const { Op } = require("sequelize");

const { formatDate, getNowDate } = require('../utils/format')

const {
    handleSensorsGet,
    handleSensorsPost,
    handleIsFinePost,
    handleHappinessPost
} = require('../../database/handlers')

const validSensors = [
    'luminosity',   'temperature',
    'soilMoisture', 'airMoisture',
    'airQuality',   'presence'
];

module.exports = {
    async read(req, res) {
        const sensorsGet = handleSensorsGet(req.query, validSensors)

        const now = getNowDate()
        const startDate = sensorsGet.startDate ?? formatDate(now.clone().subtract(1, 'days'))
        const endDate = sensorsGet.endDate ?? formatDate(now.clone())

        const sensor = sensorsGet.sensor ?? false

        const queryResult = await global.sequelize.models.Sensors.findAll({
            raw: true,
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
        const now = getNowDate()
        console.log(formatDate(now))

        const sensorsPost = handleSensorsPost(req.body, validSensors)

        const missingFields = _.difference(validSensors, _.keys(sensorsPost))
        if (missingFields.length) {
            return res.status(400).json({ message: `Missing sensor's data: ${missingFields}` })
        }

        const sensorsSaved = await global.sequelize.models.Sensors.create(
            { ...sensorsPost, date: formatDate(now) }
        )

        const isFinePost = handleIsFinePost(sensorsPost)
        const isFineSaved = await global.sequelize.models.IsFine.create(
            { ...isFinePost, date: formatDate(now) }
        )

        const happinessPost = await handleHappinessPost(now, _.difference(validSensors, ['presence']))
        const happinessSaved = await global.sequelize.models.Happiness.create(
            { ...happinessPost, date: formatDate(now) }
        )

        return res.status(200).json([sensorsSaved, isFineSaved, happinessSaved]);
    }
}
