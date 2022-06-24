const moment = require('moment')
const _ = require('lodash')

module.exports = {
    formatDate(date) {
        return _.isNil(date) ? null : moment(date, global.dateFormat)
    },
}
