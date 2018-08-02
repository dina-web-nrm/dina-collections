module.exports = ({ data, foreignKeyName, id }) => {
  if (!data) {
    return {
      id,
      item: {
        internals: {
          [foreignKeyName]: null,
        },
      },
    }
  }

  return {
    id,
    item: {
      internals: {
        [foreignKeyName]: data.id,
      },
    },
  }
}
