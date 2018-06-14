module.exports = ({ keyStoredInModel, models }) => {
  return {
    model: models[keyStoredInModel],
  }
}
