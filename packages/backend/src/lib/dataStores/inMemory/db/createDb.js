const { createSelector } = require('reselect')

module.exports = function createDb() {
  let data = {}

  const initializeCollection = key => {
    data[key] = {
      items: {},
    }
  }

  const setCollectionItems = (key, items) => {
    if (!data[key]) {
      throw new Error(`Collection with key: ${key} dont exist. Is it synced?`)
    }
    data[key].items = items
  }

  const getCollectionItems = key => {
    const collection = data[key]
    if (!collection) {
      throw new Error(`Collection with key: ${key} dont exist. Is it synced?`)
    }
    return data[key].items
  }

  const destroyCollection = key => {
    initializeCollection(key)
  }

  const destroyAllCollections = () => {
    data = {}
  }

  const createModel = key => {
    initializeCollection(key)

    const selectorCache = items => {
      return items
    }

    const getArraySelector = createSelector(selectorCache, items => {
      return Object.keys(items)
        .sort((a, b) => {
          if (Number(a) < Number(b)) {
            return 1
          }

          if (Number(b) < Number(a)) {
            return -1
          }

          return 0
        })
        .map(id => {
          return items[id]
        })
    })

    const get = () => {
      return getCollectionItems(key)
    }

    const set = items => {
      return setCollectionItems(key, items)
    }

    const getArray = () => {
      return getArraySelector(get())
    }

    const sync = () => {
      initializeCollection(key)
      getArray() // To empty selector cache
      return true
    }

    return {
      get,
      getArray,
      set,
      sync,
    }
  }

  return {
    createModel,
    destroyAllCollections,
    destroyCollection,
    getCollectionItems,
    setCollectionItems,
  }
}
