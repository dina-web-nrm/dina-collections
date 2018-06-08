module.exports = function getCountFactory({ Model }) {
  return function getCount() {
    return Promise.resolve().then(() => {
      const currentItems = Model.get()
      return Object.keys(currentItems).length
    })
  }
}
