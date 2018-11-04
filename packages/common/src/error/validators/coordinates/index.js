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

exports.latitude = latitude
exports.longitude = longitude
