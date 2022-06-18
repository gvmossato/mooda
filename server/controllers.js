const _ = require('lodash')

const validateRequest = require('../database/validate')

module.exports = {
    async read(req, res) {
        const sensors = await global.sequelize.models.Sensors.findAll();
        return res.json(sensors, null, 4);
    },

    async create(req, res) {
        const cleanedReq = validateRequest(req.body)

        if (_.isEmpty(cleanedReq)) {
            return res.status(400).json({ message: 'No valid data sent' })
        }

        const sensorsRead = await global.sequelize.models.Sensors.create(cleanedReq)
        return res.status(200).json(sensorsRead);
    }
}
