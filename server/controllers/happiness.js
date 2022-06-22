const _ = require('lodash')
const { Op } = require("sequelize");
const moment = require('moment')

const { handleHappinessGet } = require('../../database/handlers')

module.exports = {
    async read(req, res) {
        const HappinessGet = handleHappinessGet(req.query)

        const sensor = HappinessGet.sensor ?? false
        const startDate = HappinessGet.startDate ?? moment().subtract(1, 'years').format("YYYY-MM-DD HH:mm:ss");
        const endDate = moment(HappinessGet.endDate).add(1, 'days').format("YYYY-MM-DD HH:mm:ss") ?? moment().add(1, 'days').format("YYYY-MM-DD HH:mm:ss");

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
