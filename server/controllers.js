const _ = require('lodash')

const validateRequest = require('./database/validate.js')


module.exports = {
    async read(req, res) {
        return res.json({message : 'Server is up!'});
    },

    async create(req, res) {
        const cleanedReq = validateRequest(req.query)

        if (_.isEmpty(cleanedReq)) {
            return res.status(400).json({ message: 'No valid data sent' })
        }

        const sensorsRead = await global.sequelize.models.Sensors.create(cleanedReq)
        return res.status(200).json(sensorsRead);
    }
}
