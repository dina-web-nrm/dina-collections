module.exports = ({ data, foreignKeyName, id }) => {
  if (!data) {
    return {
      foreignKeyObject: {
        [foreignKeyName]: null,
      },
      id,
    }
  }

  return {
    foreignKeyObject: {
      [foreignKeyName]: data.id,
    },
    id,
  }
}
