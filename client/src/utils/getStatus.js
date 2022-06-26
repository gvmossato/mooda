import getHappiness from "../api/getHappiness";
import { formatDate } from "./format";
import moment from "moment";


export default async function getStatus(sensor) {
    const now = moment()

    const latestHappiness = await getHappiness({
        sensor,
        startDate: formatDate(now.subtract(20, 'minutes')),
        endDate: formatDate(now.add(1, 'days'))
    })

    if (!latestHappiness.length) return false
    return latestHappiness.at(-1)[sensor]
}
