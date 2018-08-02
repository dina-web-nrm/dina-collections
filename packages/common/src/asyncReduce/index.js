module.exports = function asyncReduce({
  items = [],
  initialValue,
  reduceFunction,
}) {
  let value = initialValue
  const nItems = items.length
  if (nItems === 0) {
    return Promise.resolve(value)
  }
  let index = 0
  const internalReduce = () => {
    if (index === nItems) {
      return null
    }
    const currentItem = items[index]

    return Promise.resolve()
      .then(() => {
        return reduceFunction({
          index,
          item: currentItem,
          value,
        })
      })
      .then(updatedValue => {
        value = updatedValue
        index += 1
        return internalReduce()
      })
  }

  return internalReduce().then(() => {
    return value
  })
}
