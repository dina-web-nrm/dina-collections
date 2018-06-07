module.exports = function createDb() {
  let data = {}

  const setCollection = (key, value) => {
    return Promise.resolve().then(() => {
      if (!data[key]) {
        throw new Error(`Collection with key: ${key} dont exist`)
      }
      data[key] = value
    })
  }

  const getCollection = key => {
    return Promise.resolve().then(() => {
      const collection = data[key]
      if (!collection) {
        throw new Error(`Collection with key: ${key} dont exist`)
      }
      return data[key]
    })
  }

  const destroyCollection = key => {
    delete data[key]
  }

  const destroyAllCollections = () => {
    data = {}
  }

  return {
    destroyAllCollections,
    destroyCollection,
    getCollection,
    setCollection,
  }
}
