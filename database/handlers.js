const _ = require('lodash')
const moment = require('moment')

const thresholds = require('../database/thresholds')


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


module.exports = {
    handleSensorsGet(query) {
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
    },

    handleSensorsPost(body) {
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
    },

    handleIsFineCreate(sensorPost) {
        return _.transform(
            _.omit(sensorPost, ['happiness', 'presence']), (result, value, key) => {
                result[key] = thresholds[key].min <= value && value <= thresholds[key].max
            }
        )
    }
};
