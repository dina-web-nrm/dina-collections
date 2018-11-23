const latitude = value => {
  const number = Number(value)
  if (Number.isNaN(number)) {
    return true
  }

  return number >= -90 && number <= 90
}

const longitude = value => {
  const number = Number(value)
  if (Number.isNaN(number)) {
    return true
  }

  return number >= -180 && number <= 180
}

const stringWithOnlyDigitsAndMaximumOnePoint = value => {
  if (typeof value !== 'string') {
    return false
  }

  return value.match(/^\d{1,}\.{0,1}\d*$/) !== null
}

exports.latitude = latitude
exports.longitude = longitude
exports.stringWithOnlyDigitsAndMaximumOnePoint = stringWithOnlyDigitsAndMaximumOnePoint
