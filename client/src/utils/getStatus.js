const moment = require("moment");
const getHappiness = require("../api/getHappiness");

async function getStatus(sensor) {
    const now = moment()

    const latestHappiness = getHappiness({
        sensor,
        startDate: now.subtract(20, 'minutes'),
        endDate: now.add(1, 'days')
    }).at(-1)

    return latestHappiness[sensor]
}

module.exports = getStatus
