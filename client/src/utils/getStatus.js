const moment = require("moment");
const getHappiness = require("../api/getHappiness");

async function getStatus(sensor) {
    const now = moment()

    const latestHappiness = await getHappiness({
        sensor,
        startDate: now.subtract(20, 'minutes').format("YYYY-MM-DD HH:mm:ss"),
        endDate: now.add(1, 'days').format("YYYY-MM-DD HH:mm:ss")
    })//.at(-1)

    console.log(latestHappiness)

    return latestHappiness[sensor]
}

module.exports = getStatus
