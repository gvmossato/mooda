const _ = require('lodash')
const { Op } = require("sequelize");
const moment = require('moment')

const { handleHappinessGet } = require('../../database/handlers')

module.exports = {
    async read(req, res) {
        const HappinessGet = handleHappinessGet(req.query)

        const lastDate = (
            await global.sequelize.models.Happiness.findAll({
                raw: true,
                attributes: ['date'],
                order: [['date', 'DESC']],
                limit: 1,
            })
        )[0].date

        console.log(lastDate)

        const sensor = HappinessGet.sensor ?? false
        const startDate = HappinessGet.startDate ?? moment(lastDate).subtract(1, 'days').format("YYYY-MM-DD HH:mm:ss");
        const endDate = moment(HappinessGet.endDate).add(1, 'days').format("YYYY-MM-DD HH:mm:ss") ?? moment(lastDate).format("YYYY-MM-DD HH:mm:ss");

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
