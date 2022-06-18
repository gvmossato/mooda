const _ = require('lodash')
const moment = require('moment')


function isNumericString(str) {
    return (typeof str === "string" && !isNaN(str) && !isNaN(parseFloat(str)));
}

function isBooleanString(str) {
    return (typeof str === "string" && ['0', '1'].includes(str));
}

function isDateString(str) {
    return (typeof str === "string" && moment(str, 'YYYY-MM-DD', true).isValid())
}

function query2JSON(queryStr) {
    return Object.fromEntries(new URLSearchParams(queryStr));
}

function handleGet(query) {
    const validFields = ['sensor', 'startDate', 'endDate'];
    const validSensors = [
        'luminosity',   'temperature',
        'soilHumidity', 'airHumidity',
        'airQuality',   'presence'
    ];

    return _.pickBy(query, (val, key) => {
        if (validFields.includes(key)) {
            return key.includes('Date') ? isDateString(val) : validSensors.includes(val);
        }
        return false;
    })
}

function handlePost(body) {
    const validFields = [
        'luminosity',   'temperature',
        'soilHumidity', 'airHumidity',
        'airQuality',   'presence'
    ];

    const jsonBody = query2JSON(body.replaceAll('\"', ''));

    return _.pickBy(jsonBody, (val, key) => {
        if (validFields.includes(key)) {
            return key === 'presence' ? isBooleanString(val) : isNumericString(val);
        }
        return false;
    })
}

module.exports = { handleGet, handlePost };
