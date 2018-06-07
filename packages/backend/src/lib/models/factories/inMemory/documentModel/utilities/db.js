let data = {}

exports.setCollection = (key, value) => {
  return Promise.resolve().then(() => {
    if (!data[key]) {
      throw new Error(`Collection with key: ${key} dont exist`)
    }
    data[key] = value
  })
}

exports.getCollection = key => {
  return Promise.resolve().then(() => {
    const collection = data[key]
    if (!collection) {
      throw new Error(`Collection with key: ${key} dont exist`)
    }
    return data[key]
  })
}

exports.destroyCollection = key => {
  delete data[key]
}

exports.destroyAllCollections = () => {
  data = {}
}
