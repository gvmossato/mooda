const _ = require('lodash')


function isNumericString(str) {
    return (typeof str === "string" && !isNaN(str) && !isNaN(parseFloat(str)))
}

function validateRequest(req) {
    expectedFields = [
        'luminosity',
        'temperature',
        'soilHumidity',
        'airHumidity',
        'airQuality',
        'presence'
    ]

    return _.pickBy(req, (val, key) => {
        return expectedFields.includes(key) && isNumericString(val)
    })

}

module.exports = validateRequest
