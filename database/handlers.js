const _ = require('lodash')
const { Op } = require("sequelize");
const moment = require('moment')

const { thresholds, weights } = require('./constants')


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

function insertOverallHappiness(happiness) {
    overall = _.sum(_.values(
        _.mergeWith({}, happiness, weights, _.multiply)
    ))

    happiness.overall = _.round(overall * 5/14, 2) // Maps from [0,14] to [0,5]
    return happiness
}


module.exports = {
    handleSensorsGet(query, validSensors) {
        const validFields = ['sensor', 'startDate', 'endDate'];

        return _.pickBy(query, (val, key) => {
            if (validFields.includes(key)) {
                return key.includes('Date') ? isDateString(val) : validSensors.includes(val);
            }
            return false;
        })
    },

    handleSensorsPost(body, validSensors) {
        const jsonBody = query2JSON(body.replaceAll('\"', ''));

        return _.pickBy(jsonBody, (val, key) => {
            if (validSensors.includes(key)) {
                return key === 'presence' ? isBooleanString(val) : isNumericString(val);
            }
            return false;
        })
    },

    handleIsFinePost(sensorPost) {
        return _.transform(
            _.omit(sensorPost, ['happiness', 'presence']), (result, value, key) => {
                result[key] = thresholds[key].min <= value && value <= thresholds[key].max
            }
        )
    },

    async handleHappinessPost(validSensors, date) {
        const isFineHistory = await global.sequelize.models.IsFine.findAll({
            raw: true,
            attributes: validSensors,
            where: {
                date: {
                    [Op.gte]: date.subtract(24, 'hours')
                }
            }
        });

        const fineAmount = _.reduce(isFineHistory, (result, value) => {
            return _.mergeWith(result, value, _.add)
        })
        const totalAmount = isFineHistory.length

        return insertOverallHappiness(_.mapValues(
            fineAmount, (value) => { return (value/totalAmount) >= 0.58 } // Approx. 14 hours per day
        ))
    }
};
