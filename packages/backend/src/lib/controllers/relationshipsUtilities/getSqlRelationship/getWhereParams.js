module.exports = ({ id, idIsForeignKey, foreignKeyName }) => {
  return idIsForeignKey
    ? {
        [foreignKeyName]: id,
      }
    : { id }
}
