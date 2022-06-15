//const connection = require('../database/connection');

module.exports = {
    async read(req, res) {
        return res.json({message : 'Server is up!'});
    },
    async create(req, res) {
        const {
            luminosity,
            temperature,
            soilUmidity,
            airUmidity,
            airQuality,
            presence
        } = req.query
        console.log({
            luminosity,
            temperature,
            soilUmidity,
            airUmidity,
            airQuality,
            presence
        })
        return res.json({message : 'Server is up!'});
    }
}
