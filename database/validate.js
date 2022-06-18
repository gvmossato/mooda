const _ = require('lodash')


function isNumericString(str) {
    return (typeof str === "string" && !isNaN(str) && !isNaN(parseFloat(str)))
}

function isBooleanString(str) {
    return (typeof str === "string" && ['0', '1'].includes(str))
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
        if (expectedFields.includes(key)) {
            return key === 'presence' ? isBooleanString(val) : isNumericString(val)
        }
        return false
    })
}

module.exports = validateRequest
