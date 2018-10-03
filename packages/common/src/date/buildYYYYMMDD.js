module.exports = function buildYYYYMMDD({ day, month, year }) {
  if (!year) {
    return undefined
  }

  const parts = [year]

  if (month) {
    parts.push(`${month}`.length === 1 ? `0${month}` : `${month}`)

    if (day) {
      parts.push(`${day}`.length === 1 ? `0${day}` : `${day}`)
    }
  }

  return parts.join('-')
}
