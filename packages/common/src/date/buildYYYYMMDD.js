module.exports = function buildYYYYMMDD({ day, month, year }) {
  if (!year) {
    return undefined
  }

  let YYYYMMDD = `${year}`

  if (month) {
    YYYYMMDD = YYYYMMDD.concat(
      `${month}`.length === 1 ? `0${month}` : `${month}`
    )

    if (day) {
      YYYYMMDD = YYYYMMDD.concat(`${day}`.length === 1 ? `0${day}` : `${day}`)
    }
  }

  return YYYYMMDD
}
