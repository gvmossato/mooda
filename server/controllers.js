const _ = require('lodash')
const { Op } = require("sequelize");
const moment = require('moment')

const {
    handleSensorsGet,
    handleSensorsPost,
    handleIsFineCreate
} = require('../database/handlers')


module.exports = {
    async read(req, res) {
        const cleanedReq = handleSensorsGet(req.query)

        const sensor = cleanedReq.sensor ?? false
        const startDate = cleanedReq.startDate ?? moment().subtract(1, 'years');
        const endDate = moment(cleanedReq.endDate).add(1, 'days') ?? moment().add(1, 'days');

        const queryResult = await global.sequelize.models.Sensors.findAll({
            ...(sensor && {attributes: [ 'id' , 'date', sensor ]}),
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
        const sensorPost = handleSensorsPost(req.body)

        if (_.isEmpty(sensorPost)) {
            return res.status(400).json({ message: 'No valid data sent' })
        }

        const isFine = handleIsFineCreate(sensorPost)

        const date = Date.now()

        const isFineSaved = await global.sequelize.models.IsFine.create(
            { ...isFine, date }
        )
        const sensorsSaved = await global.sequelize.models.Sensors.create(
            { ...sensorPost, date }
        )

        return res.status(200).json([sensorsSaved, isFineSaved]);
    }
}
