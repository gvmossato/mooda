const _ = require('lodash')
const { Op } = require("sequelize");
const moment = require('moment')

const { handleGet, handlePost } = require('../database/validate')


module.exports = {
    async read(req, res) {
        const cleanedReq = handleGet(req.query)

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
        const cleanedReq = handlePost(req.body)

        if (_.isEmpty(cleanedReq)) {
            return res.status(400).json({ message: 'No valid data sent' })
        }

        const sensorsRead = await global.sequelize.models.Sensors.create(cleanedReq)
        return res.status(200).json(sensorsRead);
    }
}
