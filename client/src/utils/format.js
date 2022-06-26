import moment from 'moment-timezone'

export function getNowDate() {
    return moment.tz(moment(), global.dateFormatServer, global.timeZone)
}

export function formatDate(date, which) {
    if (!['server', 'client'].includes(which)) {
        throw Error(`\`which\` expects 'server' or 'client' not ${which}`)
    }

    const format = which === 'client' ? global.dateFormatClient : global.dateFormatServer
    return date.format(format)
}
