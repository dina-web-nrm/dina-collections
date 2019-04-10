module.exports = function emptyFactory({ synchronize } = {}) {
  if (!synchronize) {
    throw new Error('Have to provide synchronize')
  }

  return function empty() {
    return Promise.resolve().then(() => {
      return synchronize({ force: true })
    })
  }
}
