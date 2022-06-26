const moment = require('moment-timezone')
const _ = require('lodash')

module.exports = {
    getNowDate() {
        return moment.tz(moment(), global.dateFormat, global.timeZone)
    },
    formatDate(date) {
        return date.format(global.dateFormat)
    }
}
