import getHappiness from "../api/getHappiness";
import { formatDate, getNowDate } from "./format";


export default async function getStatus(sensor) {
    const now = getNowDate()
    const past = now.clone().subtract(1, 'days') // Any read within 24h is valid for status

    const latestHappiness = await getHappiness({
        sensor,
        startDate: formatDate(past, 'server'),
        endDate: formatDate(now, 'server')
    })

    if (!latestHappiness.length) return false // No read within 24h => bad
    return latestHappiness.at(-1)[sensor]
}
