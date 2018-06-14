module.exports = function createFactory({ ViewModel } = {}) {
  if (!ViewModel) {
    throw new Error('Have to provide ViewModel')
  }

  return function create(input) {
    return ViewModel.create({ ...input, allowId: true })
  }
}
