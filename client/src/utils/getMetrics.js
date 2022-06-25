import moment from "moment";
import getHappiness from "../api/getHappiness";
import getSensorData from "../api/getSensorData";

import { formatDate } from "../utils/format";


export default async function getMetrics(focus, period) {
    if (!['years', 'months', 'days'].includes(period)) {
        throw Error(`\`period\` expects 'years', 'months' or 'days', not ${period}`)
    }

    const namesMap = {
        'years': 'Ano',
        'months': 'Mês',
        'days': 'Dia',
    }

    var data;
    var sensor;
    let max = -Infinity;
    let mean = 0;
    let min = Infinity;

    const now = moment();
    const endDate = formatDate(now)
    const startDate = formatDate(now.subtract(1, period))

    if (focus === 'happiness') {
        sensor = 'overall'
        data = await getHappiness({ sensor, startDate, endDate })
    } else {
        sensor = focus
        data = await getSensorData({ sensor, startDate, endDate })
    }

    data.forEach((el) => {
        if (el[sensor] < min) min = el[sensor];
        if (el[sensor] > max) max = el[sensor];

        mean += el[sensor]
    })

    min = min.toFixed(2);
    mean = (mean / data.length).toFixed(2);
    max = max.toFixed(2);

    return { name: namesMap[period], max, mean, min }
}
