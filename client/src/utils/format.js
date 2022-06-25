import moment from 'moment'

export function formatDate(date=undefined) {
    return moment(date).format("yyyy-MM-DD")
}
