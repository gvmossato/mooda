const _ = require('lodash')
const { Op } = require("sequelize");

const { getNowDate } = require('../utils/format')

const { handleHappinessGet } = require('../../database/handlers')

module.exports = {
    async read(req, res) {
        const happinessGet = handleHappinessGet(req.query)

        const now = getNowDate()
        const startDate = happinessGet.startDate ?? now.clone().subtract(1, 'days')
        const endDate = happinessGet.endDate ?? now.clone()
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
