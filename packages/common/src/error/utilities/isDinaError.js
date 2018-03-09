module.exports = function isDinaError(error) {
  /* eslint-disable no-underscore-dangle */
  return error && error._dinaError
}
