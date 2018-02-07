module.exports = function handleError(error) {
  if (error.json) {
    throw error.json
  }
  throw error
}
