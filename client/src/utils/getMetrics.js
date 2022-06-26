import getHappiness from "../api/getHappiness";
import getSensorData from "../api/getSensorData";

import { formatDate, getNowDate } from "../utils/format";


export default async function getMetrics(focus, period) {
    if (!['years', 'months', 'days'].includes(period)) {
        throw Error(`\`period\` expects 'years', 'months' or 'days', not ${period}`)
    }

    var data;
    var sensor;
    let max = -Infinity;
    let mean = 0;
    let min = Infinity;

    const now = getNowDate()
    const endDate = formatDate(now, 'server')
    const startDate = formatDate(now.clone().subtract(1, period), 'server')

    if (focus === 'happiness') {
        sensor = 'overall'
        data = await getHappiness({ sensor, startDate, endDate })
    } else {
        sensor = focus
        data = await getSensorData({ sensor, startDate, endDate })
    }

    if (!data.length) return { period, max: '---' , mean: '---', min: '---' }

    data.forEach((el) => {
        if (el[sensor] < min) min = el[sensor];
        if (el[sensor] > max) max = el[sensor];

        mean += el[sensor]
    })

    return {
        period,
        max: max.toFixed(2) ?? max,
        mean: (mean / data.length).toFixed(2) ?? (mean / data.length),
        min: min.toFixed(2) ?? min
    }
}
