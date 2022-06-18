const _ = require('lodash')


function isNumericString(str) {
    return (typeof str === "string" && !isNaN(str) && !isNaN(parseFloat(str)));
}

function isBooleanString(str) {
    return (typeof str === "string" && ['0', '1'].includes(str));
}

function query2JSON(query) {
    return Object.fromEntries(new URLSearchParams(query));
}

function validateRequest(body) {
    validFields = [
        'luminosity',   'temperature',
        'soilHumidity', 'airHumidity',
        'airQuality',   'presence'
    ]

    jsonBody = query2JSON(body.replaceAll('\"', ''))

    return _.pickBy(jsonBody, (val, key) => {
        if (validFields.includes(key)) {
            return key === 'presence' ? isBooleanString(val) : isNumericString(val)
        }
        return false
    })
}

module.exports = validateRequest
