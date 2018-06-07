module.exports = function createDb() {
  let data = {}

  const initializeCollection = key => {
    data[key] = {}
  }

  const setCollection = (key, value) => {
    if (!data[key]) {
      throw new Error(`Collection with key: ${key} dont exist. Is it synced?`)
    }
    data[key] = value
  }

  const getCollection = key => {
    const collection = data[key]
    if (!collection) {
      throw new Error(`Collection with key: ${key} dont exist. Is it synced?`)
    }
    return data[key]
  }

  const destroyCollection = key => {
    delete data[key]
  }

  const destroyAllCollections = () => {
    data = {}
  }

  const createModel = key => {
    return {
      get: () => {
        return getCollection(key)
      },
      set: value => {
        return setCollection(key, value)
      },
      sync: () => {
        return initializeCollection(key)
      },
    }
  }

  return {
    createModel,
    destroyAllCollections,
    destroyCollection,
    getCollection,
    setCollection,
  }
}
