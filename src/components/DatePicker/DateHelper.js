import moment from 'moment'

let _getDate = momentDate => {
  return momentDate ? momentDate.date() : moment().utc().date()
}

export const getDate = momentDate => {
  return _getDate(momentDate)
}

let _getMonth = momentDate => {
  return momentDate ? momentDate.month() : moment().utc().month()
}

export const getMonth = momentDate => {
  return _getMonth(momentDate)
}

let _getYear = momentDate => {
  return momentDate ? momentDate.year() : moment().utc().year()
}

export const getYear = momentDate => {
  return _getYear(momentDate)
}

export default {
  getDate,
  getMonth,
  getYear
}
