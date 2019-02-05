const latitude = value => {
  if (!value) {
    return true
  }

  const number = Number(value)
  if (Number.isNaN(number)) {
    return false
  }

  return number >= -90 && number <= 90
}

const longitude = value => {
  if (!value) {
    return true
  }

  const number = Number(value)
  if (Number.isNaN(number)) {
    return false
  }
  return number >= -180 && number <= 180
}

const stringWithOnlyDigitsAndMaximumOnePoint = value => {
  if (typeof value !== 'string') {
    return false
  }

  if (!value) {
    return true
  }

  return value.match(/^-{0,1}\d{1,}\.{0,1}\d*$/) !== null
}

exports.latitude = latitude
exports.longitude = longitude
exports.stringWithOnlyDigitsAndMaximumOnePoint = stringWithOnlyDigitsAndMaximumOnePoint
