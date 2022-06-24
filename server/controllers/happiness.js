const _ = require('lodash')
const { Op } = require("sequelize");
const moment = require('moment')

const { formatDate } = require('../utils/format')

const { handleHappinessGet } = require('../../database/handlers')

module.exports = {
    async read(req, res) {
        const happinessGet = handleHappinessGet(req.query)

        const [lastRecord] = (
            await global.sequelize.models.Happiness.findAll({
                raw: true,
                attributes: ['date'],
                order: [['date', 'DESC']],
                limit: 1,
            })
        )
        const lastDate = formatDate(lastRecord?.date) ?? moment()
        const startDate = formatDate(happinessGet.startDate) ?? formatDate(lastDate).subtract(1, 'days')
        const endDate = formatDate(happinessGet.endDate)?.add(1, 'days') ?? formatDate(lastDate)
        const sensor = happinessGet.sensor ?? false

        const queryResult = await global.sequelize.models.Happiness.findAll({
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
}
