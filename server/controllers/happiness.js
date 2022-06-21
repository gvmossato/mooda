const _ = require('lodash')
const { Op } = require("sequelize");
const moment = require('moment')

const { handleHappinessGet } = require('../../database/handlers')

module.exports = {
    async read(req, res) {
        const happinessGet = handleHappinessGet(req.query)

        const startDate = happinessGet.startDate ?? moment().subtract(1, 'days');
        const endDate = moment(happinessGet.endDate).add(1, 'days') ?? moment().add(1, 'days');

        const queryResult = await global.sequelize.models.Happiness.findAll({
            raw: true,
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
