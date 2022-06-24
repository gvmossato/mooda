const getHappiness = require("../api/getHappiness");
const getSensorData = require("../api/getSensorData");

export default async function getPlotData(focus, startDate, endDate) {

    var data;
    var sensor;

    var series = [];
    var datetimes = [];

    if (focus === 'happiness') {
        sensor = 'overall'
        data = await getHappiness({ sensor, startDate, endDate })
    } else {
        sensor = focus
        data = await getSensorData({ sensor, startDate, endDate })
    }

    data.forEach((value) => {
        series.push(value[sensor])
        datetimes.push(value.date)
    })

    return [series, datetimes]
}
