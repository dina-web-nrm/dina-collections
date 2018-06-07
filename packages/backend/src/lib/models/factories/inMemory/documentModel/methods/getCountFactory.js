module.exports = function getCountFactory({ Model }) {
  return function getCount() {
    return Promise.resolve().then(() => {
      const model = Model.get()
      return Object.keys(model).length
    })
  }
}
